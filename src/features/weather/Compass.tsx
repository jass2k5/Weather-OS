import dialer from '../../shared/assets/compass-dial.svg';
import needle from '../../shared/assets/compass-needle.svg';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
interface CompassProps{
    degree:number
}
export const Compass = ({ degree }:CompassProps) => {
    const needleRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        if (needleRef.current) {
            gsap.set(needleRef.current, {
                xPercent: -50,
                yPercent: -50,
                transformOrigin: '50% 50%',
            });

            gsap.to(needleRef.current, {
                rotation: degree,
                duration: 2,
                ease: "elastic.out(1.2, 0.4)",
            });
        }
    }, [degree]);

    return (
     
        <div className='compass-widget flex flex-col items-center justify-center shrink-0 w-[190px] min-h-[190px] @container/compass (min-width: 1380px):w-[120px] max-h-[120px]'>
            <span className='north text-black/40 font-medium mb-1 text-sm'>N</span>

            <div className='AnimatedCompass relative w-full aspect-square flex items-center justify-center'>
                
                <img className='h-full w-full object-contain' src={dialer} alt="dialer" />

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