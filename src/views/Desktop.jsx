import { useEffect, lazy, Suspense } from 'react';
import { useQueryClient } from "@tanstack/react-query";
import { useOsStore } from "../shared/store/useOsStore";
import { DraggableWindow } from "../shared/components/DraggableWindow";
import { TopRightDate } from "../layout/date/TopRightDate";
import { Dock } from "../layout/dock/Dock";
import { NotificationManager } from "../layout/NotificationFly";
import { ErrorBoundary } from 'react-error-boundary';
import { MapCrashFallback } from "../features/map/ErrorBoundaryMap";
import { useSyncAllWeather } from "../shared/hooks/useSyncAllWeather";

// Lazy Loaded Apps
const WeatherMap = lazy(() => import("../features/map/Map").then(m => ({ default: m.WeatherMap })));
const Clock = lazy(() => import("../features/clock/Clock").then(m => ({ default: m.Clock })));
const Settings = lazy(() => import("../features/settings/Settings").then(m => ({ default: m.Settings })));
const ContactApp = lazy(() => import("../features/contact/Contact").then(m => ({ default: m.ContactApp })));
const NotificationApp = lazy(() => import("../features/notification/Notification").then(m => ({ default: m.NotificationApp })));

const APP_CONFIG = [
        { id: 'contact', title: "Contact Me", Component: ContactApp, minW: 520, minH: 380, defW: window.innerWidth, defH: window.innerHeight, posX: 0, posY: 0 },
        { id: 'notification', title: "Notification History", Component: NotificationApp, minW: 520, minH: 380, defW: 520, defH: 380, isResizable: false },
        { id: 'map', title: "Map", Component: WeatherMap, minW: 500, minH: 340, defW: window.innerWidth, defH: window.innerHeight, posX: 0, posY: 0 },
        { id: 'settings', title: "Settings", Component: Settings, minW: 750, minH: 450, defW: window.innerWidth * 0.7, defH: window.innerHeight * 0.7, posX: window.innerWidth * 0.02, posY: window.innerHeight * 0.02 },
        { id: 'clock', title: "Clock", Component: Clock, minW: 459, minH: 406, defW: window.innerWidth, defH: window.innerHeight, posX: 0, posY: 0 }
    ];


export const Desktop = () => {
    const queryClient = useQueryClient();
    const bgUrl = useOsStore((state) => state.systemBg);
    const apps = useOsStore((state) => state.apps);
    const addNotification = useOsStore((state) => state.addNotification);
    const glassSettings = useOsStore((state) => state.glassSettings);
    
    useSyncAllWeather(); 


    useEffect(() => {
        addNotification("System booted successfully.", "success");
        try{
            queryClient.invalidateQueries({ queryKey: ["syncWeather"] });
        }catch(error){
            console.warn(error);
        }
        
        const timer = setTimeout(() => {
            addNotification("Synced All Weather Data. Will Update after 15 minutes", "info");
        }, 4000);
        
        return () => clearTimeout(timer); 
    }, []);


    
    return (
        <div 
            style={{ backgroundImage: `url('${bgUrl}')` }} 
            className="desktop h-screen w-screen relative bg-cover bg-center bg-no-repeat overflow-hidden"
        >
            {glassSettings?.enabled && (
                <div style={{
                    backdropFilter: `blur(${glassSettings.blurValue || 0}px)`,
                    WebkitBackdropFilter: `blur(${glassSettings.blurValue || 0}px)`
                }} className="glassmorph absolute inset-0 z-0"></div>
            )}

            <div className="absolute inset-0 z-10 bg">
                <NotificationManager />
                <TopRightDate />

                {APP_CONFIG.map((app) => {
                    if (!apps?.[app.id]?.isOpen) return null;

                    const AppContent = (
                        <Suspense fallback={null}>
                            <app.Component />
                        </Suspense>
                    );

                    return (
                        <DraggableWindow
                            key={app.id}
                            Appid={app.id}
                            title={app.title}
                            minWidth={app.minW}
                            minHeight={app.minH}
                            defaultSize={{ width: app.defW, height: app.defH }}
                            defaultpos={app.posX !== undefined ? { x: app.posX, y: app.posY } : undefined}
                            isResizable={app.isResizable}
                        >
                            {app.id === 'map' ? (
                                <ErrorBoundary FallbackComponent={MapCrashFallback} onReset={() => console.log("REBOOTING MAP SYSTEM...")}>
                                    {AppContent}
                                </ErrorBoundary>
                            ) : (
                                AppContent
                            )}
                        </DraggableWindow>
                    );
                })}

                <Dock />
            </div>
        </div>
    );
};