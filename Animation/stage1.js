import { useRef,useEffect } from "react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import { BootSequence } from "../src/components/BootSequence";

gsap.registerPlugin(SplitText);

export const runAct1 = (firsth1Ref,secondh1Ref,onComplete) =>{

    const split = SplitText.create(firsth1Ref.current,{
        type:"words",
    });
    const split2 = SplitText.create(secondh1Ref.current, {
    type: "words",
});
    const char = split.words;
    const char2 = split2.words;

    console.log(char.length);
    let high = char.at(-1);
    high.style.fontStyle = "italic";
    let fidelity = char2.at(0);
    fidelity.style.fontStyle = "italic";

}