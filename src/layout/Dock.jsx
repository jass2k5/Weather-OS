import weather from '../assets/ios-weather.svg'
import map from '../assets/map.png'
import clock from '../assets/apple-clock.svg'
import widgets from '../assets/widgets.png'
import notification from '../assets/notification.png'
import settings from '../assets/apple-settings.svg'
import { useOsStore } from '../store/useOsStore'
import { useState } from 'react'

export const Dock = () => {
    const apps = useOsStore((state) => state.apps);
    const closeApp = useOsStore((state) => state.closeApp);
    const openApp = useOsStore((state) => state.openApp);
    const startCloseApp = useOsStore((state) => state.startCloseApp);
    const [menu, setMenu] = useState(false);

    return (
        <div className="Dock">
            <div onClick={() => {

                if (apps?.map?.isOpen) {
                    startCloseApp();
                } else {
                    openApp("map");
                }
            }} className='map icon flex items-center justify-center gap-1.5 flex-col'>
                <img className='icons' src={map} alt="mapicon" />
                <i className={`ri-circle-fill text-[5px]  ${apps?.map?.isOpen ? "opacity-100" : "opacity-0"}`}></i>

            </div>
            <div className='weather icon flex items-center justify-center gap-1 flex-col'>
                <img className='icons' src={weather} alt="weathericon" />
                <i className={`ri-circle-fill text-[5px] opacity-0`}></i>

            </div>
            <div className='clock icon flex items-center justify-center gap-1 flex-col'>
                <img className='icons' src={clock} alt="clockicon" />
                <i className={`ri-circle-fill text-[5px] opacity-0`}></i>
            </div>
            <div className='widget icon flex items-center justify-center gap-1 flex-col'>
                <img className='icons' src={widgets} alt="widgeticon" />
                <i className={`ri-circle-fill text-[5px] opacity-0`}></i>
            </div>
            <div className='notification icon flex items-center justify-center gap-1 flex-col'>
                <img className='icons' src={notification} alt="notificationicon" />
                <i className={`ri-circle-fill text-[5px] opacity-0`}></i>
            </div>
            <div className='settings icon flex items-center justify-center gap-1 flex-col'>
                <img className='icons' src={settings} alt="settingsicon" />
                <i className={`ri-circle-fill text-[5px] opacity-0`}></i>
            </div>

        </div>
    )
}