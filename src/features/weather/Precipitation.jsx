import { useCityForecast } from "../../shared/hooks/useCityForecast";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const Precipitation = ({ city }) => {
    const { data, isLoading, isError } = useCityForecast(city);


    if (isLoading) {
        return (
            <div className="Precipitation w-full h-[240px] flex flex-col p-4 bg-white rounded-[0.8rem] border border-black/10">
                <SkeletonTheme baseColor="#fde6d5" highlightColor="#f09650">
                    <Skeleton width={150} height={20} />
                    <Skeleton width={80} height={40} className="mt-4" />
                    <Skeleton width="100%" height={100} className="mt-6" />
                </SkeletonTheme>
            </div>
        );
    }

  
    if (isError || !data) {
        return (
            <div className="Precipitation w-full h-[240px] flex justify-center items-center p-4 bg-white rounded-[0.8rem] border border-black/10">
                <span className="text-black/50 font-medium">Unable to load precipitation</span>
            </div>
        );
    }


    const totalPrecip = data.forecast.forecastday[0].day.totalprecip_mm;
    const hourlyData = data.forecast.forecastday[0].hour;
    const maxPrecip = Math.max(...hourlyData.map(h => h.precip_mm), 1);

    return (
        <div className="Precipitation  w-full flex flex-col p-4 bg-white rounded-[0.8rem] border border-black/10 relative">
            
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 tracking-wider">
                <span className="text-[#f09650]">05</span> PRECIPITATION
            </div>

        
            <div className="mt-2">
                <h2 className="text-5xl font-black text-gray-900 leading-none">{totalPrecip}</h2>
                <p className="text-gray-400 text-sm font-medium mt-1">mm today</p>
            </div>

        
            <div className="mt-6 h-[100px] w-full flex items-end justify-between border-b border-black/5 pb-1 relative">
                
                {hourlyData.map((hour, index) => {
                    const heightPct = (hour.precip_mm / maxPrecip) * 100;
                    const finalHeight = Math.max(heightPct, 2); 

                    return (
                        <div 
                            key={index} 
                            className="w-[8px] bg-[#f09650] rounded-t-sm transition-all duration-300 hover:bg-orange-600 cursor-crosshair" 
                            style={{ height: `${finalHeight}%` }}
                            title={`${hour.precip_mm}mm at ${hour.time.split(" ")[1]}`}
                        ></div>
                    );
                })}
            </div>


            <div className="flex justify-between w-full text-[10px] font-bold text-gray-400 mt-2">
                <span>12AM</span>
                <span>6AM</span>
                <span>12PM</span>
                <span>6PM</span>
                <span>11PM</span>
            </div>
        </div>
    );
};