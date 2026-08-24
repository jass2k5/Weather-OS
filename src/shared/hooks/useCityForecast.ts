import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// 1. Blueprint for the exact data your Weather-OS uses
export interface WeatherAPIResponse {
    location: {
        name: string;
        country: string;
        localtime: string;
    };
    current: {
        temp_c: number;
        feelslike_c: number;
        humidity: number;
        vis_km: number;
        wind_kph: number;
        wind_degree: number;
        wind_dir: string;
        precip_mm: number;
        is_day: number;
        condition: {
            text: string;
            icon: string;
        };
        air_quality?: {
            "us-epa-index"?: number;
            pm2_5?: number;
        };
    };
    forecast: {
        forecastday: Array<{
            date: string;
            day: {
                maxtemp_c: number;
                mintemp_c: number;
                totalprecip_mm: number;
                condition: {
                    text: string;
                    icon: string;
                };
            };
            astro: {
                sunrise: string;
                sunset: string;
            };
            hour: Array<{
                time_epoch: number;
                time: string;
                temp_c: number;
                is_day: number;
                precip_mm: number;
                condition: {
                    text: string;
                    icon: string;
                };
                air_quality?: {
                    "us-epa-index"?: number;
                    pm2_5?: number;
                };
            }>;
        }>;
    };
}
export const useCityForecast = (cityname:string) =>  {
    const Api_Key = import.meta.env.VITE_WEATHER_API_KEY;
    const BASE_URL = 'https://api.weatherapi.com/v1';

    return useQuery({
        queryKey: ["forecast", cityname],
        queryFn: async () => {
            const response = await axios.get<WeatherAPIResponse>(`${BASE_URL}/forecast.json`, {
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
        refetchInterval: 1000 * 60 * 20,
        enabled: !!cityname,
    });
}