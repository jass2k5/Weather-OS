import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable, useGSAP);

export const RunAct2 = ({ dragBoxRef, onComplete }) => {
    
    useGSAP((self)=>{
        const container = dragBoxRef.current;
        if(!container) return;

        const to = gsap.timeline({
            delay:0.8,
              onComplete:()=>{
                    onComplete();
                }
        })
        
        to.fromTo(".left",{
            autoAlpha:0,
        },{
            stagger:{
                each:0.2,
                from:"start"
            },
            duration:0.5,
            autoAlpha:1,
            ease:"power3.inOut"
        })

        to.fromTo(".right",{
            autoAlpha:0,
            delay:0.5,
            y:40
        },{
            duration:0.6,
            stagger:{
                each:0.3,
                from:"start"
            },
            autoAlpha:1,
            ease:"power3.in",
            y:0
        });
        to.fromTo(".indicatorText",{
            autoAlpha:0,
            x:-60,
        },{
            duration:1,
            autoAlpha:1,
            stagger:{
                each:0.5,
                from:"end"
            },
            x:0,
            ease:"power3.out"
        })
          to.to(".dragIndicator",{
                autoAlpha:0,
                duration:0.4,
                delay:4,
            })
        self.ignore(()=>{
            const t1 = gsap.timeline();

            t1.fromTo(container,{
                scaleY:0,
                opacity:0,
                duration:1.2,
                transformOrigin:"top center",
                
            },{
                scaleY:1,
                opacity:1,
                ease: "power3.out"
            })

            Draggable.create(container,{
                type:"x,y",
                bounds:window,
                edgeResistance:0.65,
                cursor:"grab",
                activeCursor:"grabbing",
                onDragStart: ()=>{
                  const d = document.querySelector(".dragIndicator")
                  if(d){
                       gsap.to(".dragIndicator",{
                        autoAlpha:0,
                        duration:0.2,
                    })
                  }
                },
                onDragEnd: ()=>{
                    console.log("drag end");
                }

            })
          

        });
    },{scope:dragBoxRef,dependencies:[]})
    return(
        <div className="dragIndicator h-auto w-auto absolute bottom-[-20%]   left-[90%] pointer-events-none ">
            <div className=" h-full w-full flex justify-center items-center gap-3">
                <span className=" indicatorText inline-block  text-[1rem] text-white  font-thin animate-ping"><i className="indicatorText ri-corner-down-right-line"></i></span>
                <span className=" indicatorText text-xl text-white font-medium italic whitespace-nowrap border-b-2 border-b-white">Hover Hold & Drag</span>
            </div>

        </div>
    )
}