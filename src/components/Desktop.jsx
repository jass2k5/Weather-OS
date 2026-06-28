import { useEffect } from "react"
import { useOsStore } from "../store/useOsStore"
import { WeatherMap } from "../pages/map/map"
import { DraggableWindow } from "./DraggableWindow"
export const Desktop = ()=>{
    const bgClr = useOsStore((state) => state.systemBg)
   
    return(
        <div className={` desktop h-screen w-screen relative bg-cover bg-center bg-no-repeat ${bgClr}`}>
            <div className="glassmorph "></div>
            <div className="absolute inset-0 z-10 bg "> 
                <DraggableWindow title="SYSTEM_MAP_VIEWER">
                <WeatherMap />
            </DraggableWindow>
            </div>
            
        </div>
    )
}