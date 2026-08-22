import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useOsStore } from "../../shared/store/useOsStore";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Api_Key = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

const fetchLocationTelemetry = async (locationName: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/current.json`, {
            params: {
                key: Api_Key,
                q: locationName,
                aqi: "yes"
            }
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error("API CALL FAILED:", error.response);
        }
        throw error;
    }
};

interface RunAct3Props {
    onComplete: () => void;
}

export const RunAct3 = ({ onComplete }: RunAct3Props) => {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const info = useRef<HTMLDivElement>(null);
    const setSystemTelemetry = useOsStore((state) => state.setSystemTelemetry);
    
    const timeoutIdRef = useRef<number| null>(null);
    
    const addNotification = useOsStore((state) => state.addNotification);
    const { contextSafe } = useGSAP();

    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: fetchLocationTelemetry,
        onSuccess: (data, submittedLocation: any) => {
            const cleanBootData = {
                city: data.location.name,
                country: data.location.country,
                tz_id: data.location.tz_id,
                location: data.location,
                loc: { lat: data.location.lat, lon: data.location.lon },
                liveTemp: data.current.temp_c,
                liveCondition: data.current.condition.text,
                humidity: data.current.humidity,
                wind: data.current.wind_kph,
                windDegree: data.current.wind_degree,
                visibility: data.current.vis_km,
                feelsLike: data.current.feelslike_c,
                isDay: data.current.is_day === 1,
                aqi: data.current.air_quality ? data.current.air_quality['us-epa-index'] : null,
            };

            setSystemTelemetry(submittedLocation, cleanBootData);
            addNotification(`Current Telemetry ${submittedLocation}`, "success");
            
            timeoutIdRef.current = setTimeout(() => {
                contextSafe(() => {
                    const tl = gsap.timeline({
                        delay: 0.3,
                        onComplete: () => {
                            console.log("oncomplete run");
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
                        delay: 0.3,
                        duration: 0.8,
                        ease: "power3.inOut"
                    });
                })();
            }, 3000);
        },
        onError: (_error: any, submittedLocation: any) => {
            addNotification(`Telemetry failed for node: ${submittedLocation}`, "error");
        }
    });

    useGSAP(() => {
        const t1 = gsap.timeline({ delay: 0.3 });
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
                inputRef.current?.focus();
            }
        });
    }, { dependencies: [] });

    useEffect(() => {
        return () => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
        };
    }, []);

    const handlesubmit = (e:any) => {
        e.preventDefault();
        const cleanValue = inputValue.trim();
        if (!cleanValue) return;
        mutate(cleanValue);
    };

    return (
        <div ref={containerRef} className="main-container absolute h-full top-0 left-[50%] transform w-[50%] flex flex-col gap-5 justify-center items-center">
            <div className="flex flex-col justify-center items-center h-auto w-full gap-4">
                <form onSubmit={handlesubmit} className="flex flex-col justify-center items-center">
                    <input
                        ref={inputRef}
                        type="text"
                        className="inputload opacity-0"
                        disabled={isPending}
                        placeholder="Enter The Area Name"
                        value={inputValue}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
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
    );
};