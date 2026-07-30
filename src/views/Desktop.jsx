import { useEffect } from "react"
import { useOsStore } from "../shared/store/useOsStore"
import { DraggableWindow } from "../shared/components/DraggableWindow"
import { WeatherMap } from "../features/map/Map"
import { TopRightDate } from "../layout/date/TopRightDate"
import { Clock } from "../features/clock/Clock"
import { Dock } from "../layout/dock/Dock"
import { NotificationManager } from "../layout/NotificationFly";
import { NotificationApp } from "../features/notification/Notification"
import { Settings } from "../features/settings/Settings"
import { ContactApp } from "../features/contact/Contact"
import { ErrorBoundary } from 'react-error-boundary';
import { MapCrashFallback } from "../features/map/ErrorBoundaryMap"

export const Desktop = () => {
    const bgUrl = useOsStore((state) => state.systemBg)
    const apps = useOsStore((state) => state.apps);
    const addNotification = useOsStore((state) => state.addNotification);
    const glassSettings = useOsStore((state) => state.glassSettings);
    useEffect(() => {
        addNotification("System booted successfully.", "success");
    }, [])


    return (
        <div
            style={{ backgroundImage: `url('${bgUrl}')` }}
            className={` desktop h-screen w-screen relative bg-cover bg-center bg-no-repeat overflow-hidden `}>
            {glassSettings?.enabled && (
                <div style={{
                    backdropFilter: `blur(${glassSettings.blurValue || 0}px)`,
                    WebkitBackdropFilter: `blur(${glassSettings.blurValue || 0}px)`
                }} className="glassmorph"></div>
            )}

            <div className="absolute inset-0 z-10 bg ">

                <NotificationManager />
                <TopRightDate />
                {apps?.contact?.isOpen && (<DraggableWindow title={"Contact Me"} Appid={"contact"} defaultSize={{
                    width: window.innerWidth,
                    height: window.innerHeight
                }}
                    defaultpos={{
                        x: 0,
                        y: 0
                    }}
                    minHeight={380}
                    minWidth={520}


                > <ContactApp /></DraggableWindow>)}

                {apps?.notification?.isOpen && (<DraggableWindow
                    title={"Notification History"}
                    Appid={"notification"}
                    isResizable={false}
                    defaultSize={{ width: 520, height: 380 }}
                    minHeight={380}
                    minWidth={520}
                >
                    <NotificationApp />
                </DraggableWindow>)}


                {apps?.map?.isOpen && <DraggableWindow
                    title={"Map"}
                    Appid={"map"}
                    minHeight={340}
                    minWidth={500}
                    defaultSize={{
                        width: window.innerWidth,
                        height: window.innerHeight
                    }}
                    defaultpos={{
                        x: 0,
                        y: 0
                    }}
                > <ErrorBoundary
                    FallbackComponent={MapCrashFallback}
                    onReset={() => {

                        console.log("REBOOTING MAP SYSTEM...");

                    }}
                >
                        <WeatherMap />
                    </ErrorBoundary></DraggableWindow>}



                {apps?.settings?.isOpen && <DraggableWindow
                    defaultSize={{
                        width: window.innerWidth * 0.7,
                        height: window.innerHeight * 0.7
                    }}
                    defaultpos={{
                        x: Math.floor(window.innerWidth * 0.02),
                        y: Math.floor(window.innerHeight * 0.02)
                    }}
                    minWidth={750}
                    minHeight={450}
                    Appid={"settings"}
                    title={"Settings"}
                >
                    <Settings />
                </DraggableWindow>}


                {apps?.clock?.isOpen && <Clock />}

                {apps?.terminalClock?.isOpen && (<DraggableWindow title={"TerminalClock"} Appid={"terminalClock"} minHeight={406} minWidth={459}><Clock /></DraggableWindow>)}

                <Dock />
            </div>

        </div>
    )
}
