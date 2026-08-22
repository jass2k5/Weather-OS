import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, useGSAP);

export const RunAct1 = ({ firsth1Ref, secondh1Ref, paraRef, onComplete }) => {

    useGSAP((self) => {
        if (!firsth1Ref.current || !secondh1Ref.current || !paraRef.current) return;
      
        self.ignore(() => {
            const split = SplitText.create(firsth1Ref.current, { type: "words chars" });
            const split2 = SplitText.create(secondh1Ref.current, { type: "words chars" });
            const para = SplitText.create(paraRef.current, { type: "words" });

            const allChar1 = split.chars;

            const word2 = split2.words;
            const words1= split.words;
            const word1 = words1.slice(1);
            const parawords = para.words;

            const A = allChar1[0];


            const t1 = gsap.timeline({
                onComplete: () => {
                    if (onComplete) onComplete(); 
                }
            });

            t1.from(A, {
                duration: 1.7,
                x: 100,
                autoAlpha: 0,
                rotationX: -90,
                rotationY: -45,
                transformOrigin: "left top",
                ease: "back.out(1.7)"
            })
            .from(word1, {
                duration: 1,
                y: 60,
                stagger: 0.05,
                autoAlpha: 0,
                ease: "power3.out",
            }, "-=0.7")
            .from(word2, {
                duration: 1,
                y: 60,
                stagger: 0.05,
                autoAlpha: 0,
                ease: "power3.out",
            }, "<")
            .from(parawords, {
                duration: 1.4,
                stagger: 0.06,
                autoAlpha: 0,
                ease: "power3.out",
                x: 30
            });
            
        }); 
            
    }, { dependencies: [] }); 

    return null;
};