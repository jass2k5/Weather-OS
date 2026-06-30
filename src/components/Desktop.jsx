import { useEffect } from "react"
import { useOsStore } from "../store/useOsStore"
import { WeatherMap } from "../pages/map/map"
import { DraggableWindow } from "./DraggableWindow"
import {TerminalMap} from '../terminals/TerminalMap'
import { OpenBtn } from "./Openbtn"
export const Desktop = ()=>{
    const bgClr = useOsStore((state) => state.systemBg)
    const apps = useOsStore((state) => state.apps);
  
    return(
        <div className={` desktop h-screen w-screen relative bg-cover bg-center bg-no-repeat ${bgClr}`}>
            <div className="glassmorph "></div>
            
            <div className="absolute inset-0 z-10 bg "> 
                <OpenBtn/>
                {apps?.terminalMap?.isOpen && 
                (<DraggableWindow title={"TerminalMap"} Appid = {"terminalMap"}><TerminalMap/></DraggableWindow>)}

            </div>
            
        </div>
    )
}