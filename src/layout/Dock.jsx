import weather from '../assets/ios-weather.svg'
import map from '../assets/map.png'
import clock from '../assets/apple-clock.svg'
import widgets from '../assets/widgets.png'
import notification from '../assets/notification.png'
import settings from '../assets/apple-settings.svg'
import { useOsStore } from '../shared/store/useOsStore'
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
                itsTerminal={"terminalMap"}
                isOpen={apps?.map?.isOpen}
                openApp={openApp}
                closeApp={closeApp}
                Class={"map"}

            />

            <DockIcon
                iconsource={weather}
                appName={"weather"}
                itsTerminal={"terminalWeather"}
                isOpen={false}
                openApp={openApp}
                closeApp={closeApp}
                Class={"weather"}
            />

            <DockIcon
                iconsource={clock}
                appName={"clock"}
                itsTerminal={"terminalClock"}
                isOpen={apps?.clock?.isOpen}
                openApp={openApp}
                closeApp={closeApp}
                Class={"clock"}
            />
            <DockIcon
                iconsource={widgets}
                appName={"widgets"}
                itsTerminal={"none"}
                isOpen={false}
                openApp={openApp}
                closeApp={closeApp}
                Class={"widget"}
            />
            <DockIcon
                iconsource={notification}
                appName={"notification"}
                itsTerminal={"terminalNotification"}
                isOpen={apps?.notification?.isOpen}
                openApp={openApp}
                closeApp={closeApp}
                Class={"notification"}
            />
            <DockIcon
                iconsource={settings}
                appName={"settings"}
                itsTerminal={"terminalSettings"}
                isOpen={false}
                openApp={openApp}
                closeApp={closeApp}
                Class={"settings"}
            />
        </div>
    )
}