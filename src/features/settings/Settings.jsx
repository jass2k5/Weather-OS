import { useState } from "react";
import { useOsStore } from "../../shared/store/useOsStore";
import { SystemSettings } from "./system/System";
import { MapSet } from "./mapsetting/MapSettings";
import { ClockSetting } from "./clocksetting/ClockSetting";
import { NotifySet } from "./notificationsetting/NotificationSet";

const options = [
    { id: "System", icon: <i className="ri-window-line"></i> },
    { id: "Maps", icon: <i className="ri-road-map-line"></i> },
    { id: "Clock", icon: <i className="ri-time-line"></i> },
    { id: "Notification", icon: <i className="ri-notification-line"></i> },
]

export const Settings = () => {
    const [active, setActive] = useState('System');

    const renderContent = () => {
        switch (active) {
            case "Maps": return <MapSet/>;
            case "Clock": return <ClockSetting/>;
            case "Notification": return <NotifySet/>;
            case "System": return <SystemSettings/>
            default: return <SystemSettings/>;
        }
    }

    return (
        <div className="settings absolute inset-0 bg-[var(--window-bg)] text-[var(--text-clr)] transition-colors duration-300">
            <aside>
                <span className="personal text-[var(--header-text)] mb-2 block">Personalization</span>
                
                <div className="navigators">
                    {options.map((option) => (
                        <div 
                            key={option.id}
                            onClick={() => {
                                setActive(option.id);
                            }}
                            className={`option flex items-center gap-2 p-2 cursor-pointer transition-colors ${
                                active === option.id 
                                    ? "bg-[#ffffffc3] text-black/70! rounded-[0.4rem]" 
                                    : "bg-transparent text-[var(--header-text)] hover:bg-[var(--border-clr)] rounded-[0.4rem]"
                            }`}
                        >
                            {option.icon}
                            <span>{option.id}</span>
                        </div>
                    ))}
                </div>
            </aside>
            <section className="Right h-full overflow-y-auto scrollbar-none ">
                {renderContent()}
            </section>
        </div>
    )
}