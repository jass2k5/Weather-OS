import { useEffect, useState } from "react";
import { useRef } from "react";
import { useOsStore } from "../store/useOsStore";
import gsap from "gsap";
import axios from "axios";
import { runAct1 } from "../../Animation/stage1";
export const BootSequence = () => {
    const hasStarted = useRef(false);
    const firsth1Ref = useRef(null);
    const secondh1Ref = useRef(null);
    const bgClr = useOsStore((state) => state.systemBg);
    useEffect(() => {
        if (hasStarted.current) return;
        hasStarted.current = true;

        runAct1(firsth1Ref, secondh1Ref, () => {
            runAct2(inputContainerRef, inputRef, enterMsgRef, () => {
                console.log('nothing for now')
            })
        })
    })
    return (
        <div className={` bootContainer h-full  w-full relative bg-no-repeat bg-center bg-cover ${bgClr}`}>
            <div className="nameCapsule">
                <i className="ri-circle-fill animate-pulse"></i>
                <span> Weather Os</span>
            </div>
            <div className="glassmorph "></div>
            <div className="textContainer absolute flex flex-col items-center jus">
                <h1 ref={firsth1Ref} >A quiet interface for high-</h1>
                <h1 ref={secondh1Ref} >fidelity orbital data.</h1>
                <p>An event-driven workspace that turns live geolocation and atmospheric streams into a calm, zero-bloat surface — synchronized with your local sky.</p>

            </div>
            <div className="Jass">
                <p>made by <span>jass</span></p>
                <span>System_VR: 1.0.0</span>
            </div>
          <div className="bottomLeftInfo">
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
                    <span className="text-[#ff5500] font-bold">[01]</span>
                    <span>Spatial Node: Rendering interactive map interface</span>
                </li>

                <li className="">
                    <span className="text-[#ff5500] font-bold">[02]</span>
                    <span>Telemetry: Fetching live atmospheric conditions</span>
                </li>

                <li className="">
                    <span className="text-[#ff5500] font-bold">[03]</span>
                    <span>Temporal Sync: Calibrating local system clock</span>
                </li>

                <li className="">
                    <span className="text-[#ff5500] font-bold">[04]</span>
                    <span>Viewport: Mounting glassmorphic workspace</span>
                </li>

            </ul>
          </div>
        </div>
    )
} 