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
        feelslike_c: number; // For your "Right now" feels like UI
        humidity: number;
        vis_km: number;
        wind_kph: number;
        wind_degree: number; // For your wind compass!
        wind_dir: string;
        precip_mm: number;   // For your precipitation charts
        condition: {
            text: string;
            icon: string;
        };
        air_quality?: {
            "us-epa-index"?: number; // For your advisory banner and AQI badges
        };
    };
    forecast: {
        // forecastday is an array of 7 items (since you fetch days: 7)
        forecastday: Array<{
            date: string;
            day: {
                maxtemp_c: number; // For your 7-day max/min bars
                mintemp_c: number;
                totalprecip_mm: number;
                condition: {
                    text: string;
                    icon: string;
                };
            };
            astro: {
                sunrise: string; // For your sunrise/sunset dial
                sunset: string;
            };
            // hour is an array of 24 items for that specific day
            hour: Array<{
                time: string; // "2026-08-20 00:00"
                temp_c: number;
                condition: {
                    text: string;
                    icon: string;
                };
                air_quality?: {
                    "us-epa-index"?: number;
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