import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
export const useOsStore = create(persist((set, get) => ({
    isClosing: false,
    startCloseApp: () => { set({ isClosing: true }) },
    isDay: true,
    setNight: () => { set({ isDay: false }) },
    setDay: () => { set({ isDay: true }) },
    isScrollHovered: false,
    setIsScrollHovered: (val) => set({ isScrollHovered: val }),
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
        ].slice(0, 4);


        set({ searchHistory: updatedHistory });
    },

    windowOrder: ['map', 'clock', 'terminalMap', 'terminalClock'],


    focusApp: (appId) => set((state) => {
        const remainingApps = state.windowOrder.filter((id) => id !== appId);
        return { windowOrder: [...remainingApps, appId] };
    }),
    //sync system for clock 

    updateCityData: (cityName,newData)=> set((state)=>({
        searchHistory: state.searchHistory.map((loc)=>(loc.city === cityName ? {...loc,...newData} : loc))
    })),
    syncAllWeather: async () => {
        const state = get();
        const Api_Key = import.meta.env.VITE_WEATHER_API_KEY;
        const BASE_URL = 'https://api.weatherapi.com/v1';
        const fetchPromises = state.searchHistory.map(async (loc) => {
           const response = await fetch(`${BASE_URL}/current.json?key=${Api_Key}&q=${loc.city}`);
           if(!response.ok) throw new Error("Api Failed");
           const apiData = await response.json();
           return {city:loc.city,apiData};
        });

        const results = await Promise.allSettled(fetchPromises);

        results.forEach((result)=>{
            if(result.status  === "fulfilled"){ 
                const{city,apiData} = result.value;
            
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
            state.updateCityData(city,updatedCityObject);

            }
        })
    },
    notificationHistory: [],
    activeNotifications: [],

    addNotification: (message,type = "info")=>{
        const id = crypto.randomUUID();
        const newNoti = {
            id,
            message,
            type,
            timestamp: new Date().toLocaleTimeString([],{hour:'2-digit',minute:"2-digit"})
        };

        set((state)=>({
            notificationHistory:[newNoti,...state.notificationHistory],
            activeNotifications:[newNoti,...state.activeNotifications]
        }));

        let timer = setTimeout(()=>{
            set((state)=>({
                activeNotifications:state.activeNotifications.filter((n)=> n.id !== id)
            }))
        },4000)

        return  ()=> clearTimeout(timer);

    },


})),


    {
        name: 'weatherOsStorage',
    })

