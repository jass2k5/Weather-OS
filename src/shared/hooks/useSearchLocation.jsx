import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useOsStore } from "../store/useOsStore";

export const useLocationSearch = () => {
    const setSystemTelemetry = useOsStore((state) => state.setSystemTelemetry);
    const addSearchToHistory = useOsStore((state) => state.addSearchToHistory);
    const addNotification = useOsStore((state) => state.addNotification);
    
    // 1. Bring in the Query Client
    const queryClient = useQueryClient();

    const Api_Key = import.meta.env.VITE_WEATHER_API_KEY;
    const BASE_URL = 'https://api.weatherapi.com/v1';

   //addded fetchquery to check synallweather cache so it doesn't forcefully push data by api call and without it the api call goes the syncallweather checks the cache to compare if it's diff it pass it but inside the synallweather indivisual cache isn't synced causing update on every search
    const fetchLocationTelemetry = async (locationName) => {
       
        return queryClient.fetchQuery({
      
            queryKey: ["syncWeather", locationName], 
            
            queryFn: async () => {
                const response = await axios.get(`${BASE_URL}/current.json`, {
                    params: {
                        key: Api_Key,
                        q: locationName,
                        aqi: "yes"
                    }
                });
                return response.data;
            },
          
            staleTime: 1000 * 60 * 15 
        });
    };

    const mutation = useMutation({
        mutationFn: fetchLocationTelemetry,
        onSuccess: (data, submittedLocation) => {
            setSystemTelemetry(submittedLocation, data);
            addSearchToHistory(data);

            const currentAqi = data?.current?.air_quality?.['us-epa-index'];
            const locName = data?.location?.name;

            addNotification(`Telemetry stream active: ${locName}`, "info");

            setTimeout(() => {
                if (currentAqi <= 2) {
                    addNotification(`AQI is Good for ${locName}`, "success");
                } else if (currentAqi === 3) {
                    addNotification(`Moderate AQI in ${locName}`, "warning");
                } else {
                    addNotification(`Critical: Hazardous AQI in ${locName}!`, "error");
                }
            }, 4000);
        }
    });

    return {
        searchLocation: mutation.mutate,
        isSearching: mutation.isPending
    };
};