import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useOsStore } from "../../shared/store/useOsStore";
import { useRef, memo } from "react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, useGSAP);

export const Text = memo(() => {
    const mapSetting = useOsStore((state) => state.mapSetting.theme);
    const myZIndex = useOsStore((state) => 20 + state.windowOrder.indexOf('map'));


    const city = useOsStore((state) => state.telemetryData?.city ?? "Unknown Location");
    const country = useOsStore((state) => state.telemetryData?.country ?? "Unknown Country");
    const temperature = useOsStore((state) => state.telemetryData?.liveTemp ?? 0);
    const weatherText = useOsStore((state) => state.telemetryData?.liveCondition ?? "Loading...");
    const cityRef = useRef<HTMLHeadingElement>(null);
    const tempRef = useRef<HTMLSpanElement>(null);
    const weatherTextRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        const weatherwords = SplitText.create(weatherTextRef.current, { type: "chars" });
        const degree = SplitText.create(tempRef.current, { type: "chars" });

        const t1 = gsap.timeline();

        t1.fromTo(degree.chars, {
            opacity: 0,
            y: 30,
        }, {
            opacity: 1,
            duration: 0.5,
            stagger: {
                from: "start",
                each: 0.05,
                ease: "power3.inOut"
            },
            y: 0,
        });

        t1.fromTo(weatherwords.chars, {
            opacity: 0,
            y: 30,
        }, {
            duration: 0.5,
            opacity: 1,
            stagger: {
                from: "start",
                each: 0.05
            },
            y: 0,
        }, "0.4");


        return () => {
            weatherwords.revert();
            degree.revert();
        };

    }, { dependencies: [city, weatherText, temperature] });

    return (
        <div
            style={{ zIndex: myZIndex }}
            className={`conditionContainer ${mapSetting === "light" ? "text-yellow-500" : "text-white"}`}
        >
            <span className="searchedlocation">Searched Location</span>


            <h1 key={`city-${city}`} ref={cityRef} className="countryCity">
                {`${city}, ${country}`}
            </h1>

            <span key={`temp-${temperature}`} ref={tempRef} className="temperature inline-block">
                {`${temperature}°C`}
            </span>

            <span key={`weather-${weatherText}`} ref={weatherTextRef} className="condition inline-block">
                {`${weatherText}`}
            </span>
        </div>
    );
});