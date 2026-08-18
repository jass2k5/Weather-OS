import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AppKey = "map" | "clock" | "notification" | "settings" | "contact" | "weather";
export interface WeatherHistoryItem {
    city: string;
    country: string;
    tz_id: string;
    loc?: { lat: number; lon: number } | null;
    liveTemp: number;
    liveCondition: string;
    humidity: number;
    wind: number;
    windDegree: number;
    visibility: number;
    feelsLike: number;
    isDay: boolean;
    aqi: number | null;
}
export interface NotificationItem {
    id: string;
    message: string;
    type: "info" | "success" | "error" | "warning";
    timestamp: string;
}
export interface DateTimeSettings {
    showDateTime: boolean;
    showSeconds: boolean;
    format: { hour: string; bol: boolean };
    color: { clr: string; bol: boolean };
    position: string;
}
export interface TempDistSettings {
    celsius: boolean;
    km: boolean;
}

export interface MapSettings {
    theme: string;
    Navigations: boolean;
    flyby: boolean;
    marker: boolean;
}

export interface ClockSettings {
    liveNight: boolean;
    liveDay: boolean;
    format: { hour: string; enabled: boolean };
}


export interface FullOsStoreState {
    // Basic State
    theme: string;
    setTheme: (theme: string) => void;
    isDay: boolean;
    setNight: () => void;
    setDay: () => void;

    // UI Toggles
    isScrollHovered: boolean;
    isGithubHovered: boolean;
    setIsGithubHovered: (val: boolean) => void;
    setIsScrollHovered: (val: boolean) => void;
    githubText: string | null;
    setgithubText: (val: string | null) => void;

    // Boot & Background
    isBooted: boolean;
    systemBg: string;
    setBg: (bg: string) => void;
    finishBoot: () => void;

    // Telemetry
    activeLocation: string | null;
    telemetryData: any | null;
    setSystemTelemetry: (location: string, data: any) => void;

    // Window Management
    apps: Record<AppKey, { isOpen: boolean }>;
    closeApp: (Appid: AppKey) => void;
    openApp: (Appid: AppKey) => void;
    closeAll: () => void;
    windowOrder: AppKey[];
    focusApp: (appId: AppKey) => void;

    // Search History
    searchHistory: WeatherHistoryItem[];
    addSearchToHistory: (apiData: any) => void;
    removeSearchItem: (cityName: string) => void;
    updateCityData: (cityName: string, newData: Partial<WeatherHistoryItem>) => void;

    // Notifications
    notificationHistory: NotificationItem[];
    activeNotifications: NotificationItem[];
    addNotification: (message: string, type?: "info" | "success" | "error" | "warning") => void;
    clearNotification: () => void;

    // Settings
    dateTimeSettings: DateTimeSettings;
    updateDateTimeSetting: (key: keyof DateTimeSettings, value: any) => void;

    tempdist: TempDistSettings;
    settempdist: (key: keyof TempDistSettings, val: boolean) => void;

    glassSettings: { enabled: boolean; blurValue: number };
    updateGlassSetting: (key: string, value: any) => void;

    mouseFollower: { enabled: boolean; clockFollower: boolean };
    updateFollowerSetting: (key: string, value: any) => void;

    mapSetting: MapSettings;
    setMapSetting: (key: keyof MapSettings, value: any) => void;

    clockSetting: ClockSettings;
    setClockSetting: (key: keyof ClockSettings, value: any) => void;

    notificationSetting: { enabled: boolean; sound: boolean };
    setnotificationSetting: (key: string, value: any) => void;
}


export const useOsStore = create<FullOsStoreState>()(persist((set, get) => ({
    theme: 'dark',
    setTheme: (theme) => set({ theme }),
    isDay: true,
    setNight: () => { set({ isDay: false }) },
    setDay: () => { set({ isDay: true }) },
    isScrollHovered: false,
    isGithubHovered: false,
    setIsGithubHovered: (val) => set({ isGithubHovered: val }),
    setIsScrollHovered: (val) => set({ isScrollHovered: val }),
    githubText: null,
    setgithubText: (val) => set({ githubText: val }),
    isBooted: false,
    systemBg: "/stage1bg.webp",
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
        weather: { isOpen: false }
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
    closeAll: () => set((state) => ({
        apps: {
            ...state.apps,
            map: { isOpen: false },
            clock: { isOpen: false },
            notification: { isOpen: false },
            settings: { isOpen: false },
            contact: { isOpen: false },
            weather: { isOpen: false }
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


        const currentHistory = state.searchHistory;

        const filteredHistory = currentHistory.filter(
            (loc) => loc.city.toLowerCase() !== apiData.location.name.toLowerCase()
        );

        const updatedHistory = [
            newCityObject,
            ...filteredHistory
        ].slice(0, 5);


        set({
            searchHistory: updatedHistory,
            telemetryData: newCityObject,
            activeLocation: apiData.location.name
        });
    },

    removeSearchItem: (cityName) => set((state) => ({
        searchHistory: state.searchHistory.filter((loc) => loc.city !== cityName)
    })),

    windowOrder: ['map', 'clock', 'settings', "notification", "contact", "weather"],


    focusApp: (appId) => set((state) => ({
        windowOrder: [...state.windowOrder.filter((id) => id !== appId), appId]
    })),



    updateCityData: (cityName, newData) => set((state) => {

        const updatedHistory = state.searchHistory.map((loc) =>
        (loc.city === cityName ? { ...loc, ...newData } : loc)
        );


        let updatedTelemetry = state.telemetryData;
        if (state.telemetryData && state.telemetryData.city === cityName) {
            updatedTelemetry = { ...state.telemetryData, ...newData };
        }

        return {
            searchHistory: updatedHistory,
            telemetryData: updatedTelemetry
        };
    }),

    notificationHistory: [],
    activeNotifications: [],

    addNotification: (message: string, type = "info") => {
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

        window.setTimeout(() => {
            set((state) => ({
                activeNotifications: state.activeNotifications.filter((n) => n.id !== id)
            }))
        }, 4000)



    },

    clearNotification: () => set(() => ({
        notificationHistory: []
    })),


    //settings section
    dateTimeSettings: {
        showDateTime: true,
        showSeconds: true,
        format: { hour: "12h", bol: false },
        color: { clr: "white", bol: true },
        position: 'top-right'
    },
    tempdist: {
        celsius: false,
        km: false,
    },
    settempdist: (key, val) => set((state) => (
        {
            tempdist: {
                ...state.tempdist,
                [key]: val
            }

        }
    )),

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
    })),
}),

    {
        name: 'weatherOs',
        partialize: (state) => Object.fromEntries(
            Object.entries(state).filter(([key]) => key !== 'notificationHistory' && key !== 'activeNotifications')
        ),
    }));
