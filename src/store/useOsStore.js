import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOsStore = create(persist((set) =>({

    isBooted: false,
    location:'',
    systemBg: "bg-[url(/stage1bg.png)]",
    finishBoot: () => {set({isBooted:true})},
    setLocation: (newcity) => set({location:newcity}),

})),
{
    name:'weatherOsStorage',
})

