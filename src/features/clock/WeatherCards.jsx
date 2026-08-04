import { useGSAP } from "@gsap/react";
import { memo } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MiniCardClock } from "./CardClock";
import { SyncBtn } from "./SyncBtn";
import { useOsStore } from "../../shared/store/useOsStore";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Night from "../../shared/assets/night.jpg";
import Day from "../../shared/assets/day.jpg";
import { useTemperatureUnit } from "../../shared/hooks/useUnits";

gsap.registerPlugin(ScrollTrigger);

export const WeatherCards = memo(() => {
    const clockSetting = useOsStore((state) => state.clockSetting);
    const searchHistory = useOsStore((state) => state.searchHistory);
    const setIsScrollHovered = useOsStore((state) => state.setIsScrollHovered)
    const clockFollower = useOsStore((state) => state.mouseFollower.clockFollower);
    const cardRefs = useRef([]);
    const containerRef = useRef(null);
    const { formatTemp, formatDistance } = useTemperatureUnit();

    useGSAP(() => {
        if (cardRefs.current.length === 0) return;

        cardRefs.current.forEach((card) => {
            if (!card) return;

            gsap.to(card, {
                scale: 0.9,
                transformOrigin: "top center",

                scrollTrigger: {
                    trigger: card,
                    scroller: containerRef.current,
                    start: "top 10px",
                    end: "+=150",
                    scrub: 1,
                    onLeave: () => card.querySelector("video")?.pause(),
                    onEnterBack: () => card.querySelector("video")?.play(),
                }
            });

        });
        let resizeTimeout;
        const resizeObserver = new ResizeObserver(() => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 200);
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }
        

        return () => {
            resizeObserver.disconnect();
            clearTimeout(resizeTimeout); 
        };
    }, { scope: cardRefs });


    return (
        <div onMouseEnter={() => {
            if (clockFollower) {
                if (searchHistory.length > 1) {
                    setIsScrollHovered(true);
                }
            }
        }}
            onMouseLeave={() => {
                if (clockFollower) {
                    setIsScrollHovered(false);
                }
            }} ref={containerRef} className=" holder h-[75%] w-[98%] max-w-[900px] overflow-y-auto scrollbar-none relative rounded-3xl -translate-y-8">
            {searchHistory.map((loc, index) => (
                <div key={`${loc.city}-${index}`}
                    ref={(el) => (cardRefs.current[index] = el)}
                    className={`data  h-full w-full border-2 rounded-3xl overflow-hidden sticky top-0 border-white/25 top-0 `}>
                    {loc.isDay && clockSetting.liveDay && (<video
                        className="video h-full w-full object-center object-cover scale-x-[1.07] rounded-3xl z-0 "
                        src={"./DayVideo.mp4"}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />)}
                    {!loc.isDay && clockSetting.liveNight && (<video
                        className="video h-full w-full object-center object-cover rounded-3xl z-0"
                        src={"./NightVideo.mp4"}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />)}

                    {!loc.isDay && !clockSetting.liveNight && (
                        <img className="h-full w-full object-center object-cover rounded-3xl z-0" src={Night} alt="night" />
                    )}
                    {loc.isDay && !clockSetting.liveDay && (<img className="h-full w-full object-center object-cover rounded-3xl z-0" src={Day} alt="night" />)}

                    <div className="topLeft h-auto w-auto bg-transparent absolute top-[4%] left-[4%] z-10 flex flex-col justify-center items-start gap-0.5 ">
                        <span className={`countrySpan uppercase text-1xl font-medium ${loc.isDay ? "text-black/60 " : "text-white/60"}`}><i className="ri-map-pin-line"></i> {loc.country}</span>
                        <span className={`citySpan uppercase text-7xl font-[Lora]  ${loc.isDay ? "text-black/60 " : "text-white/60"} `}>{loc.city}</span>
                        <span className={`conditionSpan uppercase text-1xl ${loc.isDay ? "text-black/60 " : "text-white/60"}`}>{loc.isDay ? <i className="ri-sun-line text-orange-400"></i> : <i className="ri-moon-line"></i>}  {loc.liveCondition}</span>
                    </div>
                    <div className="bottomLeft absolute bottom-[6%] left-[3%] flex flex-col items-start justify-center">
                        <span className={`temp text-8xl  font-[Lora] drop-shadow-2xl ${loc.isDay ? "text-white/60 " : "text-white/60"}`}>{formatTemp(loc.liveTemp)}</span>
                    </div>

                    <MiniCardClock
                        tz_id={loc.tz_id}
                    />

                    <SyncBtn
                        city={loc.city}
                    />


                    <div className="bottomRight absolute bottom-[6%] right-[1%] flex justify-center items-center gap-3.5">

                        <div className={`feels flex flex-col justify-start items-start gap-1 border-2 rounded-xl pr-6 pl-4 pt-2 pb-2 ${loc.isDay ? "bg-white/40 border-white/40" : "bg-white/10 border-white/20"} backdrop-blur-xl`}>
                            <i className={`ri-temp-hot-line capitalize text-[14px] ${loc.isDay ? "text-black/60" : "text-white/50"}`}> feels</i>
                            <span className={loc.isDay ? "text-black font-medium" : "text-white"}>{formatTemp(loc.feelsLike)}</span>
                        </div>

                        <div className={`humidity flex flex-col justify-start items-start gap-1 border-2 rounded-xl pr-6 pl-4 pt-2 pb-2 ${loc.isDay ? "bg-white/40 border-white/40" : "bg-white/10 border-white/20"} backdrop-blur-xl`}>
                            <i className={`ri-water-percent-line capitalize text-[14px] ${loc.isDay ? "text-black/60" : "text-white/50"}`}> humidity</i>
                            <span className={loc.isDay ? "text-black font-medium" : "text-white"}>{loc.humidity}%</span>
                        </div>

                        <div className={`wind flex flex-col justify-start items-start gap-1 border-2 rounded-xl pr-6 pl-4 pt-2 pb-2 ${loc.isDay ? "bg-white/40 border-white/40" : "bg-white/10 border-white/20"} backdrop-blur-xl`}>
                            <i className={`ri-cloud-windy-line capitalize text-[14px] ${loc.isDay ? "text-black/60" : "text-white/50"}`}> wind</i>
                            <span className={loc.isDay ? "text-black font-medium" : "text-white"}>{formatDistance(loc.wind)}</span>
                        </div>

                        <div className={`visibility flex flex-col justify-start items-start gap-1 border-2 rounded-xl pr-6 pl-4 pt-2 pb-2 ${loc.isDay ? "bg-white/40 border-white/40" : "bg-white/10 border-white/20"} backdrop-blur-xl`}>
                            <i className={`ri-eye-line capitalize text-[14px] ${loc.isDay ? "text-black/60" : "text-white/50"}`}> visibility</i>
                            <span className={loc.isDay ? "text-black font-medium" : "text-white"}>{formatDistance(loc.visibility)}</span>
                        </div>

                    </div>

                </div>
            ))}
            {searchHistory?.length > 0 && (
                <div className="h-[150px] w-full shrink-0 opacity-0 pointer-events-none"></div>
            )}
        </div>

    )

})