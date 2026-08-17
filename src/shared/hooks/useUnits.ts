import { useOsStore } from "../store/useOsStore";

export const useTemperatureUnit = () => {
    const isCelsius = useOsStore((state) => state.tempdist.celsius);
    const iskm = useOsStore((state) => state.tempdist.km);

    const formatTemp = (celsius:number) => {
        if (!isCelsius) {
            return `${Math.round(celsius)}°C`;
        } else {

            return `${Math.round((celsius * 9 / 5) + 32)}°F`;
        }

    }

    const formatDistance = (distance:number) => {
        if (!iskm) {// bcz of btn being false on start we have to do !km for true state
            
            return `${Math.round(distance)} km`;
        } else {
            return `${Math.round(distance * 0.621371)} mi`;
        }
    }
    return { formatTemp, formatDistance };

}
