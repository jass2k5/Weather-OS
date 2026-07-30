import weather from '../../shared/assets/ios-weather.svg'
import map from '../../shared/assets/map.png'
import clock from '../../shared/assets/apple-clock.svg'
import contact from '../../shared/assets/contact.png'
import notification from '../../shared/assets/notification.png'
import settings from '../../shared/assets/apple-settings.svg'
import { useOsStore } from '../../shared/store/useOsStore'
import { DockIcon } from './DockIcon'

export const Dock = () => {
    const apps = useOsStore((state) => state.apps);
    const closeApp = useOsStore((state) => state.closeApp);
    const openApp = useOsStore((state) => state.openApp);



    return (
        <div className="Dock relative">
            <DockIcon
                iconsource={map}
                appName={"map"}
                isOpen={apps?.map?.isOpen}
                openApp={openApp}
                closeApp={closeApp}
                Class={"map"}

            />

            <DockIcon
                iconsource={weather}
                appName={"weather"}
                isOpen={false}
                openApp={openApp}
                closeApp={closeApp}
                Class={"weather"}
            />

            <DockIcon
                iconsource={clock}
                appName={"clock"}
                isOpen={apps?.clock?.isOpen}
                openApp={openApp}
                closeApp={closeApp}
                Class={"clock"}
            />
            <DockIcon
                iconsource={contact}
                appName={"contact"}
                isOpen={apps?.contact?.isOpen}
                openApp={openApp}
                closeApp={closeApp}
                Class={"contact"}
            />
            <DockIcon
                iconsource={notification}
                appName={"notification"}
                isOpen={apps?.notification?.isOpen}
                openApp={openApp}
                closeApp={closeApp}
                Class={"notification"}
            />
            <DockIcon
                iconsource={settings}
                appName={"settings"}
                isOpen={apps?.settings?.isOpen}
                openApp={openApp}
                closeApp={closeApp}
                Class={"setting"}
            />
        </div>
    )
}