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
    return (
        <div style={{ zIndex: myZIndex }} className="Clock h-full w-full absolute top-0 left-0 bg-black p-10 flex items-center justify-center">
            <div className="h-[70vh] w-[70vw] overflow-y-scrol scrollbar-none relative rounded-3xl">
                <div className="data h-full w-full border-2 rounded-3xl -translate-y-3.5 border-white/25 ">
                    <img className="h-full w-full object-center object-cover rounded-3xl z-0" src={isDay ? Day : Night} alt="daynight" />
                    <div className="topLeft h-auto w-auto bg-transparent absolute top-[4%] left-[4%] z-10 flex flex-col justify-center items-start gap-0.5">
                        <span className={`countrySpan uppercase text-1xl font-medium ${isDay ? "text-gray-600 " : "text-white/60"}`}><i className="ri-map-pin-line"></i> {telemetryData?.location?.country}</span>
                        <span className="citySpan uppercase text-7xl font-[Lora]">{telemetryData?.location?.name}</span>
                        <span className={`conditionSpan uppercase text-1xl ${isDay ? "text-gray-600 ": "text-white/60"}`}>{isDay?<i class="ri-sun-line"></i>:<i class="ri-moon-line"></i>}  {weatherText}</span>
                    </div>

                </div>
            </div>

        </div>
    )

}