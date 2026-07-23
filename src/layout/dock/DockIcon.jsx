import { useState, useEffect } from "react";
import { useOsStore } from "../../shared/store/useOsStore";

export const DockIcon = ({ iconsource, appName, itsTerminal, isOpen, openApp, Class, closeApp }) => {
    const [Menu, setMenu] = useState(false);
    const focusApp = useOsStore((state) => state.focusApp);

    // Click Outside listener: Kahin aur click karne par menu band ho jayega
    useEffect(() => {
        const closeMenu = () => setMenu(false);
        if (Menu) window.addEventListener('click', closeMenu);
        return () => window.removeEventListener('click', closeMenu);
    }, [Menu]);

    return (
        // 1. Parent Wrapper: Ispe koi hover effect nahi hoga, sirf positioning ke liye hai
        <div className="relative flex flex-col items-center justify-center gap-1.5">

           
            {Menu && (
                <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="rightclick absolute -top-42 bg-[#1a1a1a]/90 backdrop-blur-md border border-white/10 p-2 rounded-xl flex flex-col gap-1 z-50 min-w-[130px] shadow-2xl cursor-default"
                >
                    <span className="text-white/40 text-[16px] text-left ml-2.5 uppercase tracking-wider mb-1 pointer-events-none">
                        {appName}
                    </span>

                    <div className="h-[1px] w-full bg-white/10 my-0.5"></div>

                    {appName !== "notification" && appName !== "settings" && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                openApp(itsTerminal);
                                setMenu(false);
                            }}
                            className="text-white/90 text-sm hover:bg-white/10 hover:text-white px-3 py-1.5 rounded-lg text-left transition-colors"
                        >
                            Terminal
                        </button>
                    )}

                    <div className="h-[1px] w-full bg-white/10 my-0.5"></div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (isOpen) closeApp(appName);
                            setMenu(false);
                        }}
                        className="text-red-400 text-sm hover:bg-red-500/20 px-3 py-1.5 rounded-lg text-left flex justify-between items-center transition-colors"
                    >
                        <span>Close</span>
                        <span className="font-bold text-lg leading-none mb-0.5">×</span>
                    </button>
                </div>
            )}

       
            <div 
                onClick={(e) => {
                    e.stopPropagation(); // Window click trigger na ho isliye
                    if (Menu) setMenu(false);
                    
                    if (!isOpen) {
                        openApp(appName);
                        focusApp(appName);
                    } else {
                        focusApp(appName);
                    }
                }}
                onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMenu(!Menu);
                }}
                className={`${Class} icon cursor-pointer flex items-center justify-center`}
            >
                <img className="icons" src={iconsource} alt="icon" />
            </div>

            {/* 4. Active Dot Indicator */}
            <i className={`ri-circle-fill text-[5px] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}></i>
        </div>
    );
}