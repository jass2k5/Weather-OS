import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOsStore = create(persist((set) =>({

    isBooted: false,
    location:'',
    systemBg: "bg-[url(/stage1bg.png)]",
    finishBoot: () => {set({isBooted:true})},
    setLocation: (newcity) => set({location:newcity}),
    activeLocation: null,
    telemetryData:null,
    setSystemTelemetry: (location,data) => set({
        activeLocation:location,
        telemetryData:data
    }),
    settelemetryData : (location,data) => set({
        activeLocation:location,
        telemetryData:data
    }),
    
    apps:{
        map:{isOpen:false},
        terminalMap:{isOpen:true}
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

