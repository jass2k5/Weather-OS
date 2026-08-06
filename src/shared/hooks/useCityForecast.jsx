import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCityForecast = (cityname) => {
    const Api_Key = import.meta.env.VITE_WEATHER_API_KEY;
    const BASE_URL = 'https://api.weatherapi.com/v1';

    return useQuery({
        queryKey: ["forecast", cityname],
        queryFn: async () => {
            const response = await axios.get(`${BASE_URL}/forecast.json`, {
                params: {
                    key: Api_Key,
                    q: cityname,
                    days: 7, 
                    aqi: "yes",
                    alerts: "no"
                }
            });
            return response.data;
        },
        staleTime: 1000 * 60 * 20,
        refetchInterval: 1000 * 60 * 20
    });
}