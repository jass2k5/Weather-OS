import { useEffect, useState } from "react";
import { useOsStore } from "../../shared/store/useOsStore";

export const TopRightDate = () => {
    const telemetryData = useOsStore((state) => state.telemetryData);
    const setNight = useOsStore((state) => state.setNight);
    const setDay = useOsStore((state) => state.setDay);
    const dateTimeSettings = useOsStore((state)=>state.dateTimeSettings);
    const [timeString, setTimeString] = useState("");
    const [dateString, setDateString] = useState("");
    
    const getPositionClasses = (pos) => {
        switch(pos) {
            case 'top-left': return 'top-[2%] left-[6%]';
            case 'bottom-left': return 'bottom-[2%] left-[6%]';
            case 'bottom-right': return 'bottom-[2%] right-[6%]';
            case 'top-right': return 'top-[2%] right-[6%]';
            default: return 'top-[2%] right-[6%]';
        }
    };

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


            const timeOptions = {
                timeZone: tz_id,
                hour: "2-digit",
                minute: "2-digit",
                hour12: dateTimeSettings?.format?.hour === "12h"
            };

            if (dateTimeSettings?.showSeconds) {
                timeOptions.second = "2-digit";
            }

            setTimeString(now.toLocaleTimeString("en-US", timeOptions));

          
            const dayName = now.toLocaleDateString("en-US", { timeZone: tz_id, weekday: "short" });
            const monthName = now.toLocaleDateString("en-US", { timeZone: tz_id, month: "short" });
            const dateNum = now.toLocaleDateString("en-US", { timeZone: tz_id, day: "numeric" });
            const year = now.toLocaleDateString("en-US", { timeZone: tz_id, year: "numeric" });

       
            setDateString(`${dayName}, ${monthName} ${dateNum}, ${year}`);
        };

        updateClock(); 
        const timer = setInterval(updateClock, 1000); 
        
        return () => clearInterval(timer);
    }, [telemetryData,dateTimeSettings]); 

   
    if (!timeString) return null;

   if(!dateTimeSettings?.showDateTime) return null;

    return (
        <div className={`date-container absolute ${getPositionClasses(dateTimeSettings.position)} h-auto w-auto z-50 flex flex-col justify-center items-center`}>
            <span style={{color:dateTimeSettings.color?.clr}} className={`consttime drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-medium`}>{timeString}</span>
            <span  style={{color:dateTimeSettings.color?.clr}}  className="constdate drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-medium">{dateString}</span>
        </div>
    );
};