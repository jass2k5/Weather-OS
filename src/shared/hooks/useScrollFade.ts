import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFadeOptions {
    x?:number;
    y?:number;
    origin?:string;
    delay?:number;
    duration?:number;
    ease?:string;
    start?:string;
}

export const useScrollFade = (option: ScrollFadeOptions = {}): React.RefObject<HTMLDivElement | null> => {
    const elementRef = useRef<HTMLDivElement|null>(null);
    
    useGSAP(() => {
        if (!elementRef.current) return;

        
        const customScroller = document.querySelector('.custom-scrollbar');

        gsap.from(elementRef.current, {
            x: option.x ?? 0,
            y: option.y ?? 50,
            opacity: 0,
            transformOrigin:option.origin??"",
            delay:option.delay??0,
            duration: option.duration ?? 1,
            ease: option.ease ?? 'power3.out',
            scrollTrigger: {
                trigger: elementRef.current,
                scroller: customScroller || window, // Safe fallback!
                start: option.start ?? 'top 95%',
                toggleActions: 'play none none reverse',
                // once: true,
            }
        });
    }, { 
        scope: elementRef,
        
    });

    return elementRef;
}