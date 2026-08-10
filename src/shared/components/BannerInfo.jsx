export const getWeatherAdvisory = (data) => {
    const activeWarnings = [];

    if (!data || !data.current || !data.location) return { mainHeadline: "", bannerTags: [], allGuidance: [] };

    const temp = data.current.temp_c;
    const condition = (data.current.condition?.text ?? "").toLowerCase();
    const aqiIndex = data.current.air_quality?.['us-epa-index'] ?? 1;

    if (aqiIndex >= 4) {
        activeWarnings.push({
            type: "Air Quality",
            headline: `Poor air quality in ${city}. Hydrate & skip outdoor cardio.`,
            tags: ["Hydrate", "Indoors", "Mask", "Rest"]
        });
    }

    if (temp >= 35) {
        activeWarnings.push({
            type: "Extreme Heat",
            headline: `Extreme heat advisory in ${city}. Avoid direct sunlight.`,
            tags: ["Hydrate", "Shade", "SPF", "Cool"]
        });
    } else if (temp <= 0) {
        activeWarnings.push({
            type: "Freezing",
            headline: `Freezing temperatures in ${city}. Bundle up if heading out.`,
            tags: ["Layers", "Warm", "Ice", "Boots"]
        });
    }

    if (condition.includes("rain") || condition.includes("drizzle")) {
        activeWarnings.push({
            type: "Rain",
            headline: `Rainy conditions in ${city}. Drive safely and stay dry.`,
            tags: ["Umbrella", "Boots", "Indoors", "Slow"]
        });
    } else if (condition.includes("snow") || condition.includes("blizzard")) {
        activeWarnings.push({
            type: "Snow",
            headline: `Snowfall expected in ${city}. Drive with extreme caution.`,
            tags: ["Coat", "Boots", "Slow", "Warm"]
        });
    }

    if (activeWarnings.length === 0) {
        activeWarnings.push({
            type: "Clear",
            headline: `Conditions are clear in ${city}. Enjoy the day outdoors.`,
            tags: ["Outside", "Active", "Enjoy", "Hydrate"]
        });
    }

    const mainHeadline = activeWarnings[0].headline;

    let allCollectedTags = [];
    activeWarnings.forEach(warning => {
        allCollectedTags = [...allCollectedTags, ...warning.tags];
    });

    const uniqueTags = [...new Set(allCollectedTags)];
    const bannerTags = [];

    while (bannerTags.length < 4 && uniqueTags.length > 0) {
        const randomIndex = Math.floor(Math.random() * uniqueTags.length);
        bannerTags.push(uniqueTags[randomIndex]);
        uniqueTags.splice(randomIndex, 1);
    }

    return {
        mainHeadline,
        bannerTags,
        allGuidance: activeWarnings
    };
};