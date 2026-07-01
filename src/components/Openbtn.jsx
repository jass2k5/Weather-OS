import { useOsStore } from "../store/useOsStore";

  export const OpenBtn = ()=>{
  const openApp = useOsStore((state) => state.openApp)
  const Appid = "terminalMap"
    return(
        <button onClick={()=>{openApp(Appid)}} className="h-auto w-auto flex items-center justify-center p-8 bg-black text-white border-2 border-white rounded-l absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50"><span className="text-xs p-6">open terminal</span></button>
    )
  }