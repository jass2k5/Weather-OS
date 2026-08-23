import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import sunGif from "../../assets/sunGif.gif";
import batGif from "../../assets/batGif.svg";
import { useOsStore } from "../../store/useOsStore";

export const MouseFollower = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const isDay = useOsStore((state)=> state.isDay);
    const isScrollHovered = useOsStore((state)=>state.isScrollHovered);
    const mouseFollower = useOsStore((state)=>state.mouseFollower);
    const isGithubHovered = useOsStore((state)=>state.isGithubHovered);
    const githubText = useOsStore((state)=>state.githubText);
    
    const mainCursorRef = useRef<HTMLDivElement>(null);
    const githubCursorRef = useRef<HTMLDivElement>(null);

    useGSAP(()=>{
        const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3" });

        const handleMouseMove = (e:MouseEvent)=>{
            xTo(e.clientX+10);
            yTo(e.clientY+20);
        }

        window.addEventListener("mousemove", handleMouseMove);

        return ()=> {
            window.removeEventListener("mousemove", handleMouseMove);
        }
    }, { dependencies: [mouseFollower] });

    useGSAP(() => {
        if (isGithubHovered) {
            gsap.to(mainCursorRef.current, { scale: 0, opacity: 0, duration: 0.2,overwrite: true });
            gsap.to(githubCursorRef.current, { scale: 1, duration: 0.8, ease: "back.out(1.7)",overwrite: true });
        } else {
            gsap.to(githubCursorRef.current, { scale: 0, duration: 0.3, ease: "power3.inOut",overwrite: true });
            gsap.to(mainCursorRef.current, { scale: 1, opacity: 1, duration: 0.2, delay: 0.1,overwrite: true });
        }
    }, { dependencies: [isGithubHovered] }); 

    if(!mouseFollower?.enabled) return null;

    return(
       
        <div ref={cursorRef} className="cursorFollower select-none pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
            
         
            <div ref={mainCursorRef} className="absolute flex items-center justify-center">
                {!isScrollHovered && (
                    <>
                        {isDay && <img src={sunGif} alt="mouseFollower" className="cursorImage" />}
                        {!isDay && <img src={batGif} alt="mouseFollower" className="cursorImage" />}
                    </>
                )}
                {isScrollHovered && (
                    <div className="scrollDown h-24 w-24 flex flex-col justify-center items-center">
                        <i className="ri-scroll-to-bottom-fill text-white text-2xl"></i>
                    </div>
                )}
            </div>

           
            <div 
                ref={githubCursorRef} 
                className="absolute w-24 h-24 bg-black rounded-full flex items-center justify-center gap-1 text-white text-sm font-bold scale-0"
            >
         
                <span className="italic font-serif tracking-widest capitalize">{githubText}</span>
                <i className="text-[16px] ri-arrow-right-up-line"></i>
            </div>
            
        </div>
    )

}