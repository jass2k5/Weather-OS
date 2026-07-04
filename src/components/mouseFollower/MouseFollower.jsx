import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import sunGif from "../../assets/sunGif.gif";
import batGif from "../../assets/batGif.svg";
import { useOsStore } from "../../store/useOsStore";
export const MouseFollower = () => {
const cursorRef = useRef(null);
const isDay = useOsStore((state)=> state.isDay);

   useGSAP(()=>{

    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3" });

     const handleMouseMove = (e)=>{
        
        xTo(e.clientX);
        yTo(e.clientY);
    
    }

    window.addEventListener("mousemove",handleMouseMove);

    return ()=> {
        window.removeEventListener("mousemove",handleMouseMove);
    }

    
   },{dependencies:[]});

   return(
    <div ref={cursorRef} className="cursorFollower ">
      {isDay && <img src={sunGif} alt="mouseFollower " className="cursorImage" />}
      {!isDay && <img src={batGif} alt="mouseFollower " className="cursorImage" />}
    </div>
   )
}