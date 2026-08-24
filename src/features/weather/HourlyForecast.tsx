import { useCityForecast } from "../../shared/hooks/useCityForecast";
import { useTemperatureUnit } from "../../shared/hooks/useUnits";
import cloudysun from '../../shared/assets/cloudysun.svg';
import cloudymoon from '../../shared/assets/cloudymoon.svg';
import clearsun from '../../shared/assets/clearsun.svg';
import clearmoon from '../../shared/assets/clearmoon.svg';
import thunderstorm from '../../shared/assets/thunderstorm.svg';
import lightrain from '../../shared/assets/lightrain.svg';
import snow from '../../shared/assets/snow.svg';
import fog from '../../shared/assets/fog.svg';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

i
export const getWeatherIcon = (conditionText, isDay) => {
    if (!conditionText) return isDay ? clearsun : clearmoon;
    const text = conditionText.toLowerCase();

    if (text.includes("thunder") || text.includes("lightning")) return thunderstorm;
    if (text.includes("snow") || text.includes("blizzard") || text.includes("ice") || text.includes("sleet")) return snow;
    if (text.includes("fog") || text.includes("mist") || text.includes("haze")) return fog;
    if (text.includes("rain") || text.includes("drizzle") || text.includes("shower")) return lightrain;

    if (text.includes("cloud") || text.includes("overcast")) {
        return isDay ? cloudysun : cloudymoon;
    }

    return isDay ? clearsun : clearmoon;
};
interface HourlyForecastProps{
    city:string;
}
export const HourlyForecast = ({ city }:HourlyForecastProps) => {
    const { data, isLoading, isError } = useCityForecast(city);
    const { formatTemp } = useTemperatureUnit();

    if (isLoading || !data) {
        return (
            <div className="Hourly border border-black/10 max-h-[300px] w-full flex flex-col items-center justify-start p-3 rounded-[0.8rem] gap-2">
               
                <div className="hourlyforecast h-full w-full flex gap-7 justify-start p-2 items-center select-none">
                    <SkeletonTheme baseColor="#f09650" highlightColor="#f5b888">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="hour h-full flex flex-col gap-3.5 items-center justify-center">
                                <Skeleton width={35} height={16} />
                                <Skeleton circle width={24} height={24} />
                                <Skeleton width={20} height={16} />
                            </div>
                        ))}
                    </SkeletonTheme>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="Hourly border border-black/10 max-h-[300px] h-[150px] w-full flex flex-col items-center justify-center p-3 rounded-[0.8rem] gap-2">
                <div className="index flex gap-1 self-start w-full">
                    <span className="indexCount">03</span>
                    <span className="condition">HOURLY FORECAST</span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <span className="text-red-500/80 font-medium text-sm">
                        Forecast currently unavailable.
                    </span>
                </div>
            </div>
        );
    }


    const localtime = data.location.localtime.replace(" ", "T");
    const currentLocalHour = new Date(localtime).getHours();

    const todayHours = data.forecast.forecastday[0].hour;
    const tommorowHours = data.forecast.forecastday[1].hour;
    const combinedHours = [...todayHours, ...tommorowHours];

    const nextSixHours = combinedHours.slice(currentLocalHour, currentLocalHour + 7);
    const aqi = Math.round(data.current?.air_quality?.pm2_5 ?? 0) || "--";

    return (
        <div className="Hourly border border-black/10 max-h-[300px] w-full flex flex-col items-center justify-center p-3 rounded-[0.8rem] gap-6">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 tracking-wider mb-4 self-start">
                <span className="text-[#f09650]">03</span> Hourly Forecast
            </div>


            <div className="hourlyforecast h-full w-full flex gap-7 justify-start p-2  items-center select-none">
                {nextSixHours.map((hourData, index) => {
                    const hour = new Date(hourData.time.replace(" ", "T"));
                    const formattedTime = hour.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        hour12: true,
                    }).replace(" ", "");

                    const timelabel = index === 0 ? "Now" : formattedTime;

                    return (
                        <div key={hourData.time_epoch} className="hour h-full flex flex-col gap-3.5 items-center justify-center text-black">
                            <span>{timelabel}</span>
                            <img
                                className="h-[24px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
                                src={getWeatherIcon(hourData.condition.text, hourData.is_day === 1)}
                                alt={hourData.condition.text}
                            />
                            <span>{(formatTemp(hourData.temp_c))}</span>
                        </div>
                    );
                })}
            </div>
            <div className="aqi border-3 border-[#f09650] h-max w-max pl-2 pr-2 pt-1 pb-1 rounded-[0.7rem] self-start">
                <span className="text-[#f09650] font-medium">AQI {aqi}</span>
            </div>
        </div>
    );
};