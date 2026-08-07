import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export const useNumberCounter = (targetValue, duration = 0.6) => {
    const [displayValue, setDisplayValue] = useState(0);

    const counterRef = useRef({ val: 0 });

    useEffect(() => {

        if (targetValue === undefined || targetValue === null || isNaN(targetValue)) return;

        gsap.to(counterRef.current, {
            val: targetValue,
            duration: duration,
            ease: "power2.out", 
            onUpdate: () => {
            
                setDisplayValue(Math.round(counterRef.current.val));
            }
        });
    }, [targetValue, duration]);

    return displayValue;
};  