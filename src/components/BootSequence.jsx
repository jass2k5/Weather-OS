import { useState } from "react";
import { useRef } from "react";
import { useOsStore } from "../store/useOsStore";
import { RunAct1 } from "../Animation/Stage1";
import { RunAct2 } from "../Animation/Stage2";
import { RunAct3 } from "../Animation/Stage3";
export const BootSequence = () => {
    const firsth1Ref = useRef(null);
    const secondh1Ref = useRef(null);
    const bgClr = useOsStore((state) => state.systemBg);
    const dragBoxRef = useRef(null);
    const paraRef = useRef(null);
    const [visible] = useState(0);
    const [current,setCurrent] = useState("Stage1");
  
    return (
        <div className={` bootContainer h-full  w-full relative bg-no-repeat bg-center bg-cover ${bgClr}`}>
           
            <div className="nameCapsule">
                <i className="ri-circle-fill animate-pulse"></i>
                <span> Weather Os</span>
            </div>
            <div className="glassmorph "></div>
            <div className="textContainer absolute flex flex-col items-center jus">
                <h1 ref={firsth1Ref} >A quiet interface for <span className="italic">high-</span></h1>
                <h1 ref={secondh1Ref} ><span className="italic">fidelity</span>orbital data.</h1>
                <p ref={paraRef}>An event-driven workspace that turns live geolocation and atmospheric streams into a calm, zero-bloat surface — synchronized with your local sky.</p>

            </div>
            <div className="Jass">
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

                <RunAct3 onComplete={() => console.log("RUN3 complete")}/>
            )}
           
        </div>
    )
} 
