import { useEffect, useState } from "react";
import { useOsStore } from "../../shared/store/useOsStore";
import { ConditionTitle } from "./ConditionTitle";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
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
            <div 
                className="weather-container absolute inset-0 h-full w-full flex flex-col justify-center items-center overflow-hidden"
                style={{ backgroundColor: "#f09550" }}
            >
          
                <div 
                    className="absolute top-0 h-full w-40 bg-white/20 z-0 pointer-events-none"
                    style={{ animation: "sweep 2.5s infinite linear" }}
                ></div>

        
                <style>{`
                    @keyframes sweep {
                        0% { transform: translateX(-100vw) skewX(-20deg); }
                        100% { transform: translateX(100vw) skewX(-20deg); }
                    }
                `}</style>

         
                <div className="z-10 flex flex-col items-center text-white gap-3 px-4 text-center">
                    <span className="text-3xl drop-shadow-md">📍</span>
                    <span className="text-sm sm:text-base font-medium tracking-wide drop-shadow-sm">
                        No location detected.<br/>
                        Make sure to search and add a city through the <strong>Maps App</strong>.
                    </span>
                </div>
            </div>
        );
    }

    return (

        <div className="weather-container absolute inset-0 h-full w-full  flex flex-col gap-2 p-2 justify-center items-center">

            <nav className="weather-nav   flex justify-center items-center border-2 border-black/10 bg-white">
                {searchHistory.map((data) => (
                    <button
                        key={data.city}
                        onClick={() => {
                            setCurrentCity(data.city)
                            setData(data);
                        }

                        }
                        className={`weather-nav-btn select-none text-black transition-all duration-400 ease-in-out ${currentCity === data.city ? "active" : ""}`}
                    >
                        {data.city}
                    </button>
                ))}
            </nav>

            <section className="Bento w-full flex-1 overflow-y-auto scrollbar-none p-2 border border-black/10 rounded-xl">
                <ConditionTitle city={currentCity}
                    data={data}
                />
                <WindCompass
                    windSpeed={data?.wind}
                    windDegree={data?.windDegree} />

                <HourlyForecast city={currentCity}/>

                <SolarArc city={currentCity}/>

                <Precipitation city={currentCity}/>

                <WeeklyForecast city={currentCity}/>
                <Banner city={currentCity}/>
            </section>

        </div>
    )
}
