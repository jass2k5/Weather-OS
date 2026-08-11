export const getWeatherAdvisory = (data) => {
    if (!data || !data.current || !data.location) {
        return { mainHeadline: "", bannerTags: [], allGuidance: [] };
    }

    const temp = data.current.temp_c;
    const condition = (data.current.condition?.text ?? "").toLowerCase();
    const aqiIndex = data.current.air_quality?.['us-epa-index'] ?? 1;
    const city = data.location.name;

    // Define all potential hazards with strict priority weights (Lower number = Higher Priority)
    const possibleAdvisories = [
        {
            priority: 1, // Top Priority
            type: "Extreme Heat",
            headline: `Extreme heat advisory in ${city}. Avoid direct sunlight.`,
            tags: ["Hydrate", "Shade", "SPF", "Cool"],
            isActive: temp >= 35
        },
        {
            priority: 2,
            type: "Freezing",
            headline: `Freezing temperatures in ${city}. Bundle up if heading out.`,
            tags: ["Layers", "Warm", "Ice", "Boots"],
            isActive: temp <= 0
        },
        {
            priority: 3,
            type: "Air Quality",
            headline: `Poor air quality in ${city}. Hydrate & skip outdoor cardio.`,
            tags: ["Hydrate", "Indoors", "Mask", "Rest"],
            isActive: aqiIndex >= 4
        },
        {
            priority: 4,
            type: "Snow",
            headline: `Snowfall expected in ${city}. Drive with extreme caution.`,
            tags: ["Coat", "Boots", "Slow", "Warm"],
            isActive: condition.includes("snow") || condition.includes("blizzard")
        },
        {
            priority: 5,
            type: "Rain",
            headline: `Rainy conditions in ${city}. Drive safely and stay dry.`,
            tags: ["Umbrella", "Boots", "Indoors", "Slow"],
            isActive: condition.includes("rain") || condition.includes("drizzle")
        }
    ];

    // 1. Keep ONLY active warnings, sorted strictly by Priority rank
    const activeWarnings = possibleAdvisories
        .filter(advisory => advisory.isActive)
        .sort((a, b) => a.priority - b.priority);

    // 2. Fallback to Clear state if no hazards exist
    if (activeWarnings.length === 0) {
        activeWarnings.push({
            priority: 99,
            type: "Clear",
            headline: `Conditions are clear in ${city}. Enjoy the day outdoors.`,
            tags: ["Outside", "Active", "Enjoy", "Hydrate"],
            isActive: true
        });
    }

    // Main Banner gets Priority #1 Active Warning
    const topPriority = activeWarnings[0];
    const mainHeadline = topPriority.headline;

    // Aggregate tags across active warnings for the banner
    let allCollectedTags = [];
    activeWarnings.forEach(warning => {
        allCollectedTags = [...allCollectedTags, ...warning.tags];
    });

    const uniqueTags = [...new Set(allCollectedTags)];
    const bannerTags = uniqueTags.slice(0, 4);

    return {
        mainHeadline,
        bannerTags,
        allGuidance: activeWarnings
    };
};