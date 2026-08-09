import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useCityForecast } from "../../shared/hooks/useCityForecast";
import { timeToMinutes } from "../../shared/utils/HourstoMint";

export const SolarArc = ({ city }) => {
    const { data, isLoading, isError } = useCityForecast(city);
    const sunRef = useRef(null); 

    const sunriseTime = data?.forecast?.forecastday?.[0]?.astro?.sunrise;
    const sunsetTime = data?.forecast?.forecastday?.[0]?.astro?.sunset;
    console.log(sunriseTime,sunsetTime)
    const sunriseMinutes = timeToMinutes(sunriseTime);
    const sunsetMinutes = timeToMinutes(sunsetTime);

    const localTimeStr = data?.location?.localtime?.replace(" ", "T");
    const now = new Date(localTimeStr);
    const currentMins = (now.getHours() * 60) + now.getMinutes();

    const duration = sunsetMinutes - sunriseMinutes;
    let elapsed = currentMins - sunriseMinutes;

    if (elapsed < 0) elapsed = 0;
    if (elapsed > duration) elapsed = duration;

    const ratio = duration > 0 ? elapsed / duration : 0;
    const angle = (ratio * 180) - 90;


    useGSAP(() => {

        if(!sunRef.current) return;
        gsap.to(sunRef.current, {
            rotation: angle,
            duration: 2.5,
            ease: "power3.out"
        });
    }, [angle]);
    
    if (isLoading) return <div>Loading Skeleton...</div>;
    if (isError || !data) return <div>Error State...</div>;

    return (
        <div className="SolarArc w-full flex flex-col  justify-center items-start p-4 bg-white rounded-[0.8rem] border border-black/10">
            <div className="count flex justify-center items-center gap-2 ">
                <span className="countnumber">04</span>
                <span className="conditions">Sunrise/Sunset</span>
            </div>

            <div className="ArcandSun flex flex-col items-center justify-center relative w-[320px] h-[240px] mx-auto overflow-hidden">
                

                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" fill="none" role="img">
                    <circle cx="16.00" cy="164.00" r="5.5" fill="#F09048" />
                    <circle cx="17.96" cy="140.30" r="5.5" fill="#F09048" />
                    <circle cx="23.80" cy="117.24" r="5.5" fill="#F09048" />
                    <circle cx="33.36" cy="95.46" r="5.5" fill="#F09048" />
                    <circle cx="46.36" cy="75.55" r="5.5" fill="#F09048" />
                    <circle cx="62.47" cy="58.06" r="5.5" fill="#F09048" />
                    <circle cx="81.24" cy="43.45" r="5.5" fill="#F09048" />
                    <circle cx="102.16" cy="32.13" r="5.5" fill="#F09048" />
                    <circle cx="124.65" cy="24.41" r="5.5" fill="#F09048" />
                    <circle cx="148.11" cy="20.49" r="5.5" fill="#F09048" />
                    <circle cx="171.89" cy="20.49" r="5.5" fill="#F09048" />
                    <circle cx="195.35" cy="24.41" r="5.5" fill="#F09048" />
                    <circle cx="217.84" cy="32.13" r="5.5" fill="#F09048" />
                    <circle cx="238.76" cy="43.45" r="5.5" fill="#F09048" />
                    <circle cx="257.53" cy="58.06" r="5.5" fill="#F09048" />
                    <circle cx="273.64" cy="75.55" r="5.5" fill="#F09048" />
                    <circle cx="286.64" cy="95.46" r="5.5" fill="#F09048" />
                    <circle cx="296.20" cy="117.24" r="5.5" fill="#F09048" />
                    <circle cx="302.04" cy="140.30" r="5.5" fill="#F09048" />
                    <circle cx="304.00" cy="164.00" r="5.5" fill="#F09048" />
                </svg>

              
                <div 
                    ref={sunRef}
                    className="absolute left-1/2 bottom-[50px] w-[2px] origin-bottom "
                    style={{ height: '144px', transform: 'translateX(-50%)' }}
                >
                  
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32px] h-[32px] bg-[#F09048] rounded-full" />
                </div>

                 <div className="sunriseandsunset absolute bottom-0 left-1/2 -translate-x-1/2 h-auto w-full flex  items-center justify-between text-black">
                <span className="text-xl font-medium ">{sunriseTime}</span>
                <span className="text-xl font-medium">{sunsetTime}</span>
            </div>
            </div>

           
        </div>
    );
};