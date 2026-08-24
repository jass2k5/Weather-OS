import cloudysun from '../assets/cloudysun.svg';
import cloudymoon from '../assets/cloudymoon.svg';
import clearsun from '../assets/clearsun.svg';
import clearmoon from '../assets/clearmoon.svg';
import thunderstorm from '../assets/thunderstorm.svg';
import lightrain from '../assets/lightrain.svg';
import snow from '../assets/snow.svg';
import fog from '../assets/fog.svg'
export const getWeatherIcon = (conditionText?: string, isDay: boolean | number = 1): string => {
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