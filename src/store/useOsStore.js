import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOsStore = create(persist((set) =>({
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
        apps:{
            ...state.apps,
            [Appid]:{
                ...state.apps[Appid],
                isOpen:false
            }
        }
    })),
    openApp:(Appid) =>set((state) =>({
        apps:{
            ...state.apps,
            [Appid]:{
                ...state.apps[Appid],
                isOpen:true
            }
        }
    }))

})),
{
    name:'weatherOsStorage',
})

