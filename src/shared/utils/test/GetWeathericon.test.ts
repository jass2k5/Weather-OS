import { describe, it, expect } from 'vitest';
import { getWeatherIcon } from  '../GetWeatherIcon'; // Update to your actual path
import cloudysun from '../../assets/cloudysun.svg';
import cloudymoon from '../../assets/cloudymoon.svg';
import clearsun from '../../assets/clearsun.svg';
import clearmoon from '../../assets/clearmoon.svg';
import thunderstorm from '../../assets/thunderstorm.svg';
import lightrain from '../../assets/lightrain.svg';
import snow from '../../assets/snow.svg';
import fog from '../../assets/fog.svg';

describe("getWeatherIcon utility function", () => {
    it("returns default clear icons when condition text is missing", () => {
        expect(getWeatherIcon(undefined, true)).toBe(clearsun);
        expect(getWeatherIcon("", 0)).toBe(clearmoon);
    });

    it("matches severe weather conditions correctly", () => {
        expect(getWeatherIcon("Moderate thunderstorm", true)).toBe(thunderstorm);
        expect(getWeatherIcon("Blizzard warning", 1)).toBe(snow);
        expect(getWeatherIcon("patchy ice pellets", 0)).toBe(snow);
    });

    it("matches visibility and precipitation conditions correctly", () => {
        expect(getWeatherIcon("Dense fog", true)).toBe(fog);
        expect(getWeatherIcon("Light rain shower", 1)).toBe(lightrain);
    });

    it("handles cloud cover accounting for day and night modes", () => {
        expect(getWeatherIcon("Partly cloudy", true)).toBe(cloudysun);
        expect(getWeatherIcon("Overcast skies", false)).toBe(cloudymoon);
    });

    it("falls back to clear sun/moon for normal or unhandled text", () => {
        expect(getWeatherIcon("Sunny and bright", true)).toBe(clearsun);
        expect(getWeatherIcon("Clear night", 0)).toBe(clearmoon);
    });
});