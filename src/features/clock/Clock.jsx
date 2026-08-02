import { useOsStore } from "../../shared/store/useOsStore";
import { useEffect, useRef } from "react";
import { WeatherCards } from "./WeatherCards";


export const Clock = () => {

    const searchHistory = useOsStore((state) => state.searchHistory);
    const addNotification = useOsStore((state) => state.addNotification);

    useEffect(() => {
        let length = searchHistory.length;
        addNotification(`${length} locations have been initialised`, "info");

    }, [])


    return (
        <div className="Clock h-full w-full absolute top-0 left-0 bg-black pt-10 pb-0 flex items-center justify-center">
           <WeatherCards/>
        </div>
    )

}
