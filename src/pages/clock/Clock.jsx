import { useOsStore } from "../../store/useOsStore";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export const Clock = () => {
    const windowOrder = useOsStore((state) => state.windowOrder);
    const focusApp = useOsStore((state) => state.focusApp);
    const myZIndex = 10 + windowOrder.indexOf('clock');
    const searchHistory = useOsStore((state) => state.searchHistory);
    const allSearches = searchHistory;

    return (
        <div
            style={{ zIndex: myZIndex }}
            className="clock  flex items-center justify-center absolute top-0 left-0 bg-black h-full w-full">
            {allSearches.map((el,index)=>{
               
                    <h1 className="text-white text-8xl">{el.city}</h1>
                
            })}
        </div>
    )

}