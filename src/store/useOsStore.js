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

    addSearchToHistory: async (cityName) => {
    try {
      const state = get();
     const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      
     const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`);
    
      if (!data || !data.location) {
        console.error("City not found!");
        return; 
      }

     
      const newCityObject = {
        city: data.location.name,
        country: data.location.country,
        tz_id: data.location.tz_id,
        liveTemp: data.current.temp_c,
        liveCondition: data.current.condition.text,
        humidity: data.current.humidity,
        wind: data.current.wind_kph,
        visibility: data.current.vis_km,
        feelsLike: data.current.feelslike_c
      };


      const currentHistory = state.searchHistory;
      
      const filteredHistory = currentHistory.filter(
          (loc) => loc.city.toLowerCase() !== data.location.name.toLowerCase()
      );

      const updatedHistory = [
          newCityObject,
          ...filteredHistory
      ].slice(0, 4);

      set({ searchHistory: updatedHistory });

    } catch (error) {
      console.error("Failed to add new search:", error);
    }
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

