import { useEffect, useState } from "react";
import { useOsStore } from "../../shared/store/useOsStore";
import { ConditionTitle } from "./ConditionTitle";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { WindCompass } from "./WindCompass";
import { HourlyForecast } from "./HourlyForecast";
import { SolarArc } from "./SolarArc";
import { Precipitation } from "./Precipitation";
import { WeeklyForecast } from "./SevenDay";
import { Banner } from "./Banner";

export const WeatherApp = () => {
    const searchHistory = useOsStore((state) => state.searchHistory);
    const [currentCity, setCurrentCity] = useState(searchHistory[0]?.city || "");
    const [data, setData] = useState(searchHistory[0] ?? null);

    useEffect(() => {
        if (!searchHistory?.length) {
            return;
        }

        const selectedCity = currentCity || searchHistory[0].city;
        const found = searchHistory.find((item) => item.city === selectedCity) || searchHistory[0];

        if (!data || found.city !== data.city) {
            setData(found);
        }

        if (!currentCity && found.city) {
            setCurrentCity(found.city);
        }
    }, [searchHistory, currentCity, data]);

if (!data) {
        return (
            <SkeletonTheme baseColor="rgba(255, 255, 255, 0.2)" highlightColor="#ffffff">
                <div 
                    className="weather-container absolute inset-0 h-full w-full flex flex-col justify-center items-center overflow-hidden gap-4 text-center px-4"
                    style={{ backgroundColor: "#f09550" }}
                >
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="text-white/80 font-mono tracking-[0.2em] text-xs uppercase">
                        <p>Try Adding City Through Map App</p>
                    </span>
                </div>
            </SkeletonTheme>
        );
    }

    return (
        <div className="weather-container absolute inset-0 h-full w-full flex flex-col gap-2 p-2 justify-center items-center">
            <nav className="weather-nav flex justify-center items-center border-2 border-black/10 bg-white">
                {searchHistory.map((data) => (
                    <button
                        key={data.city}
                        onClick={() => {
                            setCurrentCity(data.city)
                            setData(data);
                        }}
                        className={`weather-nav-btn select-none text-black transition-all duration-400 ease-in-out ${currentCity === data.city ? "active" : ""}`}
                    >
                        {data.city}
                    </button>
                ))}
            </nav>

            <section className="Bento w-full flex-1 overflow-y-auto scrollbar-none p-2 border border-black/10 rounded-xl">
                <ConditionTitle city={currentCity} data={data} />
                <WindCompass windSpeed={data?.wind} windDegree={data?.windDegree} />
                <HourlyForecast city={currentCity}/>
                <SolarArc city={currentCity}/>
                <Precipitation city={currentCity}/>
                <WeeklyForecast city={currentCity}/>
                <Banner city={currentCity}/>
            </section>
        </div>
    )
}