import { useEffect,useState } from "react";
import { useOsStore } from "../store/useOsStore";

export const useConnectivity = ()=>{
    const addNotification = useOsStore((state) => state.addNotification);

    useEffect(()=>{
        const handleOnline = ()=> {addNotification("Connection Gained!","net")}
        const handleOffline = ()=> {addNotification("Connection Lost!","nonet")}

        window.addEventListener("offline",handleOffline);
        window.addEventListener("online",handleOnline);

        return ()=>{
            window.removeEventListener("offline",handleOffline);
            window.removeEventListener("online",handleOnline);
        }
    },[addNotification])

    return null;
}