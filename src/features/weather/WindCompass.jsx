import { useOsStore } from "../../shared/store/useOsStore";
import { useTemperatureUnit } from "../../shared/hooks/useUnits";
import { useNumberCounter } from "../../shared/hooks/useNumberCounter";
import { Compass } from "./Compass";

export const WindCompass = ({ windSpeed, windDegree }) => {
    const { formatDistance } = useTemperatureUnit();
    const speed = useNumberCounter(windSpeed);

    return (
        <div className="windCompass  p-4 border border-black/10 rounded-[0.8rem]">
            <div className="compass flex flex-col justify-start">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 tracking-wider mb-4">
                <span className="text-[#f09650]">02</span> Wind & WindDegree
            </div>

                <div className="Wind_Compass flex justify-start items-center gap-15 h-auto w-full">

                    <div className="wind h-max w-[200px] flex flex-col gap-0.5">
                        <span className="text-black ">{formatDistance(speed)}</span>
                        <div className="h-[2px] w-full bg-black/10"></div>
                        <span className="sw">SW</span>
                    </div>

                    <Compass degree={windDegree} />

                </div>
            </div>
        </div>
    );
};