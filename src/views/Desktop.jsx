import { useEffect } from "react"
import { lazy, Suspense } from 'react';
import { useOsStore } from "../shared/store/useOsStore"
import { DraggableWindow } from "../shared/components/DraggableWindow"
import { TopRightDate } from "../layout/date/TopRightDate"
import { Dock } from "../layout/dock/Dock"
import { NotificationManager } from "../layout/NotificationFly";
import { ErrorBoundary } from 'react-error-boundary';
import { MapCrashFallback } from "../features/map/ErrorBoundaryMap"
//main components
const WeatherMap = lazy(()=> import("../features/map/Map").then(mod=>({default:mod.WeatherMap})));
const Clock = lazy(()=>import("../features/clock/Clock").then(mod=>({default:mod.Clock})));
const Settings = lazy(()=>import("../features/settings/Settings").then(mod=>({default:mod.Settings})));
const ContactApp = lazy(()=>import("../features/contact/Contact").then(mod=>({default:mod.ContactApp})));
const NotificationApp = lazy(()=>import( "../features/notification/Notification").then(mod=>({default:mod.NotificationApp})));

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


                > <Suspense fallback={null}>
                        <ContactApp />
                    </Suspense></DraggableWindow>)}

                {apps?.notification?.isOpen && (<DraggableWindow
                    title={"Notification History"}
                    Appid={"notification"}
                    isResizable={false}
                    defaultSize={{ width: 520, height: 380 }}
                    minHeight={380}
                    minWidth={520}
                >
                    <Suspense fallback={null}>
                        <NotificationApp />
                    </Suspense>
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
                        <Suspense fallback={null}>
                            <WeatherMap />
                        </Suspense>
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
                    <Suspense fallback={null}>
                        <Settings />
                    </Suspense>
                </DraggableWindow>}


                {apps?.clock?.isOpen && <Suspense fallback={null}>
                    <Clock />
                </Suspense>}

                {apps?.terminalClock?.isOpen && (<DraggableWindow title={"TerminalClock"} Appid={"terminalClock"} minHeight={406} minWidth={459}><Clock /></DraggableWindow>)}

                <Dock />
            </div>

        </div>
    )
}
