import { useEffect, useState } from "react";
import { useOsStore } from "../shared/store/useOsStore";

export const TopRightDate = () => {
    const telemetryData = useOsStore((state) => state.telemetryData);
    const setNight = useOsStore((state) => state.setNight);
    const setDay = useOsStore((state) => state.setDay);
    

    const [timeString, setTimeString] = useState("");
    const [dateString, setDateString] = useState("");


    useEffect(() => {
        if (!telemetryData?.current) return;
        const isDaytime = telemetryData.current.is_day === 1;
        if (!isDaytime) {
            setNight();
        } else {
            setDay();
        }
    }, [telemetryData, setDay, setNight]);


    useEffect(() => {

        const tz_id = telemetryData?.location?.tz_id;
        
        if (!tz_id) return;

        const updateClock = () => {
            const now = new Date();


            setTimeString(now.toLocaleTimeString("en-US", {
                timeZone: tz_id,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }));

          
            const dayName = now.toLocaleDateString("en-US", { timeZone: tz_id, weekday: "short" });
            const monthName = now.toLocaleDateString("en-US", { timeZone: tz_id, month: "short" });
            const dateNum = now.toLocaleDateString("en-US", { timeZone: tz_id, day: "numeric" });
            const year = now.toLocaleDateString("en-US", { timeZone: tz_id, year: "numeric" });

       
            setDateString(`${dayName}, ${monthName} ${dateNum}, ${year}`);
        };

        updateClock(); 
        const timer = setInterval(updateClock, 1000); 
        
        return () => clearInterval(timer);
    }, [telemetryData]); 

   
    if (!timeString) return null;

    return (
        <div className="date-container absolute top-[2%] right-[6%] h-auto w-auto z-50 flex flex-col justify-center items-center">
            <span className="consttime">{timeString}</span>
            <span className="constdate">{dateString}</span>
        </div>
    );
};