import { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useOsStore } from "../../shared/store/useOsStore";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable, useGSAP);

export const RunAct4 = ({ dragBoxRef, firsth1Ref, secondh1Ref, paraRef, jassRef,logoRef,onComplete }) => {




    // const timeoutRef = useRef(null);
    const finishBoot = useOsStore(state => state.finishBoot);
    useEffect(() => {

        let draggable = Draggable.get(dragBoxRef.current);
        gsap.set(dragBoxRef.current, {
            display: "none"
        })
        if (draggable) {
            draggable.kill();
        }

    }, [])

    useGSAP(() => {
       const t1 = gsap.timeline({
        delay: 1,
        onComplete: () => {
            onComplete();
            finishBoot();
        }
    });

    t1.fromTo(".above", {
        scaleX: 0,
        transformOrigin: "left center" 
    }, {
        duration: 1,
        scaleX: 1,
        ease: "power3.inOut",
    });

    t1.fromTo(".below", {
        scaleX: 0,
        transformOrigin: "right center" 
    }, {
        duration: 1,
        scaleX: 1,
        ease: "power3.inOut",
         onComplete: () => {
            const refs = [firsth1Ref,secondh1Ref,paraRef,jassRef,logoRef];
            refs.forEach( ref =>{
                if(ref.current){
                    ref.current.style.display = "none";
                }
            })
        }
    },"<");
    
    t1.to(".above",{
        scaleX:0,
        transformOrigin:"right center",
        duration:1,
        ease:"power3.out"
    })
    t1.to(".below",{
        scaleX:0,
        duration:1,
        transformOrigin:"left center",
        ease:"power3.out"

    },"<")

    }, { dependencies: []})
    return (
        <div className="columncontainer bg-transparent h-full w-full absolute inset-0 flex flex-col justify-center items-center z-50">
            <div className="above"></div>
            <div className="below"></div>
        </div>
    )

}