import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useOsStore } from "../store/useOsStore";

export const useSearchLocation = () => {
    const addSearchToHistory = useOsStore((state) => state.addSearchToHistory);
    const addNotification = useOsStore((state) => state.addNotification);
    
    // 1. Bring in the Query Client
    const queryClient = useQueryClient();

    const Api_Key = import.meta.env.VITE_WEATHER_API_KEY;
    const BASE_URL = 'https://api.weatherapi.com/v1';

//Added fetch query because on manual api call it updates searchhistory which enventually trigger useQueries of syncallweather and by querkey it checks the cache and the stale time for this location can be x<15 minutes. it returns cache data the useffect then compares cache data with zustand data as if the manual searchhistoy data is slightly changed even by .01 it fails === and push the cache data to newly search history and it will happen again and again as the syncweather cache isn't synced with manual search 
    const fetchLocationTelemetry = async (locationName:string) => {
       
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
        onSuccess: (data:any) => {
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