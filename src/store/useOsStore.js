import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOsStore = create(persist((set, get) => ({
    isClosing: false,
    startCloseApp: () => { set({ isClosing: true }) },
    isDay: true,
    setNight: () => { set({ isDay: false }) },
    setDay: () => { set({ isDay: true }) },
    isBooted: false,
    systemBg: "bg-[url(/stage1bg.png)]",
    finishBoot: () => { set({ isBooted: true }) },
    activeLocation: null,
    telemetryData: null,
    setSystemTelemetry: (location, data) => set({
        activeLocation: location,
        telemetryData: data,
    }),

    apps: {
        map: { isOpen: true },
        terminalMap: { isOpen: false },
        clock: { isOpen: false },
        terminalClock: { isOpen: false }
    },

    closeApp: (Appid) => set((state) => ({
        isClosing: false,
        apps: {
            ...state.apps,
            [Appid]: {
                ...state.apps[Appid],
                isOpen: false
            }
        }
    })),
    openApp: (Appid) => set((state) => ({
        isClosing: false,
        apps: {
            ...state.apps,
            [Appid]: {
                ...state.apps[Appid],
                isOpen: true
            }
        }
    })),
    searchHistory: [],

    addSearchToHistory: (cityName, countryName, tz_id) => {
        const currentHistory = get().searchHistory;

        const filteredHistory = currentHistory.filter(
            (loc) => loc.city.toLowerCase() !== cityName.toLowerCase()
        );

        const updatedHistory = [
            { city: cityName, country: countryName ,tz_id: tz_id},
            ...filteredHistory
        ].slice(0, 4);

        set({ searchHistory: updatedHistory });
    },


    windowOrder: ['map', 'clock', 'terminalMap','terminalClock'],


    focusApp: (appId) => set((state) => {
        const remainingApps = state.windowOrder.filter((id) => id !== appId);
        return { windowOrder: [...remainingApps, appId] };
    })

})),


    {
        name: 'weatherOsStorage',
    })

