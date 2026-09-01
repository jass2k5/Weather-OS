import { describe, it, expect } from 'vitest';
import { getWeatherAdvisory } from '../BannerInfo'; // Update with your actual file path
import { WeatherAPIResponse } from "../../hooks/useCityForecast";

describe("getWeatherAdvisory utility function", () => {
    
    const baseMockData: WeatherAPIResponse = {
        location: { name: "Delhi", country: "India", tz_id: "Asia/Kolkata", lat: 28.61, lon: 77.23 },
        current: {
            temp_c: 25.0,
            condition: { text: "Sunny" },
            humidity: 40,
            wind_kph: 5,
            wind_degree: 90,
            vis_km: 10,
            feelslike_c: 25.0,
            is_day: 1,
            air_quality: { 'us-epa-index': 1 }
        }
    } as any;

    it("returns default empty values when data is null or undefined", () => {
        expect(getWeatherAdvisory(null)).toEqual({
            mainHeadline: "",
            bannerTags: [],
            allGuidance: []
        });
        expect(getWeatherAdvisory(undefined)).toEqual({
            mainHeadline: "",
            bannerTags: [],
            allGuidance: []
        });
    });

    it("returns a clear status advisory when weather conditions are normal", () => {
        const result = getWeatherAdvisory(baseMockData);

        expect(result.mainHeadline).toBe("Conditions are clear in Delhi. Enjoy the day outdoors.");
        expect(result.bannerTags).toEqual(["Outside", "Active", "Enjoy", "Hydrate"]);
        expect(result.allGuidance.length).toBe(1);
        expect(result.allGuidance[0].type).toBe("Clear");
    });

    it("triggers extreme heat advisory and filters other lower priorities correctly", () => {
        const hotWeatherData = {
            ...baseMockData,
            current: { ...baseMockData.current, temp_c: 40 } // Temp >= 35
        };

        const result = getWeatherAdvisory(hotWeatherData);

        expect(result.mainHeadline).toBe("Extreme heat advisory in Delhi. Avoid direct sunlight.");
        expect(result.allGuidance[0].type).toBe("Extreme Heat");
        expect(result.bannerTags).toContain("Hydrate");
        expect(result.bannerTags.length).toBeLessThanOrEqual(4);
    });

    it("prioritizes extreme heat over air quality when multiple hazards are active", () => {
        const multiHazardData = {
            ...baseMockData,
            current: { 
                ...baseMockData.current, 
                temp_c: 38, // Priority 1 (Extreme Heat)
                air_quality: { 'us-epa-index': 5 } // Priority 3 (Air Quality)
            }
        };

        const result = getWeatherAdvisory(multiHazardData);

        expect(result.mainHeadline).toBe("Extreme heat advisory in Delhi. Avoid direct sunlight.");
        expect(result.allGuidance.length).toBe(2);
        expect(result.allGuidance[0].priority).toBe(1);
        expect(result.allGuidance[1].priority).toBe(3);
    });

    it("activates snow advisory based on condition text matching", () => {
        const snowData = {
            ...baseMockData,
            current: { 
                ...baseMockData.current, 
                temp_c: -2,
                condition: { text: "Heavy snow" } 
            }
        } as any;

        const result = getWeatherAdvisory(snowData);

        expect(result.allGuidance.some(w => w.type === "Freezing")).toBe(true);
        expect(result.allGuidance.some(w => w.type === "Snow")).toBe(true);
        expect(result.allGuidance[0].type).toBe("Freezing");
    });

    it("slices unique banner tags to a maximum limit of 4", () => {
        const complexData = {
            ...baseMockData,
            current: { 
                ...baseMockData.current, 
                temp_c: -5, 
                air_quality: { 'us-epa-index': 5 } 
            }
        };

        const result = getWeatherAdvisory(complexData);

        expect(result.bannerTags.length).toBe(4);

        expect(new Set(result.bannerTags).size).toBe(4);
    });
});