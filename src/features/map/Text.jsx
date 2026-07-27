import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useOsStore } from "../../shared/store/useOsStore";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, useGSAP);

export const Text = () => {

    const mapSetting = useOsStore((state) => state.mapSetting.theme);
    const myZIndex = useOsStore((state) => 20 + state.windowOrder.indexOf('map'));
    const city = useOsStore((state) => state.telemetryData?.location?.name?.trim() ?? "Unknown Location");
    const country = useOsStore((state) => state.telemetryData?.location?.country?.trim() ?? "Unknown Country");
    const temperature = useOsStore((state) => state.telemetryData?.current?.temp_c ?? 0);
    const weatherText = useOsStore((state) => state.telemetryData?.current?.condition?.text ?? "Couldn't fetch the data");

    const cityRef = useRef(null);
    const tempRef = useRef(null);
    const weatherTextRef = useRef(null);
    useGSAP(() => {
        const weatherwords = SplitText.create(weatherTextRef.current, {
            type: "chars"
        })
        const degree = SplitText.create(tempRef.current, {
            type: "chars"
        })
        const t1 = gsap.timeline({

        });

        t1.fromTo(degree.chars, {
            opacity: 0,
            y: 30,
        }, {
            opacity: 1,
            duration: 0.1,
            stagger: {
                from: "start",
                each: 0.5,
                ease: "power3.inOut"
            },
            y: 0,
        })

        t1.fromTo(weatherwords.chars, {
            opacity: 0,
            y: 30,

        }, {
            duration: 0.3,
            opacity: 1,
            stagger: {
                from: "start",
                each: 0.2
            },
            y: 0,
            onComplete: () => {
                weatherwords.revert();
            }
        })
    }, { dependencies: [city,weatherText,temperature] });



    return (
        <div
            style={{ zIndex: myZIndex }}
            className={`conditionContainer ${mapSetting === "light" ? "text-yellow-500" : "text-white"} `}>
            <span className="searchedlocation">Searched Location</span>
            <h1 ref={cityRef} className="countryCity">{`${city},${country}`}</h1>
            <span ref={tempRef} className="temperature">{`${temperature}°C`}</span>
            <span ref={weatherTextRef} className="condition">{`${weatherText}`}</span>
        </div>
    )

}