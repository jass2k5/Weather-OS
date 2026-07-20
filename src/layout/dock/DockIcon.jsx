import { useState } from "react";
import { useOsStore } from "../../shared/store/useOsStore";
export const DockIcon = ({ iconsource, appName, itsTerminal, isOpen, openApp, Class, closeApp }) => {
    const [Menu, setMenu] = useState(false);

    const focusApp = useOsStore((state) => state.focusApp);

    return (

        <div onClick={() => {
            if (Menu) {
                setMenu(!Menu)
            }

            if (!isOpen) {
                openApp(appName);
                focusApp(appName);
            }
             else {
                focusApp(appName);
            }

           
        }}
            onContextMenu={(e) => {
                e.preventDefault();
                setMenu(!Menu);
            }}
            className={`${Class} icon flex items-center justify-center gap-1.5 flex-col`}>
            {Menu && (
                <div onClick={(e) => {
                    e.stopPropagation();
                }} className=" rightclick absolute -top-38 bg-[#1a1a1a]/90 backdrop-blur-md border border-white/10 p-2 rounded-xl flex flex-col gap-1 z-50 min-w-[130px] shadow-2xl cursor-default">
                    <span className="text-white/40 text-[16px] text-left ml-2.5 uppercase tracking-wider mb-1 pointer-events-none">
                        {appName}
                    </span>

                    <div className="h-[1px] w-full bg-white/10 my-0.5"></div>

                   {appName!=="notification" &&  <button
                        onClick={(e) => {
                            e.stopPropagation();
                            openApp(itsTerminal);
                            setMenu(false);
                        }}
                        className="text-white/90 text-sm hover:bg-white/10 hover:text-white px-3 py-1.5 rounded-lg text-left transition-colors"
                    >
                        Terminal
                    </button>}

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

            <img className='icons' src={iconsource} alt="icon" />
            <i className={`ri-circle-fill text-[5px]  ${isOpen ? "opacity-100" : "opacity-0"}`}></i>

        </div>

    )
}