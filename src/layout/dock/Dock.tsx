import weather from '../../shared/assets/ios-weather.svg'
import map from '../../shared/assets/map.webp'
import clock from '../../shared/assets/apple-clock.svg'
import contact from '../../shared/assets/contact.webp'
import notification from '../../shared/assets/notification.webp'
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
                shortCut={"Alt + 1"}

            />

            <DockIcon
                iconsource={weather}
                appName={"weather"}
                isOpen={apps?.weather?.isOpen}
                openApp={openApp}
                closeApp={closeApp}
                Class={"weather"}
                shortCut={"Alt + 2"}
            />

            <DockIcon
                iconsource={clock}
                appName={"clock"}
                isOpen={apps?.clock?.isOpen}
                openApp={openApp}
                closeApp={closeApp}
                Class={"clock"}
                shortCut={"Alt + 3"}
            />
            <DockIcon
                iconsource={contact}
                appName={"contact"}
                isOpen={apps?.contact?.isOpen}
                openApp={openApp}
                closeApp={closeApp}
                Class={"contact"}
                shortCut={"Alt + 4"}
            />
            <DockIcon
                iconsource={notification}
                appName={"notification"}
                isOpen={apps?.notification?.isOpen}
                openApp={openApp}
                closeApp={closeApp}
                Class={"notification"}
                shortCut={"Alt + 5"}
            />
            <DockIcon
                iconsource={settings}
                appName={"settings"}
                isOpen={apps?.settings?.isOpen}
                openApp={openApp}
                closeApp={closeApp}
                Class={"setting"}
                shortCut={"Alt + 6"}
            />
        </div>
    )
}