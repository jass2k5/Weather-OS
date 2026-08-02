import { useOsStore } from "../store/useOsStore"
import { useEffect } from "react"

const SHORTCUTS = {
    "1": "map",
    "3": "clock",
    "4": "contact",
    "5": "notification",
    "6": "settings"
};

export const useKeys = () => {
    const apps = useOsStore((state) => state.apps);
    const closeApp = useOsStore((state) => state.closeApp);
    const openApp = useOsStore((state) => state.openApp);
    const focusApp = useOsStore((state) => state.focusApp);

    useEffect(() => {
        const handleOpen = (e) => {
            if (e.altKey && SHORTCUTS[e.key]) {
                e.preventDefault();
                const appName = SHORTCUTS[e.key];

                if (apps[appName]?.isOpen) {
                    closeApp(SHORTCUTS[e.key]);
                } else {
                    openApp(SHORTCUTS[e.key]);
                    focusApp(SHORTCUTS[e.key]);
                }

            }
        }

        window.addEventListener("keydown", handleOpen);
        return () => {
            window.removeEventListener("keydown", handleOpen);
        }
    }, [apps,focusApp,openApp,closeApp]);

}