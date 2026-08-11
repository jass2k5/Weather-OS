// testSyncAllWeather.js
// Simple Node script to simulate useSyncAllWeather comparison + notifications

function buildNewCityData(apiData){
    return {
        city: apiData.location.name,
        location: apiData.location,
        country: apiData.location.country,
        tz_id: apiData.location.tz_id,
        loc: { lat: apiData.location.lat, lon: apiData.location.lon },
        liveTemp: apiData.current.temp_c,
        liveCondition: apiData.current.condition.text,
        humidity: apiData.current.humidity,
        wind: apiData.current.wind_kph,
        windDegree: apiData.current.wind_degree,
        visibility: apiData.current.vis_km,
        feelsLike: apiData.current.feelslike_c,
        isDay: apiData.current.is_day === 1,
        aqi: apiData.current.air_quality ? apiData.current.air_quality['us-epa-index'] : null,
    };
}

function buildOldCityData(currentCity){
    return {
        city: currentCity.city,
        country: currentCity.country,
        tz_id: currentCity.tz_id,
        loc: currentCity.loc || null,
        liveTemp: currentCity.liveTemp,
        liveCondition: currentCity.liveCondition,
        humidity: currentCity.humidity,
        wind: currentCity.wind,
        windDegree: currentCity.windDegree,
        visibility: currentCity.visibility,
        feelsLike: currentCity.feelsLike,
        isDay: currentCity.isDay,
        aqi: currentCity.aqi,
    };
}

function runTest(testName, currentCity, apiData){
    console.log(`\n--- ${testName} ---`);
    const notifications = [];
    const updates = [];

    const addNotification = (msg, type) => {
        notifications.push({ msg, type, timestamp: new Date().toISOString() });
    };
    const updateCityData = (cityName, newData) => {
        updates.push({ cityName, newData });
    };

    const newCityData = buildNewCityData(apiData);
    const oldCityData = buildOldCityData(currentCity);

    console.log('oldCityData:', oldCityData);
    console.log('newCityData:', newCityData);

    const compareNewCityData = {
        city: newCityData.city,
        country: newCityData.country,
        tz_id: newCityData.tz_id,
        loc: newCityData.loc,
        liveTemp: newCityData.liveTemp,
        liveCondition: newCityData.liveCondition,
        humidity: newCityData.humidity,
        wind: newCityData.wind,
        windDegree: newCityData.windDegree,
        visibility: newCityData.visibility,
        feelsLike: newCityData.feelsLike,
        isDay: newCityData.isDay,
        aqi: newCityData.aqi,
    };

    if (JSON.stringify(oldCityData) !== JSON.stringify(compareNewCityData)){
        const id = setTimeout(() => {
            addNotification(`Synced Weather Data For ${currentCity.city}`, 'info');
        }, 1000);
        // store id just in case
        // simulate update
        updateCityData(currentCity.city, newCityData);
    } else {
        console.log('No changes detected; no update or notification scheduled.');
    }

    // wait 1200ms to allow notification timeout to fire
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ notifications, updates });
        }, 1200);
    });
}

(async () => {
    // Test 1: identical data -> no update
    const currentCity1 = {
        city: 'Testville',
        country: 'Testland',
        tz_id: 'Europe/Test',
        location: { lat: 10, lon: 20 },
        loc: { lat: 10, lon: 20 },
        liveTemp: 15,
        liveCondition: 'Clear',
        humidity: 40,
        wind: 5,
        windDegree: 90,
        visibility: 10,
        feelsLike: 15,
        isDay: true,
        aqi: 1,
    };

    const apiData1 = {
        location: { name: 'Testville', country: 'Testland', tz_id: 'Europe/Test', lat: 10, lon: 20 },
        current: {
            temp_c: 15,
            condition: { text: 'Clear' },
            humidity: 40,
            wind_kph: 5,
            wind_degree: 90,
            vis_km: 10,
            feelslike_c: 15,
            is_day: 1,
            air_quality: { 'us-epa-index': 1 }
        }
    };

    const res1 = await runTest('Identical data (no-change)', currentCity1, apiData1);
    console.log('Result 1:', res1);

    // Test 2: changed data -> update + notification
    const currentCity2 = { ...currentCity1 };
    const apiData2 = JSON.parse(JSON.stringify(apiData1));
    apiData2.current.temp_c = 18; // changed temp

    const res2 = await runTest('Changed data (should update)', currentCity2, apiData2);
    console.log('Result 2:', res2);

    process.exit(0);
})();
