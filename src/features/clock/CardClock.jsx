import { useState,useEffect } from "react";
import { useOsStore } from "../../shared/store/useOsStore";

export const MiniCardClock = ({ tz_id }) => {
    const [time, setTime] = useState("");
    const [monthName,setMonthName] = useState("");
    const [dateNum,setDateNum] = useState("");
    const [year,setYear] = useState("");
    const telemetryData = useOsStore((state)=>state.telemetryData);
    const is12h = useOsStore((state)=>state.clockSetting?.format?.hour);

    useEffect(() => {
        if (!tz_id) return;

        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", {
                timeZone: tz_id,
                hour: "2-digit",
                minute: "2-digit",
                hour12: is12h === "12h"
            }));

            setMonthName(now.toLocaleDateString("en-US", { timeZone:tz_id, month: "short" }));
            setDateNum(now.toLocaleDateString("en-US", {
                timeZone: tz_id,
                day: "numeric"
            }));

            setYear(now.toLocaleDateString("en-US", {
                timeZone: tz_id,
                year: "numeric"
            }));
        };

        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, [tz_id,telemetryData,is12h]);


    return(
             <div className="dataTime absolute top-[5%] right-[3%] flex flex-col justify-center items-center ">
                        <span className="date capitalize text-xl font-[Lora]">{monthName} {dateNum},  {year}</span>
                        <span className="self-end">{time}</span>
                    </div>
    )
};