import { useEffect, lazy, Suspense, useState, useRef } from 'react';
import { useQueryClient } from "@tanstack/react-query";
import { useOsStore } from "../shared/store/useOsStore";
import { DraggableWindow } from "../shared/components/DraggableWindow";
import { TopRightDate } from "../layout/date/TopRightDate";
import { Dock } from "../layout/dock/Dock";
import { NotificationManager } from "../layout/NotificationFly";
import { ErrorBoundary } from 'react-error-boundary';
import { MapCrashFallback } from "../features/map/ErrorBoundaryMap";
import { useSyncAllWeather } from "../shared/hooks/useSyncAllWeather";
import { useKeys } from '../shared/hooks/useKeys';
//assets
import keyword from '../shared/assets/keyword.png';
import alt from '../shared/assets/Alt.png'
import back from '../shared/assets/backbtn.png'
import one from '../shared/assets/1.png'
import two from '../shared/assets/2.png'
import three from '../shared/assets/3.png'
import four from '../shared/assets/4.png'
import five from '../shared/assets/5.png'
import six from '../shared/assets/6.png'
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

const shortCuts =[
    {app:"map",src:one},
    {app:"dashboard",src:two},
    {app:"clock",src:three},
    {app:"contact",src:four},
    {app:"notify",src:five},
    {app:"setting",src:six},
    {app:"closeAll",src:back}
]


export const Desktop = () => {
    const queryClient = useQueryClient();
    const [isOpen,setIsOpen] = useState(false);
    const shortCutRef = useRef(null);
    const bgUrl = useOsStore((state) => state.systemBg);
    const apps = useOsStore((state) => state.apps);
    const addNotification = useOsStore((state) => state.addNotification);
    const glassSettings = useOsStore((state) => state.glassSettings);
    
    useSyncAllWeather(); 
    useKeys();


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
        
        const handleOutsideClick = (e)=>{
            if(shortCutRef.current && !shortCutRef.current.contains(e.target)){
                setIsOpen(false);
            }
        }

        window.addEventListener("mousedown",handleOutsideClick)
        
        return () => {
            clearTimeout(timer);
            window.removeEventListener("mousedown",handleOutsideClick);
        } 
    }, [queryClient]);


    
    return (
        <div 
            style={{ backgroundImage: `url('${bgUrl}')` }} 
            className="desktop h-screen w-screen relative bg-cover bg-center bg-no-repeat overflow-hidden"
        >
           <div ref={shortCutRef} className='shortcut select-none  z-15 h-max w-max absolute right-[1%] bottom-[3%] p-2 flex flex-col justify-center items-center gap-5 pointer-events-none'>

            <div  className={`guide h-max w-max p-2 bg-white border border-white/60 rounded-2xl ${!isOpen?'opacity-0':'opacity-100'}`}>
             {shortCuts.map((short,index)=>(
                <div key={short.id} className='h-max w-max p-1 flex gap-2'>
                    <img className='h-8' src={alt} alt="alt"/>
                    <span className='text-xl text-black'>+</span>
                    <img className='h-8' src={short.src} alt="Number" />
                    <i className="ri-arrow-right-line text-black pt-1"></i>
                    <span className='text-black text-[1rem]'>Toggle {short.app}</span>
                </div>
             ))}
            </div>

             <button
              onClick={()=>{
                if(isOpen){
                    setIsOpen(false);
                }else{
                    setIsOpen(true);
                }
              }}
              className='pointer-events-auto cursor-pointer active:scale-[0.96]'> <img src={keyword} alt="keyword" /></button>
           </div>

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