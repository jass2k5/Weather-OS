import { useState, useRef } from "react";
import { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useOsStore } from "../store/useOsStore";

import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Api_Key = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

const fetchLocationTelemetry = async (locationName) => {
    try {
        const response = await axios.get(`${BASE_URL}/current.json`, {
            params: {

                key: Api_Key,
                q: locationName,
                aqi: "yes"
            }
        });

        return response.data;

    } catch (error) {
        if (error.response) {

            console.error("API CALL FAILED:", error.response);
        }
        throw error;
    }
};


export const RunAct3 = ({ onComplete }) => {

    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const beforeInput = useRef(null);
    const info = useRef(null);
    const setSystemTelemetry = useOsStore((state) => state.setSystemTelemetry);
    const timeoutIdRef = useRef(null);
    const { contextSafe } = useGSAP();
    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: fetchLocationTelemetry,
        onSuccess: (data, submittedLocation) => {
            setSystemTelemetry(submittedLocation, data);
            timeoutIdRef.current = setTimeout(() => {
                contextSafe(() => {
                    const tl = gsap.timeline({
                        delay:0.3,
                        onComplete:()=>{
                            console.log("oncomplete run")
                            onComplete();
                        }
                    });

                   
                    tl.to(inputRef.current, {
                        autoAlpha: 0,
                        y: -20,
                        duration: 0.8,
                        ease: "power3.inOut"
                    })
                      
                        .to(info.current, {
                            autoAlpha: 0,
                            y: -20,
                            delay:0.3,
                            duration: 0.8,
                            ease: "power3.inOut"
                        });
                })();
            }, 3000);

        }
    });

    useGSAP(() => {

        const t1 = gsap.timeline({
            delay: 0.3
        })

        t1.fromTo(inputRef.current, {
            autoAlpha: 0,
            y: 60,
        }, {
            y: 0,
            duration: 0.5,
            delay: 0.3,
            autoAlpha: 1,
            ease: 'back.in',
            onComplete: () => {
                inputRef.current.focus();
            }
        })

    }, { dependencies: [] })
    useEffect(() => {


        return () => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
        }
    }, [])
    const handlesumbit = (e) => {
        e.preventDefault();
        const cleanValue = inputValue.trim();
        if (!cleanValue) return;


        mutate(cleanValue);
    }
    return (
        <div ref={containerRef} className=" main-container absolute h-full top-0 left-[50%] transform  w-[50%] flex flex-col gap-5 justify-center items-center">

            <div className="flex flex-col justify-center items-center h-auto w-full gap-4">
                {/* 
                <div ref={beforeInput} className="italic font-sans text-2xl text-white animate-bounce">Enter Your Area Name!</div> */}

                <form onSubmit={handlesumbit} className="flex flex-col justify-center items-center">
                    <input
                        ref={inputRef}
                        type="text"
                        className="inputload opacity-0"
                        disabled={isPending}
                        placeholder="Enter The Area Name"
                        value={inputValue}
                        onChange={
                            (e) => {
                                setInputValue(e.target.value);
                            }
                        }
                    />
                </form>

            </div>

            <div ref={info} className="h-10 mt-4 w-full relative">


                {isPending && (
                    <span className="text-orange-400 animate-pulse absolute inset-0 flex items-center justify-center font-mono text-[1rem] tracking-wider uppercase">
                        [ FETCHING ATMOSPHERIC DATA... ]
                    </span>
                )}

                {isError && (
                    <span className="text-red-500 absolute inset-0 flex items-center justify-center font-mono text-[1rem] tracking-wider uppercase">
                        [ ERROR: UNKNOWN LOCATION NODE ]
                    </span>
                )}

                {isSuccess && (
                    <span className="text-green-400 absolute inset-0 flex items-center justify-center font-mono text-[1rem] tracking-wider uppercase">
                        [ UPLINK SECURED. ]
                    </span>
                )}
            </div>
        </div>
    )
} 
