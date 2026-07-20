import { useEffect } from "react"
import { useOsStore } from "../shared/store/useOsStore"
import { DraggableWindow } from "../shared/components/DraggableWindow"
import { TerminalMap } from "../features/terminals/TerminalMap"
import { WeatherMap } from "../features/map/Map"
import { TopRightDate } from "../layout/TopRightDate"
import { Clock } from "../features/clock/Clock"
import { Dock } from "../layout/Dock"
import { NotificationManager } from "../layout/NotificationFly";
import { NotificationApp } from "../features/notification/Notification"

export const Desktop = () => {
    const bgClr = useOsStore((state) => state.systemBg)
    const apps = useOsStore((state) => state.apps);
    const addNotification = useOsStore((state) => state.addNotification);
    useEffect(() => {
        addNotification("System booted successfully.", "success");
    }, [])


    return (
        <div className={` desktop h-screen w-screen relative bg-cover bg-center bg-no-repeat overflow-hidden ${bgClr}`}>
            <div className="glassmorph "></div>

            <div className="absolute inset-0 z-10 bg ">
                
                <NotificationManager />
                <TopRightDate />
                {apps?.notification?.isOpen && (<DraggableWindow
                title={"Notification History"}
                Appid={"notification"}
                isResizable={false}
                defaultSize={{ width: 520, height: 380 }}
                >
                    <NotificationApp/>
                </DraggableWindow>) }
                {apps?.map?.isOpen && <WeatherMap />}
                {apps?.terminalMap?.isOpen &&
                    (<DraggableWindow title={"TerminalMap"} Appid={"terminalMap"} ><TerminalMap /></DraggableWindow>)}
                {apps?.clock?.isOpen && <Clock />}
                {apps?.terminalClock?.isOpen && (<DraggableWindow title={"TerminalClock"} Appid={"terminalClock"}><Clock /></DraggableWindow>)}

                <Dock />
            </div>

        </div>
    )
}
