import weather from '../assets/ios-weather.svg'
import map from '../assets/map.png'
import clock from '../assets/apple-clock.svg'
import widgets from '../assets/widgets.png'
import notification from '../assets/notification.png'
import settings from '../assets/apple-settings.svg'
import { useOsStore } from '../store/useOsStore'
import { useState } from 'react'
import { DockIcon } from './DockIcon'

export const Dock = () => {
    const apps = useOsStore((state) => state.apps);
    const closeApp = useOsStore((state) => state.closeApp);
    const openApp = useOsStore((state) => state.openApp);
    const startCloseApp = useOsStore((state) => state.startCloseApp);
    const [menu, setMenu] = useState(false);

    return (
        <div className="Dock relative">
            <DockIcon
                iconsource={map}
                appName={"map"}
                itsTerminal={"terminalMap"}
                isOpen={apps?.map?.isOpen}
                openApp={openApp}
                startCloseApp={startCloseApp}
                closeApp={closeApp}
                Class={"map"}

            />

            <DockIcon
                iconsource={weather}
                appName={"weather"}
                itsTerminal={"terminalWeather"}
                isOpen={false}
                openApp={openApp}
                startCloseApp={startCloseApp}
                closeApp={closeApp}
                Class={"weather"}
            />

            <DockIcon
                iconsource={clock}
                appName={"clock"}
                itsTerminal={"terminalClock"}
                isOpen={apps?.clock?.isOpen}
                openApp={openApp}
                startCloseApp={startCloseApp}
                closeApp={closeApp}
                Class={"clock"}
            />
            <DockIcon
                iconsource={widgets}
                appName={"widgets"}
                itsTerminal={"none"}
                isOpen={false}
                openApp={openApp}
                startCloseApp={startCloseApp}
                closeApp={closeApp}
                Class={"widget"}
            />
            <DockIcon
                iconsource={notification}
                appName={"notification"}
                itsTerminal={"terminalNotification"}
                isOpen={false}
                openApp={openApp}
                startCloseApp={startCloseApp}
                closeApp={closeApp}
                Class={"notification"}
            />
            <DockIcon
                iconsource={settings}
                appName={"settings"}
                itsTerminal={"terminalSettings"}
                isOpen={false}
                openApp={openApp}
                startCloseApp={startCloseApp}
                closeApp={closeApp}
                Class={"settings"}
            />
        </div>
    )
}