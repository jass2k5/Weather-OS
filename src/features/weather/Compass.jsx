import dialer from '../../shared/assets/compass-dial.svg';
import needle from '../../shared/assets/compass-needle.svg';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export const Compass = ({ degree }) => {
    const needleRef = useRef(null);

    useGSAP(() => {
        if (needleRef.current) {
            gsap.set(needleRef.current, {
                xPercent: -50,
                yPercent: -50,
                transformOrigin: '50% 50%', // pivot = image's own center, matches the translate
            });

            gsap.to(needleRef.current, {
                rotation: degree,
                duration: 2,
                ease: "elastic.out(1.2, 0.4)",
            });
        }
    }, [degree]);

    return (
        <div className='compass max-w-[250px] flex flex-col items-center justify-center pl-4 shrink-0'>
            <span className='north text-black/20'>N</span>

            <div className='AnimatedCompass relative w-full max-w-[500px] max-h-[200px] flex items-center justify-center aspect-square overflow-hidden'>
                <img className='h-full w-full scale-[1.35]' src={dialer} alt="dialer" />

                <img
                    ref={needleRef}
                    className='absolute left-1/2 top-1/2 h-[75%] w-auto'
                    src={needle}
                    alt="needle"
                />
            </div>
        </div>
    );
};