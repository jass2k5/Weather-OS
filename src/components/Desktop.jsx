import { useEffect } from "react"
import { useOsStore } from "../store/useOsStore"
import { DraggableWindow } from "./DraggableWindow"
import {TerminalMap} from '../terminals/TerminalMap'
import { WeatherMap } from "../pages/map/Map"
import { TopRightDate } from "../layout/TopRightDate"
import { Clock } from "../pages/clock/Clock"
import { Dock } from "../layout/Dock"

export const Desktop = ()=>{
    const bgClr = useOsStore((state) => state.systemBg)
    const apps = useOsStore((state) => state.apps);
  
    return(
        <div className={` desktop h-screen w-screen relative bg-cover bg-center bg-no-repeat ${bgClr}`}>
            <div className="glassmorph "></div>
            
            <div className="absolute inset-0 z-10 bg "> 
                <TopRightDate/>

                {apps?.map?.isOpen && <WeatherMap/>}
                {apps?.terminalMap?.isOpen && 
                (<DraggableWindow title={"TerminalMap"} Appid = {"terminalMap"}><TerminalMap/></DraggableWindow>)}
                {apps?.clock?.isOpen && <Clock/>}
                
                <Dock/>
            </div>
            
        </div>
    )
}