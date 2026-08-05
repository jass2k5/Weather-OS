import { useOsStore } from "../../shared/store/useOsStore";
import { useState } from "react";

export const WeatherApp = () => {
    const searchHistory = useOsStore((state) => state.searchHistory);
    const [currentCity, setCurrentCity] = useState(searchHistory[0]?.city || "");

    return (
       
        <div className="weather-container absolute inset-0 h-full w-full bg-[#faf6ef]">
            
            <nav className="weather-nav absolute top-[8%] left-[50%] flex justify-center items-center border-2 border-black/10 bg-white">
                {searchHistory.map((data) => (
                    <button 
                        key={data.city}
                        onClick={() => setCurrentCity(data.city)}  
                        className={`weather-nav-btn select-none text-black transition-all duration-400 ease-in-out ${currentCity === data.city ? "active" : ""}`}
                    >
                        {data.city}
                    </button>
                ))}
            </nav>
            
        </div>
    )
}