import { useOsStore } from "../store/useOsStore";

  export const OpenBtn = ()=>{
  const openApp = useOsStore((state) => state.openApp)
  const Appid = "terminalMap"
    return(
        <button onClick={()=>{openApp(Appid)}} className="h-8 w-8 bg-black text-white p-4 rounded-l border-2 border-red-300">open terminal</button>
    )
  }