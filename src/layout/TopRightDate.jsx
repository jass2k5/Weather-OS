import { useEffect, useState } from "react";
import { useOsStore } from "../store/useOsStore";

export const TopRightDate =()=>{
    const telemetryData = useOsStore((state) => state.telemetryData);
    const setNight = useOsStore((state)=> state.setNight);
    const [liveDate,setLiveDate] = useState(null);

    const isDaytime = telemetryData?.current?.is_day === 1;
 

 useEffect(() => {
        let timer;
        if (telemetryData?.location?.localtime) {
            const apiTimeString = telemetryData.location.localtime.replace(/-/g, "/");
            let currentDate = new Date(apiTimeString);
            
            setLiveDate(currentDate);

            timer = setInterval(() => {
                currentDate = new Date(currentDate.getTime() + 1000);
                setLiveDate(currentDate);
            }, 1000);
        }
        return () => clearInterval(timer);
    },[telemetryData])

    if(!liveDate) return null;

    const timestring = liveDate.toLocaleTimeString("en-US",{
        hour:"2-digit",
        minute:"2-digit",
        second:"2-digit"
    });

    const dayName = liveDate.toLocaleDateString("en-US", { weekday: "short" });
    const monthName = liveDate.toLocaleDateString("en-US", { month: "short" });
    const dateNum = liveDate.getDate();
    const year = liveDate.getFullYear();

    return(
        <div className="date-container absolute top-[2%] right-[6%] h-auto w-auto z-50 flex flex-col justify-center items-center">
            <span className="consttime ">{`${timestring}`}</span>
            <span className="constdate">{`${dayName}, ${monthName} ${dateNum}, ${year}`}</span>
        </div>
    )
}