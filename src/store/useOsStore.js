import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
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
      feelsLike: apiData.current.feelslike_c
    };


    const currentHistory = state.searchHistory;
    
    const filteredHistory = currentHistory.filter(
        (loc) => loc.city.toLowerCase() !== apiData.location.name.toLowerCase()
    );

    const updatedHistory = [
        newCityObject,
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

