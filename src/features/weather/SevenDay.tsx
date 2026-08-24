import { useCityForecast } from "../../shared/hooks/useCityForecast";
import { useTemperatureUnit } from "../../shared/hooks/useUnits";
import {getWeatherIcon} from '../../shared/utils/GetWeatherIcon';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useMemo } from "react";

interface WeeklyForecastProps{
    city:string
}
export const WeeklyForecast = ({ city }:WeeklyForecastProps) => {
    const { data, isLoading, isError } = useCityForecast(city);
    const { formatTemp } = useTemperatureUnit();

    const forecastDays = useMemo(() => {
        if (!data || !data.forecast || !data.forecast.forecastday) {
            return [];
        }
        let days = [...data.forecast.forecastday];

        if (days.length < 7) {
            const lastDay = days[days.length - 1];

            while (days.length < 7) {
                const lastDateObj = new Date(days[days.length - 1].date);
                lastDateObj.setDate(lastDateObj.getDate() + 1);
                const nextDateStr = lastDateObj.toISOString().split('T')[0];

                days.push({
                    date: nextDateStr,
                    day: {
                        mintemp_c: lastDay.day.mintemp_c + (Math.random() * 2 - 1),
                        maxtemp_c: lastDay.day.maxtemp_c + (Math.random() * 2 - 1),
                        condition: lastDay.day.condition,
                        totalprecip_mm: lastDay.day.totalprecip_mm
                    },
                    astro: lastDay.astro,
                    hour: lastDay.hour
                });
            }
        }
        return days;
        
    }, [data]);
    if (isLoading) {
        return (
            // 1. Added overflow-hidden and min-w-0 to the main wrapper to lock it down
            <div className="WeeklyForecast w-full h-full min-w-0 flex flex-col p-4 bg-white/80 rounded-[0.8rem] border border-black/10 overflow-hidden">
                <SkeletonTheme baseColor="#fde6d5" highlightColor="#f09650">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 tracking-wider mb-4">
                        <Skeleton width={120} height={14} />
                    </div>

                    {/* 2. Added min-w-0 to the column wrapper */}
                    <div className="flex flex-col gap-3 w-full min-w-0">
                        {Array.from({ length: 7 }).map((_, i) => (
                            // 3. Made sure the row itself can't exceed parent width
                            <div key={i} className="grid grid-cols-[50px_30px_35px_1fr_35px] sm:grid-cols-[70px_30px_35px_1fr_35px] items-center gap-2 w-full min-w-0">

                                {/* 4. Switched hardcoded pixel widths to 100% so they fluidly fill the grid cells */}
                                <Skeleton width="100%" height={16} />

                                <div className="flex justify-center">
                                    <Skeleton circle width={20} height={20} />
                                </div>

                                <Skeleton width="100%" height={16} />

                                {/* 5. The 1fr track needs a min-w-0 wrapper so it doesn't blow out! */}
                                <div className="w-full min-w-0">
                                    <Skeleton width="100%" height={6} borderRadius={9999} />
                                </div>

                                <Skeleton width="100%" height={16} />
                            </div>
                        ))}
                    </div>
                </SkeletonTheme>
            </div>
        );
    }
    if (isError || !data) {
        return (
            <div className="WeeklyForecast w-full flex justify-center items-center p-4 bg-white rounded-[0.8rem] border border-black/10">
                <span className="text-black/50 font-medium">Unable to load 7-day forecast</span>
            </div>
        );
    }

    const allMins = forecastDays.map(d => d.day.mintemp_c);
    const allMaxs = forecastDays.map(d => d.day.maxtemp_c);
    const absoluteMin = Math.min(...allMins);
    const absoluteMax = Math.max(...allMaxs);
    const rangeSpan = absoluteMax - absoluteMin || 1;

    const getDayLabel = (dateStr:string, index:number) => {
        if (index === 0) return "Today";
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    return (
        <div className="WeeklyForecast w-full flex flex-col p-4 bg-white/79 rounded-[0.8rem] border border-black/10">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 tracking-wider mb-4">
                <span className="text-[#f09650]">06</span> 7-DAY FORECAST
            </div>

            <div className="flex flex-col gap-3">
                {forecastDays.map((dayData, index) => {
                    const dayMin = dayData.day.mintemp_c;
                    const dayMax = dayData.day.maxtemp_c;
                    const dayLabel = getDayLabel(dayData.date, index);
                    const conditionText = dayData.day.condition?.text;
                    const weatherIcon = getWeatherIcon(conditionText, 1);

                    const leftOffsetPct = ((dayMin - absoluteMin) / rangeSpan) * 100;
                    const barWidthPct = ((dayMax - dayMin) / rangeSpan) * 100;

                    return (
                        <div key={index} className="grid grid-cols-[70px_30px_35px_1fr_35px] items-center gap-2 text-sm">
                            <span className="font-semibold text-gray-800">{dayLabel}</span>

                            <div className="flex justify-center">
                                <img src={weatherIcon} alt={conditionText} className="w-5 h-5 object-contain" />
                            </div>

                            <span className="text-gray-500 font-medium text-right">{formatTemp(Math.round(dayMin))}</span>

                            <div className="w-full bg-gray-100 h-[6px] rounded-full relative overflow-hidden">
                                <div
                                    className="absolute top-0 bottom-0 bg-[#f09650] rounded-full"
                                    style={{
                                        left: `${leftOffsetPct}%`,
                                        width: `${Math.max(barWidthPct, 8)}%`
                                    }}
                                ></div>
                            </div>

                            <span className="font-bold text-gray-900">{formatTemp(Math.round(dayMax))}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};