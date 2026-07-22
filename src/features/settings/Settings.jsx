import { useEffect, useState, useRef } from "react";
import { useOsStore } from "../../shared/store/useOsStore";


export const Settings = () => {
    const focusApp = useOsStore((state) => state.focusApp);
    const windowOrder = useOsStore((state) => state.windowOrder);
    const zIndex = 15 + windowOrder.indexOf('settings');
    const [active, setActive] = useState('Maps');
    const options = [
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
            default: return <MapSettings />;
        }
    }

    return (
        <div className="settings absolute inset-0 bg-black p-6">
            <aside>
                <span className="personal">Personalization</span>
                <div className="navigators">
                    {options.map((option, index) => (
                        <div key={option.id}
                        onClick={()=>{
                            setActive(option.id);
                        }}
                         className="option flex">
                            {option.icon}
                            <span>{option.id}</span>
                        </div>
                    ))}
                </div>
            </aside>
            <section className="Right">
                {renderContent()}
            </section>
        </div>
    )
}