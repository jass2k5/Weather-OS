import { useTemperatureUnit } from "../../shared/hooks/useUnits";
import { useNumberCounter } from "../../shared/hooks/useNumberCounter";
import {WeatherHistoryItem} from '../../shared/store/useOsStore'
import "react-loading-skeleton/dist/skeleton.css";
import {getWeatherIcon} from '../../shared/utils/GetWeatherIcon';

interface ConditionTitleProps{
    city:string;
    data:WeatherHistoryItem
}
export const ConditionTitle = ({ city, data }:ConditionTitleProps) => {
    const { formatTemp, formatDistance } = useTemperatureUnit();
   const temperature = useNumberCounter({ targetValue: data.liveTemp });
    
    return (
        <>
            
            <div className="city-header">
                <h1>{city}</h1>
                <span>·Right now</span>
            </div>

         
            <div className="titleCon border border-black/10 flex flex-col gap-2.5 rounded-xl p-4">
                
               <div className="flex items-center gap-2 text-xs font-bold text-gray-400 tracking-wider mb-4">
                    <span className="text-[#f09650]">02</span> Current Condition
                </div>
                
                <div className="leftright flex justify-between gap-4 h-full">
                    
                    <div className="left h-max w-max">
                        <div className="TemperatureCond flex flex-col gap-0.5">
                            <span className="temp">{formatTemp(temperature)}</span>
                            <span className="condition text-wrap">{data.liveCondition}</span>
                        </div>
                    </div>
                    
                    <div className="right flex flex-col items-end shrink-0">
                        <img src={getWeatherIcon(data.liveCondition, data.isDay)} alt="iconforcontainer" />
                        
                        <div className="below h-max w-max flex text-black items-center gap-1 mt-auto">
                            <span>feels:{formatTemp(data.feelsLike)}</span>
                            <div className="h-4 w-[1px] bg-black/30"></div>
                            <span>hum:{data.humidity}%</span>
                            <div className="h-4 w-[1px] bg-black/30"></div>
                            <span>vis:{formatDistance(data.visibility)}</span>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};