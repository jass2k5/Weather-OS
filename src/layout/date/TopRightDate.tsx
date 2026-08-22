import { useEffect, useState } from "react";
import { useOsStore } from "../../shared/store/useOsStore";

export const TopRightDate = () => {
    const isDay = useOsStore((state) => state.telemetryData?.isDay);
    const tzid = useOsStore((state) => state.telemetryData?.tz_id);
    const setNight = useOsStore((state) => state.setNight);
    const setDay = useOsStore((state) => state.setDay);
    const showDateTime = useOsStore((state) => state.dateTimeSettings?.showDateTime);
    const showSeconds = useOsStore((state) => state.dateTimeSettings?.showSeconds);
    const formatHour = useOsStore((state) => state.dateTimeSettings?.format?.hour);
    const colorClr = useOsStore((state) => state.dateTimeSettings?.color?.clr);
    const position = useOsStore((state) => state.dateTimeSettings?.position);
    const [timeString, setTimeString] = useState("");
    const [dateString, setDateString] = useState("");
    
    const getPositionClasses = (pos:string) => {
        switch(pos) {
            case 'top-left': return 'top-[8%] left-[6%]';
            case 'bottom-left': return 'bottom-[2%] left-[6%]';
            case 'bottom-right': return 'bottom-[2%] right-[6%]';
            case 'top-right': return 'top-[5%] right-[2%]';
            default: return 'top-[2%] right-[6%]';
        }   
    };

   
    useEffect(() => {
         
        if (!isDay) {
            setNight();
        } else {
            setDay();
        }
    }, [isDay, setDay, setNight]);

    
    useEffect(() => {
        const tz_id = tzid; 
        
        if (!tz_id) return;

        const updateClock = () => {
            const now = new Date();

            const timeOptions: Intl.DateTimeFormatOptions = {
                timeZone: tz_id,
                hour: "2-digit",
                minute: "2-digit",
                hour12: formatHour === "12h"
            };

            if (showSeconds) {
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
    }, [tzid, showSeconds, formatHour]); 

    if (!timeString) return null;
    if (!showDateTime) return null;

    return (
        <div className={`date-container absolute ${getPositionClasses(position)} h-auto w-auto z-50 flex flex-col justify-center items-center`}>
            <span style={{color: colorClr}} className={`consttime drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-medium`}>
                {timeString}
            </span>
            <span style={{color: colorClr}} className="constdate drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-medium">
                {dateString}
            </span>
        </div>
    );
};