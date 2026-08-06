import dialer from '../../shared/assets/compass-dial.svg';
import needle from '../../shared/assets/compass-needle.svg';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useOsStore } from '../../shared/store/useOsStore';
import { useRef } from 'react';

export const Compass = ({ degree }) => {
    const needleRef = useRef(null);

    useGSAP(() => {
        if (needleRef.current) {
            // Set position + pivot BEFORE animating rotation
            gsap.set(needleRef.current, {
                xPercent: -50,   // center horizontally on the pivot point
                yPercent: -100,  // pull the image up so its BOTTOM sits at top:50%
                transformOrigin: '50% 100%', // pivot = bottom center, same spot
            });

            gsap.to(needleRef.current, {
                rotation: degree,
                duration: 2,
                ease: "elastic.out(1.2, 0.4)",
            });
        }
    }, [degree]);

    return (
        <div className='compass max-w-[250px] flex flex-col items-center justify-center pl-4'>
            <span className='north text-black/20'>N</span>

            <div className='AnimatedCompass relative w-full max-w-[500px] max-h-[200px] flex items-center justify-center aspect-square overflow-hidden'>
                <img className='h-full w-full scale-[1.35]' src={dialer} alt="dialer" />

                <img
                    ref={needleRef}
                    className='absolute left-[50%] top-[50%]'
                    src={needle}
                    alt="needle"
                />
            </div>
        </div>
    );
};