import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import sunGif from "../../assets/sunGif.gif";
import { useOsStore } from "../../store/useOsStore";
export const Searchbar = () => {
    const [inputvalue, setInputValue] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [prev,setPrev] = useState(false);
    const setSystemTelemetry = useOsStore((state) => state.setSystemTelemetry)
    const formRef = useRef(null);
    const isFirstRender = useRef(true);
    const searchWrapperRef = useRef(null);


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

    useEffect(() => {
        const handleClickOutside = (event) => {
            // If the wrapper exists AND the click target is NOT inside the wrapper
            if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
                setPrev(false); 
            }
        };

        
        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: fetchLocationTelemetry,
        onSuccess: (data, submittedLocation) => {
            setSystemTelemetry(submittedLocation, data);
        }
    })


    useGSAP(() => {

        if (isFirstRender.current) {
            const tl = gsap.timeline();

            gsap.set(".arrow", { opacity: 0, y: 30 });
            gsap.set(".form", { width: 0, opacity: 0, overflow: "hidden" });
            gsap.set(".search", { opacity: 0, scale: 0.5 });

            tl.to(".form", {
                width: "100%",
                opacity: 1,
                duration: 1,
                ease: "power3.out"
            })
                .to(".search", {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "back.out(2)"
                });
            isFirstRender.current = false;
        }

        if (isPending) {
            gsap.to(".search", {
                opacity: 0,
                y: -30,
                duration: 0.3,
                ease: "power3.inOut"
            })
            gsap.fromTo(".arrow", {
                opacity: 0,
                y: 30,

            }, {
                y: 0,
                opacity: 1,
                duration: 0.3,
                ease: "power3.inOut"
            })
        }
        else {

            gsap.to(".arrow", { y: -30, opacity: 0, duration: 0.4, ease: "back.in(1.5)" });
            gsap.fromTo(".search",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.5)", delay: 0.1 }
            );
        }
    }, { scope: formRef, dependencies: [isPending, isFirstRender] })

    const handlesumbit = (e) => {
        e.preventDefault();
        let cleanvalue = inputvalue.trim();
        if (!cleanvalue) return;
        setPrev(false);
        mutate(cleanvalue);
    }


    return (
        <div ref={searchWrapperRef} className="expandsearch ">
            <div ref={formRef} className="SearchContainer">
                <div className="logoAndbar">
                    {/* <img src={sunGif} alt="searcbarlogo" /> */
                    }
                    <form  onSubmit={handlesumbit} className="form">
                        <input type="text"
                            className="input"
                            value={inputvalue}
                            placeholder="Enter Your Location"
                            onFocus={()=>{
                                setPrev(true);
                            }}
                          

                            onChange={(e) => {
                                setInputValue(e.target.value);
                            }}

                        />
                    </form>
                    <div className="holder">
                        <i onClick={handlesumbit} className="ri-search-line search"></i>
                        <i className="ri-send-plane-fill arrow"></i></div>
                </div>
            </div >

            <div className={`PrevSearches flex-col justify-center items-start  p-4  border-2 border-white/80 rounded-2xl bg-white text-black ${prev?"flex":"hidden"} `}>
                <span onClick={()=>{
                    setPrev(false)
                }}><i class="ri-history-line"></i>  ludhiana, india</span>
                <span><i class="ri-history-line"></i>  london, UK</span>
                <span><i class="ri-history-line"></i>  california, Usa</span>
                <span><i class="ri-history-line"></i>  Delhi ,India</span>
            </div>
        </div>
    )

}