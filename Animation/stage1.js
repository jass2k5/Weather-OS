import { useRef,useEffect } from "react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import { BootSequence } from "../src/components/BootSequence";

gsap.registerPlugin(SplitText);

export const runAct1 = (jassRef,onComplete) =>{

    const split = SplitText.create(jassRef.current,{
        type:"chars",
    });
    const char = split.chars;
    

}