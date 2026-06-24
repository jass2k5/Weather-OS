import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import sunGif from "../../assets/sunGif.gif";
export const MouseFollower = () => {
    const cursorRef = useRef(null);

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
        <img src={sunGif} alt="mouseFollower " className="cursorImage" />
    </div>
   )
}