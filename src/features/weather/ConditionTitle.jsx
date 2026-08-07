import { useOsStore } from "../../shared/store/useOsStore";
import { useTemperatureUnit } from "../../shared/hooks/useUnits";
import icon from '../../shared/assets/weather.svg';
export const ConditionTitle = ({city,data})=>{
  const { formatTemp, formatDistance } = useTemperatureUnit();
    return(
        <div className={`titleCon p-2 flex flex-col gap-3  min-h-[300px] min-w-[450px]`}>
         <div className=" h-max w-max">
             <div className="city">
            <h1>{city}</h1>
            <span>·Right now</span>
          </div>
           </div>

        <div className="holder flex-1 min-h-[220px] border border-black/10 flex flex-col gap-2.5 rounded-xl p-3 ">
            <div className=" index flex gap-1 ">
            <span className="indexCount">01</span>
            <span className="condition">CURRENT CONDITIONS</span>
          </div>
             <div className="leftright flex justify-between gap-4">

             <div className=" left h-max w-max ">

          <div className="TemperatureCond flex flex-col gap-0.5">
            <span className="temp">
                {formatTemp(data.liveTemp)}
            </span>
            <span className="condition text-wrap">
                {data.liveCondition}
            
            </span>
          </div>
         
          </div>
          <div className="right flex flex-col h-max w-max pb-4 shrink-0">
            <img  src={icon} alt="iconforcontainer" />

            <div className="below h-max w-max flex text-black items-center gap-1">
                <span>feels:{formatTemp(data.feelsLike)}</span>
              <div className="h-4 w-[1px] bg-black/30"></div>
                <span>hum:{data.humidity}%</span>
                 <div className="h-4 w-[1px] bg-black/30"></div>
                <span>vis:{formatDistance(data.visibility)}</span>
            </div>

         </div>
         </div>
        </div>
        
         
        </div>
    )
}