import weather from '../assets/ios-weather.svg'
import map from '../assets/map.png'
import clock from '../assets/apple-clock.svg'
import widgets from '../assets/widgets.png'
import notification from '../assets/notification.png'
import settings from '../assets/apple-settings.svg'
import { useOsStore } from '../store/useOsStore'

export const Dock = () => {
    const apps = useOsStore((state) => state.apps);
    const closeApp = useOsStore((state) => state.closeApp);
    const openApp = useOsStore((state) => state.openApp);
    const startCloseApp = useOsStore((state)=>state.startCloseApp);
    return (
        <div className="Dock">
            <div onClick={()=>{
                
                if(apps?.map?.isOpen){
                    startCloseApp();
                }else{
                    openApp("map");
                }
            }} className='map icon'>
                <img className='icons' src={map} alt="mapicon" />

            </div>
            <div className='weather icon'>
                <img className='icons' src={weather} alt="weathericon" />
            </div>
            <div className='clock icon'>
                <img className='icons' src={clock} alt="clockicon" />
            </div>
            <div className='widget icon'>
                <img className='icons' src={widgets} alt="widgeticon" />
            </div>
            <div className='notification icon'>
                <img className='icons' src={notification} alt="notificationicon" />
            </div>
            <div className='settings icon'>
                <img className='icons' src={settings} alt="settingsicon" />
            </div>

        </div>
    )
}