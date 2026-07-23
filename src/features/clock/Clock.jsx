import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MiniCardClock } from "./CardClock";
import { SyncBtn } from "./SyncBtn";
import { useOsStore } from "../../shared/store/useOsStore";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Night from "../../shared/assets/night.jpg"
import Day from "../../shared/assets/day.jpg"


export const Clock = () => {
    const windowOrder = useOsStore((state) => state.windowOrder);
    const myZIndex = 10 + windowOrder.indexOf('clock');
    const searchHistory = useOsStore((state) => state.searchHistory);
    // const allSearches = searchHistory;
    const telemetryData = useOsStore((state) => state.telemetryData);
    const syncAllWeather = useOsStore((state) => state.syncAllWeather);
    const setIsScrollHovered = useOsStore((state) => state.setIsScrollHovered)
    const mouseFollower = useOsStore((state)=>state.mouseFollower);
    const cardRefs = useRef([]);
    const containerRef = useRef(null);
    const addNotification = useOsStore((state) => state.addNotification);

    gsap.registerPlugin(ScrollTrigger);

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
                }
            });
        });
    }, { dependencies: [searchHistory, telemetryData], scope: containerRef });

    useEffect(() => {
        syncAllWeather();
        let timer;

        const weatherTimer = setInterval(() => {
            console.log("Synced Clocks");
            syncAllWeather();
            addNotification("Auto Synced","success")
        }, 300000);

        let length = searchHistory.length;
        addNotification(`${length} locations have been initialised`,"info");
        if(length >0){
         timer = setTimeout(()=>{
            addNotification(`locations will be synced every 5 minutes`,"info");
        },4000);
        }


        return () => {
            clearInterval(weatherTimer)
            clearTimeout(timer);
        };

    }, [])




    return (
        <div style={{ zIndex: myZIndex }} className="Clock h-full w-full absolute top-0 left-0 bg-black pt-10 pb-0 flex items-center justify-center">
            <div onMouseEnter={() => {
                if(mouseFollower?.clockFollower){
                    if (searchHistory.length > 1) {
                    setIsScrollHovered(true);
                }
                }
            }}
                onMouseLeave={() => {
                    if(mouseFollower?.clockFollower){
                        setIsScrollHovered(false);
                    }
                }} ref={containerRef} className=" holder h-[75%] w-[98%] max-w-[900px] overflow-y-auto scrollbar-none relative rounded-3xl -translate-y-10 ">
                {searchHistory.map((loc, index) => (
                    <div key={`${loc.city}-${index}`}
                        ref={(el) => (cardRefs.current[index] = el)}
                        className={`data will-change-transform h-full w-full border-2 rounded-3xl sticky top-0 border-white/25 top-0 `}>
                        <img className="h-full w-full object-center object-cover rounded-3xl z-0" src={loc.isDay ? Day : Night} alt="daynight" />
                        <div className="topLeft h-auto w-auto bg-transparent absolute top-[4%] left-[4%] z-10 flex flex-col justify-center items-start gap-0.5 ">
                            <span className={`countrySpan uppercase text-1xl font-medium ${loc.isDay ? "text-black/60 " : "text-white/60"}`}><i className="ri-map-pin-line"></i> {loc.country}</span>
                            <span className={`citySpan uppercase text-7xl font-[Lora]  ${loc.isDay ? "text-black/60 " : "text-white/60"} `}>{loc.city}</span>
                            <span className={`conditionSpan uppercase text-1xl ${loc.isDay ? "text-black/60 " : "text-white/60"}`}>{loc.isDay ? <i className="ri-sun-line text-orange-400"></i> : <i className="ri-moon-line"></i>}  {loc.liveCondition}</span>
                        </div>
                        <div className="bottomLeft absolute bottom-[6%] left-[3%] flex flex-col items-start justify-center">
                            <span className={`temp text-8xl  font-[Lora] drop-shadow-2xl ${loc.isDay ? "text-white/60 " : "text-white/60"}`}>{loc.liveTemp}°C</span>
                        </div>

                        <MiniCardClock
                            tz_id={loc.tz_id}
                        />

                        <SyncBtn />


                        <div className="bottomRight absolute bottom-[6%] right-[1%] flex justify-center items-center gap-3.5">

                            <div className={`feels flex flex-col justify-start items-start gap-1 border-2 rounded-xl pr-6 pl-4 pt-2 pb-2 ${loc.isDay ? "bg-white/40 border-white/40" : "bg-white/10 border-white/20"} backdrop-blur-2xl`}>
                                <i className={`ri-temp-hot-line capitalize text-[14px] ${loc.isDay ? "text-black/60" : "text-white/50"}`}> feels</i>
                                <span className={loc.isDay ? "text-black font-medium" : "text-white"}>{loc.feelsLike} °C</span>
                            </div>

                            <div className={`humidity flex flex-col justify-start items-start gap-1 border-2 rounded-xl pr-6 pl-4 pt-2 pb-2 ${loc.isDay ? "bg-white/40 border-white/40" : "bg-white/10 border-white/20"} backdrop-blur-2xl`}>
                                <i className={`ri-water-percent-line capitalize text-[14px] ${loc.isDay ? "text-black/60" : "text-white/50"}`}> humidity</i>
                                <span className={loc.isDay ? "text-black font-medium" : "text-white"}>{loc.humidity}%</span>
                            </div>

                            <div className={`wind flex flex-col justify-start items-start gap-1 border-2 rounded-xl pr-6 pl-4 pt-2 pb-2 ${loc.isDay ? "bg-white/40 border-white/40" : "bg-white/10 border-white/20"} backdrop-blur-2xl`}>
                                <i className={`ri-cloud-windy-line capitalize text-[14px] ${loc.isDay ? "text-black/60" : "text-white/50"}`}> wind</i>
                                <span className={loc.isDay ? "text-black font-medium" : "text-white"}>{loc.wind} Km/h</span>
                            </div>

                            <div className={`visibility flex flex-col justify-start items-start gap-1 border-2 rounded-xl pr-6 pl-4 pt-2 pb-2 ${loc.isDay ? "bg-white/40 border-white/40" : "bg-white/10 border-white/20"} backdrop-blur-2xl`}>
                                <i className={`ri-eye-line capitalize text-[14px] ${loc.isDay ? "text-black/60" : "text-white/50"}`}> visibility</i>
                                <span className={loc.isDay ? "text-black font-medium" : "text-white"}>{loc.visibility} Km</span>
                            </div>

                        </div>
                        {searchHistory?.length > 0 && (
                            <div className="h-[150px] w-full shrink-0 opacity-0 pointer-events-none"></div>
                        )}

                    </div>
                ))}
            </div>

        </div>
    )

}