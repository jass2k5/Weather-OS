import { useOsStore } from "../../shared/store/useOsStore";
import { useState } from "react";
import { ConditionTitle } from "./ConditionTitle";
import { WindCompass } from "./WindCompass";
import { HourlyForecast } from "./HourlyForecast";
import { SolarArc } from "./SolarArc";
export const WeatherApp = () => {
    const searchHistory = useOsStore((state) => state.searchHistory);
    const [currentCity, setCurrentCity] = useState(searchHistory[0]?.city || "");

    const [data, setData] = useState(searchHistory[0]);
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
                    windSpeed={data.wind}
                    windDegree={data.windDegree} />

                <HourlyForecast city={currentCity}/>

                <SolarArc city={currentCity}/>
            </section>

        </div>
    )
}
