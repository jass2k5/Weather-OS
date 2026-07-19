import { useRef } from "react";
import { useOsStore } from "../store/useOsStore";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);


const NotificationItem = ({ notif, index }) => {
    const toastRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(toastRef.current, 
            { x: 150, opacity: 0 }, 
            { x: 0, opacity: 1, duration: 0.5, ease: "power4.out" }
        )
        .to(toastRef.current, {
            x: 100,
            opacity: 0,
            duration: 0.4,
            ease: "power3.in",
            delay: 3.0 
        });

    }, []);

    return (
        <div 
            ref={toastRef}
            className="absolute bottom-[15%] right-[3%] w-full"
            style={{ zIndex: index }} 
        >
            <div className={`flyout-toast ${notif.type} w-72 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 shadow-2xl flex items-center gap-3 pointer-events-auto`}>
                <div className="icon">
                    {notif.type === 'success' && <i className="ri-checkbox-circle-fill text-green-400"></i>}
                    {notif.type === 'error' && <i className="ri-error-warning-fill text-red-400"></i>}
                    {notif.type === 'info' && <i className="ri-information-fill text-blue-400"></i>}
                    {notif.type === 'warning' && <i className="ri-alert-fill text-yellow-400"></i>}
                </div>
                
                <div className="content flex-1">
                    <p className="text-white text-sm font-medium">{notif.message}</p>
                    <p className="text-white/50 text-[10px] mt-0.5">{notif.timestamp}</p>
                </div>
            </div>
        </div>
    );
};


export const NotificationManager = () => {
    const activeNotifications = useOsStore((state) => state.activeNotifications);

    return (
        <div className="notification-container absolute bottom-[15%] right-[3%] z-[9999] pointer-events-none w-72">
            {activeNotifications.map((notif, index) => (
                <NotificationItem key={notif.id} notif={notif} index={index} />
            ))}
        </div>
    );
};