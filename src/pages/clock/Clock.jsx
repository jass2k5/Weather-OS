import { useOsStore } from "../../store/useOsStore";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Night from "../../assets/night.jpg"
import Day from "../../assets/day.jpg"


export const Clock = () => {
    const windowOrder = useOsStore((state) => state.windowOrder);
    const focusApp = useOsStore((state) => state.focusApp);
    const myZIndex = 10 + windowOrder.indexOf('clock');
    const isDay = useOsStore((state) => state.isDay);
    const searchHistory = useOsStore((state) => state.searchHistory);
    const allSearches = searchHistory;
    const telemetryData = useOsStore((state) => state.telemetryData);
    const temperature = telemetryData?.current?.temp_c ?? 0;
    const weatherText = telemetryData?.current?.condition?.text ?? "Couldn't fetch the data";
    const feelsLike = telemetryData?.current?.feelslike_c ?? "--";
    const humidity = telemetryData?.current?.humidity ?? "--";
    const windSpeed = telemetryData?.current?.wind_kph ?? "--";
    const visibility = telemetryData?.current?.vis_km ?? "--";
    const [liveDate, setLiveDate] = useState(null);
   

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
    }, [telemetryData]);

    if(!liveDate) return;
     const timestring = liveDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
    });

    const dayName = liveDate.toLocaleDateString("en-US", { weekday: "short" });
    const monthName = liveDate.toLocaleDateString("en-US", { month: "short" });
    const dateNum = liveDate.getDate();
    const year = liveDate.getFullYear();

    return (
        <div style={{ zIndex: myZIndex }} className="Clock h-full w-full absolute top-0 left-0 bg-black p-10 flex items-center justify-center">
            <div className="h-[70vh] w-[55vw] overflow-y-auto scrollbar-none relative rounded-3xl -translate-y-5">
                <div className="data h-full w-full border-2 rounded-3xl sticky top-4 border-white/25 ">
                    <img className="h-full w-full object-center object-cover rounded-3xl z-0" src={isDay ? Day : Night} alt="daynight" />
                    <div className="topLeft h-auto w-auto bg-transparent absolute top-[4%] left-[4%] z-10 flex flex-col justify-center items-start gap-0.5">
                        <span className={`countrySpan uppercase text-1xl font-medium ${isDay ? "text-gray-600 " : "text-white/60"}`}><i className="ri-map-pin-line"></i> {telemetryData?.location?.country}</span>
                        <span className={`citySpan uppercase text-7xl font-[Lora]  ${isDay ? "text-gray-600 " : "text-white/60"} `}>{telemetryData?.location?.name}</span>
                        <span className={`conditionSpan uppercase text-1xl ${isDay ? "text-gray-600 " : "text-white/60"}`}>{isDay ? <i className="ri-sun-line"></i> : <i className="ri-moon-line"></i>}  {weatherText}</span>
                    </div>
                    <div className="bottomLeft absolute bottom-[6%] left-[3%] flex flex-col items-start justify-center">
                        <span className={`temp text-8xl  font-[Lora] drop-shadow-2xl ${isDay ? "text-white " : "text-white"}`}>{temperature}°C</span>
                    </div>
                    <div className="dataTime absolute top-[5%] right-[3%] flex flex-col justify-center items-center ">
                        <span className="date capitalize text-xl font-[Lora]">{monthName} {dateNum},  {year}</span>
                        <span className="self-end">{timestring}</span>
                    </div>

                    <div className="bottomRight absolute bottom-[5%] right-[4%] flex justify-center items-center gap-3.5">
                        <div className="feels flex flex-col justify-start items-start gap-1 border-2 border-white/20 rounded-xl pr-6 pl-4 pt-2 pb-2  bg-white/10 backdrop-blur-2xl">
                            <i className="ri-temp-hot-line capitalize text-[14px] text-white/50 "> feels</i>
                            <span>{feelsLike} °C</span>
                        </div>
                        <div className="humidity flex flex-col justify-start items-start gap-1 border-2 border-white/20 rounded-xl pr-6 pl-4 pt-2 pb-2 bg-white/10 backdrop-blur-2xl">
                            <i className="ri-water-percent-line capitalize text-[14px] text-white/50 "> humidity</i>
                            <span>{humidity}%</span>
                        </div>
                        <div className="wind flex flex-col justify-start items-start gap-1 border-2 border-white/20 rounded-xl pr-6 pl-4 pt-2 pb-2 bg-white/10 backdrop-blur-2xl">
                            <i className="ri-cloud-windy-line capitalize text-[14px] text-white/50 "> wind</i>
                            <span>{windSpeed} Km/h</span>
                        </div>
                        <div className="wind flex flex-col justify-start items-start gap-1 border-2 border-white/20 rounded-xl pr-6 pl-4 pt-2 pb-2 bg-white/10 backdrop-blur-2xl">
                            <i className="ri-eye-line capitalize text-[14px] text-white/50 "> visibility</i>
                            <span>{visibility} Km</span>
                        </div>
                    </div> 

                </div>
            </div>

        </div>
    )

}