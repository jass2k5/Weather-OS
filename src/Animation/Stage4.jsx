import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useOsStore } from "../store/useOsStore";
import { BootSequence } from "../components/BootSequence";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable, useGSAP);

export const RunAct4 = ({ dragBoxRef, firsth1Ref, secondh1Ref, paraRef, onComplete }) => {
    const containerRef = useRef(null);
    const columnRef = useRef(null);
    const [count, SetCount] = useState(null);
    const [block, setBlock] = useState(200)
    const timeoutRef = useRef(null);
    const finishBoot = useOsStore(state => state.finishBoot);
    useEffect(() => {

        let draggable = Draggable.get(dragBoxRef.current);
        gsap.set(dragBoxRef.current, {
            display: "none"
        })
        if (draggable) {
            draggable.kill();
        }

        const height = window.innerHeight;
        const width = window.innerWidth;

        SetCount(Math.floor(width / block));

        return clearTimeout(timeoutRef.current);

    }, [])

    useGSAP(() => {
        timeoutRef.current = setTimeout(() => {
            const t1 = gsap.timeline({
                onComplete: () => {
                    onComplete();
                    finishBoot();
                }
            });
            t1.fromTo(".columnBox", {
                autoAlpha: 0,
                scaleY: 0,
                transformOrigin: "center bottom"
            }, {
                autoAlpha: 1,
                duration: 1,
                scaleY: 1,
                ease: "power4.in",
                stagger: {
                    each: 0.5,
                    from: "end"
                },
                onComplete: () => {
                    gsap.set([firsth1Ref.current, secondh1Ref.current, paraRef.current], {
                        display: "none"
                    })
                }

            })
            t1.to(".columnBox", {
                scaleY: 0,
                transformOrigin: "center top",
                duration: 1,
                delay:0.2,
                stagger: {
                    each: 0.5,
                    from: "start"
                },
                ease: "power4.out"
            });
        }, 1000);


    }, { dependencies: [count] })
    return (
        <div className="columncontainer bg-transparent h-full w-full absolute inset-0 flex flex-row items-center gap-0.5 justify-center z-50">
            {Array.from({ length: count }).map((elem, index) =>
                <div key={index} className='columnBox opacity-0'></div>
            )}
        </div>
    )

}