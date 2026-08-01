import { useQueries } from "@tanstack/react-query";
import { useEffect, useMemo, useRef } from "react";
import { useOsStore } from "../store/useOsStore";

export const useSyncAllWeather = () => {
    const searchHistory = useOsStore((state) => state.searchHistory);
    const updateCityData = useOsStore((state) => state.updateCityData);
    const addNotification = useOsStore((state) => state.addNotification);

    const Api_Key = import.meta.env.VITE_WEATHER_API_KEY;
    const BASE_URL = 'https://api.weatherapi.com/v1';

    const timeRef = useRef(null);

    const queryOptions = useMemo(() => {//use memo to not let searchhistoy change address on re render and cause queryoptions to run 
        return searchHistory.map((loc) => ({
            queryKey: ["syncWeather", loc.city],
            queryFn: async () => {
                const response = await fetch(`${BASE_URL}/current.json?key=${Api_Key}&q=${loc.city}`);
                if (!response.ok) throw new Error(`Something went wrong while fetching ${loc.city}`);
                return response.json();
            },

            refetchInterval: 1000 * 60 * 15,//every city got it's own stale time if we add new city it's stale time took more time than previous ones 
            staleTime: 1000 * 60 * 15
        }));
    }, [searchHistory, Api_Key]);


    const queryResults = useQueries({// it re runs even if the query just flaging isfetching true even before getting data back we need to make a gatekeeping comparison with code so it doesn't cause multiple re renders and state changes 
        queries: queryOptions
    });

    useEffect(() => {
        queryResults.forEach((result, index) => {
            if (result.isSuccess && result.data) {
                const apiData = result.data;
                const currentCity = searchHistory[index];


                const newCityData = {
                    city: apiData.location.name,
                    country: apiData.location.country,
                    tz_id: apiData.location.tz_id,
                    liveTemp: apiData.current.temp_c,
                    liveCondition: apiData.current.condition.text,
                    humidity: apiData.current.humidity,
                    wind: apiData.current.wind_kph,
                    visibility: apiData.current.vis_km,
                    feelsLike: apiData.current.feelslike_c,
                    isDay: apiData.current.is_day === 1,
                    aqi: apiData.current.air_quality ? apiData.current.air_quality['us-epa-index'] : null,
                };

                //old zustand data for comparison
                const oldCityData = {
                    city: currentCity.city,
                    country: currentCity.country,
                    tz_id: currentCity.tz_id,
                    liveTemp: currentCity.liveTemp,
                    liveCondition: currentCity.liveCondition,
                    humidity: currentCity.humidity,
                    wind: currentCity.wind,
                    visibility: currentCity.visibility,
                    feelsLike: currentCity.feelsLike,
                    isDay: currentCity.isDay,
                    aqi: currentCity.aqi,
                };


                if (JSON.stringify(oldCityData) !== JSON.stringify(newCityData)) {
                    timeRef.current = setTimeout(() => {
                        addNotification(`Synced Weather Data For ${currentCity.city}`, "info");
                    }, 8000);
                    updateCityData(currentCity.city, newCityData);
                }
            }
            return ()=> clearTimeout(timeRef.current);
        });
    }, [queryResults, searchHistory, updateCityData]);

    return { queryResults };
};