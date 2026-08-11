import { useQueries } from "@tanstack/react-query";
import { useEffect, useMemo, useRef } from "react";
import { useOsStore } from "../store/useOsStore";
import axios from "axios";

export const useSyncAllWeather = () => {
    const searchHistory = useOsStore((state) => state.searchHistory);
    const updateCityData = useOsStore((state) => state.updateCityData);
    const addNotification = useOsStore((state) => state.addNotification);

    const Api_Key = import.meta.env.VITE_WEATHER_API_KEY;
    const BASE_URL = 'https://api.weatherapi.com/v1';

    const timeoutsRef = useRef([]);

    const queryOptions = useMemo(() => {
        return searchHistory.map((loc) => ({
            queryKey: ["syncWeather", loc.city],
            queryFn: async () => {
                const response = await axios.get(`${BASE_URL}/current.json`, {
                    params: {
                        key: Api_Key,
                        q: loc.city,
                        aqi: "yes"
                    }
                });
                return response.data;
            },

            refetchInterval: 1000 * 60 * 15,
            staleTime: 1000 * 60 * 15,

            onSuccess: (apiData) => {
                try {
                    const currentCity = loc;

                    const newCityData = {
                        city: apiData.location.name,
                        location: apiData.location,
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

                    const oldCityData = {
                        city: currentCity.city,
                        country: currentCity.country,
                        tz_id: currentCity.tz_id,
                        location: currentCity.location ?? null,
                        loc: currentCity.loc ?? null,
                        liveTemp: currentCity.liveTemp,
                        liveCondition: currentCity.liveCondition,
                        humidity: currentCity.humidity,
                        wind: currentCity.wind,
                        windDegree: currentCity.windDegree,
                        visibility: currentCity.visibility,
                        feelsLike: currentCity.feelsLike,
                        isDay: currentCity.isDay,
                        aqi: currentCity.aqi,
                    };

                    if (JSON.stringify(oldCityData) !== JSON.stringify(newCityData)) {
                        const id = setTimeout(() => {
                            addNotification(`Synced Weather Data For ${currentCity.city}`, "info");
                        }, 1000);
                        timeoutsRef.current.push(id);
                        updateCityData(currentCity.city, newCityData);
                    }
                } catch (err) {
                    console.error("sync onSuccess error", err);
                }
            }
        }));
    }, [searchHistory.map((s) => s.city).join(','), Api_Key, addNotification, updateCityData]);

    const queryResults = useQueries({ queries: queryOptions });

    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach((t) => clearTimeout(t));
            timeoutsRef.current = [];
        };
    }, []);

    return { queryResults };
}
 
