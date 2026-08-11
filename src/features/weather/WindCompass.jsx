import { useOsStore } from "../../shared/store/useOsStore";
import { useTemperatureUnit } from "../../shared/hooks/useUnits";
import { useNumberCounter } from "../../shared/hooks/useNumberCounter";
import { Compass } from "./Compass";

export const WindCompass = ({ windSpeed, windDegree }) => {
    const { formatDistance } = useTemperatureUnit();
    const speed = useNumberCounter(windSpeed);

    return (
       
        <div className="windCompass p-5 border border-black/10 rounded-[1rem] flex flex-col justify-center h-full w-full">
            
            <div className="flex flex-col justify-start w-full">
                
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 tracking-wider mb-4">
                    <span className="text-[#f09650]">02</span> Wind & WindDegree
                </div>

                <div className="Wind_Compass flex justify-between items-center gap-4 h-auto w-full px-2">
                    
                    <div className="wind h-max w-auto flex flex-col gap-1">
                        <span className="text-black">{formatDistance(speed)}</span>
                        <div className="h-[2px] w-full bg-black/10 my-1"></div>
                        <span className="sw">SW</span>
                    </div>

                    <Compass degree={windDegree} />
                    
                </div>
            </div>
            
        </div>
    );
};