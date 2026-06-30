import { useOsStore } from "../store/useOsStore";

  export const OpenBtn = ()=>{
  const openApp = useOsStore((state) => state.openApp)
  const Appid = "terminalMap"
    return(
        <button onClick={()=>{openApp(Appid)}} className="h-auto w-auto flex items-center justify-center p-8 bg-black text-white border-2 border-white rounded-l"><span className="text-xs p-6">open terminal</span></button>
    )
  }