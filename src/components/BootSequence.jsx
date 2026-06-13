import { useEffect,useState } from "react";
import { useRef } from "react";
import { useOsStore } from "../store/useOsStore";
import gsap from "gsap";
import axios from "axios";
import { runAct1 } from "../../Animation/stage1";
export const BootSequence = ()=>{
    const hasStarted = useRef(false);
    const jassRef = useRef(null);
    const  bgClr = useOsStore((state) => state.systemBg);
    useEffect(()=>{
        if(hasStarted.current) return;
        hasStarted.current = true;

        runAct1(jassRef,()=>{
            runAct2(inputContainerRef,inputRef,enterMsgRef,()=>{
                console.log('nothing for now')
            })
        })
    })
    return(
        <div className={` bootContainer h-full  w-full relative bg-no-repeat bg-center bg-cover ${bgClr}`}>
            <div className="glassmorph "></div>
            <h1 ref = {jassRef} className=" h-[40vh] w-full flex items-center justify-center select-none text-[10vw] absolute top-0 left-[50%] translate-x-[-50%] uppercase">JASS</h1>
        </div>
    )
} 