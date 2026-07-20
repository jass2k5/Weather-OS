import { useEffect, useState } from "react";
import { useRef } from "react";
import { useOsStore } from "../shared/store/useOsStore";
import { NotificationManager } from "../layout/NotificationFly";
import { RunAct1 } from "./animations/Stage1";
import { RunAct2 } from "./animations/Stage2";
import { RunAct3 } from "./animations/Stage3";
import { RunAct4 } from "./animations/Stage4";

export const BootSequence = () => {
    const firsth1Ref = useRef(null);
    const secondh1Ref = useRef(null);
    const bgClr = useOsStore((state) => state.systemBg);
    const dragBoxRef = useRef(null);
    const paraRef = useRef(null);
    const jassRef = useRef(null);
    const logoRef = useRef(null);
    const [visible] = useState(0);
    const [current,setCurrent] = useState("Stage1");
    const addNotification = useOsStore((state) => state.addNotification);
    useEffect(() => {
        addNotification("Welcome to weather Os", "success");
    }, []);
    return (
        <div className={` bootContainer h-full  w-full relative bg-no-repeat bg-center bg-cover overflow-hidden ${bgClr}`}>
           
            <div ref={logoRef} className="nameCapsule">
                <i className="ri-circle-fill animate-pulse"></i>
                <span> Weather Os</span>
            </div>
            <div className="glassmorph "></div>
            <NotificationManager/>
            <div className="textContainer absolute flex flex-col items-center jus">
                <h1 ref={firsth1Ref} >A quiet interface for <span className="italic">high-</span></h1>
                <h1 ref={secondh1Ref} ><span className="italic">fidelity</span>orbital data.</h1>
                <p ref={paraRef}>An event-driven workspace that turns live geolocation and atmospheric streams into a calm, zero-bloat surface — synchronized with your local sky.</p>

            </div>
            <div ref={jassRef} className="Jass">
                <p>made by <span>jass</span></p>
                <span>System_VR: 1.0.0</span>
            </div>
          <div ref={dragBoxRef}  className="bottomLeftInfo " style={{opacity:visible}}>
        
             <div className="envActive">
                    <span className="text-[0.7rem] text-white/50 font-mono tracking-[0.2em] uppercase">
                       ENVIRONMENTAL-UPLINK
                    </span>
                 
                    <span className="text-[0.7rem] text-green-400 font-mono animate-pulse flex items-center gap-2">
                        [ ACTIVE ]
                    </span>
                </div>
              <ul className="">

                <li className="">
                    <span className="left text-[#ff5500] font-bold">[01]</span>
                    <span className = "right">Spatial Node: Rendering interactive map interface</span>
                </li>

                <li className="">
                    <span className="left text-[#ff5500] font-bold">[02]</span>
                    <span className = "right">Telemetry: Fetching live atmospheric conditions</span>
                </li>
                <li className="">
                    <span className="left text-[#ff5500] font-bold">[03]</span>
                    <span className = "right">Temporal Sync: Calibrating local system clock</span>
                </li>

                <li className="">
                    <span className="left text-[#ff5500] font-bold">[04]</span>
                    <span className = "right">Viewport: Mounting glassmorphic workspace</span>
                </li>

            </ul>
                 {current === "Stage2" && (
                <RunAct2 dragBoxRef = {dragBoxRef} onComplete={()=>{
                    setCurrent("Stage3")
                }}/>
            )}
          </div>
           {current === "Stage1" && (
                <RunAct1 firsth1Ref={firsth1Ref} secondh1Ref={secondh1Ref} paraRef={paraRef} onComplete={()=>setCurrent("Stage2")}/>
            )}

            {current === "Stage3" && (

                <RunAct3 onComplete={() => setCurrent("Stage4")}/>
            )}
            {current === "Stage4" && 
            <RunAct4 
            dragBoxRef = {dragBoxRef}
            firsth1Ref = {firsth1Ref}
            secondh1Ref = {secondh1Ref}
            jassRef = {jassRef}
            paraRef = {paraRef}
            logoRef = {logoRef}
            onComplete = {()=>{    
                setCurrent("Stage5");
            }}/>
            }
           
           
        </div>
    )
} 
