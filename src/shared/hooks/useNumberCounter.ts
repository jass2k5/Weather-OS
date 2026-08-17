import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface NumberCounter{
   targetValue?: number;
   duration?:number;
}
export const useNumberCounter = ({targetValue,duration =0.6}:NumberCounter ={}):number => {
    const [displayValue, setDisplayValue] = useState(0);

    const counterRef = useRef<{ val: number }>({ val: 0 });

    useEffect(() => {

        if (targetValue === undefined || targetValue === null || isNaN(targetValue)) return;

        const tween = gsap.to(counterRef.current, {
            val: targetValue,
            duration: duration,
            ease: "power2.out", 
            onUpdate: () => {
            
                setDisplayValue(Math.round(counterRef.current.val));
            }
        });
        return ()=> {tween.kill(); }
    }, [targetValue, duration]);

    return displayValue;
};  