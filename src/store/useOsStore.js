import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOsStore = create(persist((set,get) =>({
    isClosing: false,
    startCloseApp:()=>{set({isClosing:true})},
    isDay:true,
    setNight:()=>{set({isDay:false})},
    setDay:()=>{set({isDay:true})},
    isBooted: false,
    systemBg: "bg-[url(/stage1bg.png)]",
    finishBoot: () => {set({isBooted:true})},
    activeLocation: null,
    telemetryData:null,
    setSystemTelemetry: (location,data) => set({
        activeLocation:location,
        telemetryData:data,
    }),
    
    apps:{
        map:{isOpen:true},
        terminalMap:{isOpen:false}
    },

    closeApp:(Appid) =>set((state) =>({
        isClosing:false,
        apps:{
            ...state.apps,
            [Appid]:{
                ...state.apps[Appid],
                isOpen:false
            }
        }
    })),
    openApp:(Appid) =>set((state) =>({
        isClosing:false,
        apps:{
            ...state.apps,
            [Appid]:{
                ...state.apps[Appid],
                isOpen:true
            }
        }
    })),
    searchHistory: [],
            
            addSearchToHistory: (cityName, countryName) => {
                const currentHistory = get().searchHistory; 
                
                const filteredHistory = currentHistory.filter(
                    (loc) => loc.city.toLowerCase() !== cityName.toLowerCase()
                );
                
                const updatedHistory = [
                    { city: cityName, country: countryName }, 
                    ...filteredHistory
                ].slice(0, 4);
                
                set({ searchHistory: updatedHistory }); 
            }

})),


{
    name:'weatherOsStorage',
})

