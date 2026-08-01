import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useOsStore } from "../store/useOsStore";

export const useSearchLocation = () => {
    const setSystemTelemetry = useOsStore((state) => state.setSystemTelemetry);
    const addSearchToHistory = useOsStore((state) => state.addSearchToHistory);
    const addNotification = useOsStore((state) => state.addNotification);

    const Api_Key = import.meta.env.VITE_WEATHER_API_KEY;
    const BASE_URL = 'https://api.weatherapi.com/v1';

    const fetchLocationTelemetry = async (locationName) => {
        try {
            const response = await axios.get(`${BASE_URL}/current.json`, {
                params: {
                    key: Api_Key,
                    q: locationName,
                    aqi: "yes"
                }
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error("API CALL FAILED:", error.response);
            }
            throw error;
        }
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