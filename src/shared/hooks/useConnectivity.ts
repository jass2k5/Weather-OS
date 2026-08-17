import { useEffect } from "react";
import { useOsStore } from "../store/useOsStore";

export const useConnectivity = ():null =>{
    const addNotification = useOsStore((state) => state.addNotification);

    useEffect(()=>{
        const handleOnline = ():void => {addNotification("Connection Gained!","online")}
        const handleOffline = ():void => {addNotification("Connection Lost!","offline")}

        window.addEventListener("offline",handleOffline);
        window.addEventListener("online",handleOnline);

        return ()=>{
            window.removeEventListener("offline",handleOffline);
            window.removeEventListener("online",handleOnline);
        }
    },[addNotification])

    return null;
}