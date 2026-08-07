import { useCityForecast } from "../../shared/hooks/useCityForecast";
import cloudysun from '../../shared/assets/cloudysun.svg';
import cloudymoon from '../../shared/assets/cloudymoon.svg';
import clearsun from '../../shared/assets/clearsun.svg';
import clearmoon from '../../shared/assets/clearmoon.svg';
import thunderstorm from '../../shared/assets/thunderstorm.svg';
import lightrain from '../../shared/assets/lightrain.svg';
import snow from '../../shared/assets/snow.svg';
import fog from '../../shared/assets/fog.svg';

export const HourlyForecast = ({ city }) => {
    const { data, isLoading, isError, error } = useCityForecast(city);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Failed to load forecast: {error?.message}</div>;
    }

    const localtime = data?.location?.localtime;
    const currentLocalHour = localtime ? new Date(localtime).getHours() : null;
    const todayHours = data?.forecast?.forecastday[0]?.hour ?? [];
    const tommorowHours = data?.forecast?.forecastday[1].hour ?? [];
    const combinedHours = [...todayHours, ...tommorowHours];
    const nextSixHours = combinedHours.slice(currentLocalHour, currentLocalHour + 6);
    const aqiVal = data.current?.air_quality?.["us-epa-index"]

    return (
        <div className="Hourly border border-black/10 max-h-[300px] w-full flex flex-col items-center justify-start p-3 rounded-[0.8rem] gap-2">
            <div className="index flex gap-1 self-start">
                <span className="indexCount">03</span>
                <span className="condition">HOURLY FORECAST</span>
            </div>

            <div className="hourlyforecast h-full w-full   flex gap-7 justify-start p-2 items-center border border-black select-none">

            <div className="hour h-full flex flex-col gap-3.5 items-center justify-center">
                <span>11Am</span>
                <img className="h-[20px]" src= {clearmoon} alt="" />
                <span>12</span>

            </div>
            <div className="hour h-full flex flex-col gap-3.5 items-center justify-center">
                <span>11Am</span>
                <img className="h-[20px]" src= {clearmoon} alt="" />
                <span>12</span>

            </div>
            </div>



        </div>
    );
};