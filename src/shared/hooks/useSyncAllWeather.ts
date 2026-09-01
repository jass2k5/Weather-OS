import { useQueries } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useOsStore } from "../store/useOsStore";
import axios from "axios";

interface WeatherHistoryItem {
    city: string;
    country: string;
    tz_id: string;
    loc?: { lat: number; lon: number } | null;
    liveTemp: number;
    liveCondition: string;
    humidity: number;
    wind: number;
    windDegree: number;
    visibility: number;
    feelsLike: number;
    isDay: boolean;
    aqi: number | null;
}

export const useSyncAllWeather = () => {
    const searchHistory = useOsStore((state) => state.searchHistory) as WeatherHistoryItem[];
    const updateCityData = useOsStore((state) => state.updateCityData);
    const addNotification = useOsStore((state) => state.addNotification);

    const Api_Key = import.meta.env.VITE_WEATHER_API_KEY;
    const BASE_URL = 'https://api.weatherapi.com/v1';
    const timeoutsRef = useRef<number[]>([]);
    
    // Track processed update timestamps to prevent cascading re-triggers
    const processedTimestamps = useRef<Record<string, number>>({});

    const queryResults = useQueries({
        queries: searchHistory.map((historyItem: WeatherHistoryItem) => ({
            queryKey: ["syncWeather", historyItem.city],
            queryFn: async () => {
                const response = await axios.get(`${BASE_URL}/current.json`, {
                    params: { key: Api_Key, q: historyItem.city, aqi: "yes" },
                });
                return response.data;
            },
            refetchInterval: 1000 * 60 * 15,
            staleTime: 1000 * 60 * 15,
        }))
    });

    useEffect(() => {
        queryResults.forEach((result, index) => {
            if (result.isSuccess && result.data && result.dataUpdatedAt) {
                const historyItem = searchHistory[index];
                if (!historyItem) return;

                // If we already processed this exact fetch timestamp for this city, skip entirely
                if (processedTimestamps.current[historyItem.city] === result.dataUpdatedAt) {
                    return;
                }

                const apiData = result.data;
                const newCityCompare: WeatherHistoryItem = {
                    city: apiData.location.name,
                    country: apiData.location.country,
                    tz_id: apiData.location.tz_id,
                    loc: { lat: apiData.location.lat, lon: apiData.location.lon },
                    liveTemp: apiData.current.temp_c,
                    liveCondition: apiData.current.condition.text,
                    humidity: apiData.current.humidity,
                    wind: apiData.current.wind_kph,
                    windDegree: apiData.current.wind_degree,
                    visibility: apiData.current.vis_km,
                    feelsLike: apiData.current.feelslike_c,
                    isDay: apiData.current.is_day === 1,
                    aqi: apiData.current.air_quality ? apiData.current.air_quality['us-epa-index'] : null,
                };

                const oldCityData: WeatherHistoryItem = { ...historyItem, loc: historyItem.loc ?? null };

                if (JSON.stringify(oldCityData) !== JSON.stringify(newCityCompare)) {
                    processedTimestamps.current[historyItem.city] = result.dataUpdatedAt;
                    
                    const id = window.setTimeout(() => {
                        addNotification(`Synced Weather Data For ${historyItem.city}`, "info");
                    }, 1000);
                    timeoutsRef.current.push(id);
                    updateCityData(historyItem.city, newCityCompare);
                }
            }
        });
    }, [queryResults, searchHistory, addNotification, updateCityData]);

    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach((t) => clearTimeout(t));
            timeoutsRef.current = [];
        };
    }, []);
};