import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import sunGif from "../../assets/sunGif.gif";
import batGif from "../../assets/batGif.svg";
import { useOsStore } from "../../store/useOsStore";
export const MouseFollower = () => {
const cursorRef = useRef(null);
const isDay = useOsStore((state)=> state.isDay);
const isScrollHovered = useOsStore((state)=>state.isScrollHovered);

// useEffect(()=>{
//  let timer;
// if(isScrollHovered){
//    timer = setTimeout(()=>{
//        setIsScrollHovered(false);
//  },4000)
// }

// return ()=> clearTimeout(timer);

// })

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
 <div ref={cursorRef} className="cursorFollower pointer-events-none fixed top-0 left-0 z-[9999]">
            
            {!isScrollHovered && (
                <>
                    {isDay && <img src={sunGif} alt="mouseFollower" className="cursorImage" />}
                    {!isDay && <img src={batGif} alt="mouseFollower" className="cursorImage" />}
                </>
            )}
            {isScrollHovered && (
                <div className="scrollDown h-24 w-24 flex flex-col justify-center items-center  ">
                <i className="ri-scroll-to-bottom-fill text-white text-2xl"></i>
                 {/* <span className="text-black text-[13px] capitalize font-semibold font-[Lora]">scroll down</span> */}
                </div>
            )}
            
        </div>
   )
}