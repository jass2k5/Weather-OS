import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOsStore = create(persist((set, get) => ({

    isDay: true,
    setNight: () => { set({ isDay: false }) },
    setDay: () => { set({ isDay: true }) },
    isScrollHovered: false,
    isGithubHovered : false,
    setIsGithubHovered:(val)=>set({isGithubHovered:val}),
    setIsScrollHovered: (val) => set({ isScrollHovered: val }),
    githubText:null,
    setgithubText:(val)=> set({githubText:val}),
    isBooted: false,
    systemBg: "/stage1bg.png",
    setBg: (bg) => set(() => ({
        systemBg: bg,
    })),
    finishBoot: () => { set({ isBooted: true }) },
    activeLocation: null,
    telemetryData: null,
    setSystemTelemetry: (location, data) => set({
        activeLocation: location,
        telemetryData: data,
    }),

    apps: {
        map: { isOpen: true },
        clock: { isOpen: false },
        notification: { isOpen: false },
        settings: { isOpen: false },
        contact: { isOpen: false },
    },

    closeApp: (Appid) => set((state) => ({
        apps: {
            ...state.apps,
            [Appid]: {
                ...state.apps[Appid],
                isOpen: false
            }
        }
    })),
    openApp: (Appid) => set((state) => ({
        apps: {
            ...state.apps,
            [Appid]: {
                ...state.apps[Appid],
                isOpen: true
            }
        }
    })),

    searchHistory: [],

    addSearchToHistory: (apiData) => {
        const state = get();


        if (!apiData || !apiData.location) {
            console.error("Invalid data passed to history");
            return;
        }


        const newCityObject = {
            city: apiData.location.name,
            country: apiData.location.country,
            tz_id: apiData.location.tz_id,
            liveTemp: apiData.current.temp_c,
            liveCondition: apiData.current.condition.text,
            humidity: apiData.current.humidity,
            wind: apiData.current.wind_kph,
            visibility: apiData.current.vis_km,
            feelsLike: apiData.current.feelslike_c,
            isDay: apiData.current.is_day === 1,
            aqi: apiData.current.air_quality ? apiData.current.air_quality['us-epa-index'] : null,
        };


        const currentHistory = state.searchHistory;

        const filteredHistory = currentHistory.filter(
            (loc) => loc.city.toLowerCase() !== apiData.location.name.toLowerCase()
        );

        const updatedHistory = [
            newCityObject,
            ...filteredHistory
        ].slice(0, 5);


        set({ searchHistory: updatedHistory });
    },
    
    removeSearchItem: (cityName) => set((state) => ({
        searchHistory: state.searchHistory.filter((loc) => loc.city !== cityName)
    })),

    windowOrder: ['map', 'clock', 'settings', "notification","contact"],


    focusApp: (appId) => set((state) => ({
        windowOrder: [...state.windowOrder.filter((id) => id !== appId), appId]
    })),
    //sync system for clock 

    updateCityData: (cityName, newData) => set((state) => ({
        searchHistory: state.searchHistory.map((loc) => (loc.city === cityName ? { ...loc, ...newData } : loc))
    })),
    syncAllWeather: async () => {
        const state = get();
        const Api_Key = import.meta.env.VITE_WEATHER_API_KEY;
        const BASE_URL = 'https://api.weatherapi.com/v1';
        const fetchPromises = state.searchHistory.map(async (loc) => {
            const response = await fetch(`${BASE_URL}/current.json?key=${Api_Key}&q=${loc.city}`);
            if (!response.ok) throw new Error("Api Failed");
            const apiData = await response.json();
            return { city: loc.city, apiData };
        });

        const results = await Promise.allSettled(fetchPromises);

        results.forEach((result) => {
            if (result.status === "fulfilled") {
                const { city, apiData } = result.value;

                const updatedCityObject = {
                    city: apiData.location.name,
                    country: apiData.location.country,
                    tz_id: apiData.location.tz_id,
                    liveTemp: apiData.current.temp_c,
                    liveCondition: apiData.current.condition.text,
                    humidity: apiData.current.humidity,
                    wind: apiData.current.wind_kph,
                    visibility: apiData.current.vis_km,
                    feelsLike: apiData.current.feelslike_c,
                    isDay: apiData.current.is_day === 1,
                    aqi: apiData.current.air_quality ? apiData.current.air_quality['us-epa-index'] : null,
                };
                state.updateCityData(city, updatedCityObject);

            }
        })
    },
    notificationHistory: [],
    activeNotifications: [],

    addNotification: (message, type = "info") => {
        const state = get();
        if (state.notificationSetting && state.notificationSetting.enabled === false) {
            return;
        }
        const id = crypto.randomUUID();
        const newNoti = {
            id,
            message,
            type,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" })
        };

        set((state) => ({
            notificationHistory: [newNoti, ...state.notificationHistory],
            activeNotifications: [newNoti, ...state.activeNotifications]
        }));

        if (state.notificationSetting?.sound) {
            const audio = new Audio("./notificationBell.mp3");
            audio.volume = 0.5;
            audio.play().catch((err) => console.log("Audio play blocked by browser", err));
        }

        let timer = setTimeout(() => {
            set((state) => ({
                activeNotifications: state.activeNotifications.filter((n) => n.id !== id)
            }))
        }, 4000)



    },

    clearNotification: () => set((state => ({
        notificationHistory: []
    }))),


    //settings section
    dateTimeSettings: {
        showDateTime: true,
        showSeconds: true,
        format: { hour: "12h", bol: false },
        color: { clr: "white", bol: true },
        position: 'top-right'
    },

    updateDateTimeSetting: (key, value) => set((state) => ({
        dateTimeSettings: {
            ...state.dateTimeSettings,
            [key]: value
        }
    })),
    //glassmorph settings

    glassSettings: {
        enabled: true,
        blurValue: 2,
    },

    updateGlassSetting: (key, value) => set((state) => ({
        glassSettings: {
            ...state.glassSettings,
            [key]: value
        }
    })),

    //mousefollower 

    mouseFollower: {
        enabled: true,
        clockFollower: true,
    },
    updateFollowerSetting: (key, value) => set((state) => ({
        mouseFollower: {
            ...state.mouseFollower,
            [key]: value
        }
    })),

    //map settings
    mapSetting: {
        theme: "dark",
        terminalMapTheme: {
            theme: "light",
            bol: false,
            flyby: true,
            marker: true
        },
        Navigations: true,
        flyby: true,
        marker: true
    },

    setMapSetting: (key, value) => set((state) => ({
        mapSetting: {
            ...state.mapSetting,
            [key]: value
        }
    })),

    //clock setting
    clockSetting: {
        liveNight: false,
        liveDay: false,
        format: {
            hour: '12h',
            enabled: false
        },
        celsius: false,
        km: false,
    },

    setClockSetting: (key, value) => set((state) => ({
        clockSetting: {
            ...state.clockSetting,
            [key]: value
        }
    })),

    //notification settings
    notificationSetting: {
        enabled: true,
        sound: true,
    },
    setnotificationSetting: (key, value) => set((state) => ({
        notificationSetting: {
            ...state.notificationSetting,
            [key]: value
        }
    }))
}

),

    {
        name: 'weatherOsStorage',
        partialize: (state) => Object.fromEntries(
            Object.entries(state).filter(([key]) => key !== 'notificationHistory' && key !== 'activeNotifications')
        ),
    }))
