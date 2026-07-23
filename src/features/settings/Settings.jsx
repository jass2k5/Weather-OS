import { useEffect, useState, useRef } from "react";
import { useOsStore } from "../../shared/store/useOsStore";
import { SystemSettings } from "./system/System";
export const Settings = () => {
    const focusApp = useOsStore((state) => state.focusApp);
    const windowOrder = useOsStore((state) => state.windowOrder);
    const zIndex = 15 + windowOrder.indexOf('settings');
    const [active, setActive] = useState('System');
    const options = [
        {id:"System",icon:<i className="ri-window-line"></i>},
        { id: "Maps", icon: <i className="ri-road-map-line"></i> },
        { id: "Clock", icon: <i className="ri-time-line"></i> },
        { id: "Notification", icon: <i className="ri-notification-line"></i> },
        { id: "Widgets", icon: <i className="ri-function-line"></i> }
    ]

    ///dummy function
    const MapSettings = () => <div className="text-white p-6">Map Settings Content Here...</div>;
    const ClockSettings = () => <div className="text-white p-6">Clock Settings Content Here...</div>;
    const NotificationSettings = () => <div className="text-white p-6">Notification Settings Content...</div>;
    const WidgetSettings = () => <div className="text-white p-6">Widget Settings Content Here...</div>;

    const renderContent = () => {
        switch (active) {
            case "Maps": return <MapSettings/>;
            case "Clock": return <ClockSettings/>;
            case "Notification": return <NotificationSettings/>;
            case "Widgets": return <WidgetSettings/>;
            case "System": return <SystemSettings/>
            default: return <SystemSettings/>;
        }
    }

    return (
        <div style={{zIndex:zIndex}} className="settings absolute inset-0 bg-black ">
            <aside>
                <span className="personal">Personalization</span>
                <div className="navigators">
                    {options.map((option, index) => (
                        <div key={option.id}
                        onClick={()=>{
                            setActive(option.id);
                        }}
                         className={`option flex ${active === option.id?"bg-[#ffffffc3] text-black/70! rounded-[0.4rem]":"bg-none"}`}>
                            {option.icon}
                            <span >{option.id}</span>
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
