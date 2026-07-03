import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useOsStore } from "../../store/useOsStore";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";


gsap.registerPlugin(SplitText, useGSAP);

export const Text = () => {

    const telemetryData = useOsStore((state) => state.telemetryData);

    const city = telemetryData?.location?.name ?? "Unknown Location";
    const country = telemetryData?.location?.country ?? "Unknow Country";
    const temperature = telemetryData?.current?.temp_c ?? 0;
    const weatherText = telemetryData?.current?.condition?.text ?? "Couldn't fetch the data";

    const cityRef = useRef(null);
    const tempRef = useRef(null);
    const weatherTextRef = useRef(null);
    useGSAP(() => {
        const weatherwords = SplitText.create(weatherTextRef.current, {
            type: "chars"
        })
        const degree = SplitText.create(tempRef.current,{
            type:"chars"
        })
        const t1 = gsap.timeline({

        });

        t1.fromTo(degree.chars,{
            opacity:0,
            y:30,
        },{
            opacity:1,
            duration:0.1,
            stagger:{
                from:"start",
                each:0.5,
                ease:"power3.inout"
            },
            y:0,
        })

        t1.fromTo(weatherwords.chars,{
            opacity:0,
            y:30,
            
        },{
            duration:0.3,
            opacity:1,
            stagger:{
                from:"start",
                each:0.2
            },
            y:0
        })
    }, { dependencies: [telemetryData] });



    return (
        <div className="conditionContainer">
            <span className="searchedlocation">Searched Location</span>
            <h1 ref={cityRef} className="countryCity">{`${city}, ${country}`}</h1>
            <span ref={tempRef} className="temperature">{`${temperature}°C`}</span>
            <span ref={weatherTextRef} className="condition">{`${weatherText}`}</span>
        </div>
    )

}