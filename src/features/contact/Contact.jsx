import { useEffect, useRef } from 'react';
import { useOsStore } from '../../shared/store/useOsStore';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Header } from './header/Header';
import { Form } from './form/Form';
import { Information } from './information/Information';
import { Socials } from './socials/Socials';
import { Footer } from './footer/Footer';
import { CenterImage } from './information/CenterImage';

gsap.registerPlugin(ScrollTrigger);
export const ContactApp = () => {
    const addNotification = useOsStore((state) => state.addNotification);
    const scrollContainerRef = useRef(null);
    const isDay = useOsStore((state) => state.isDay);
    useEffect(() => {
        if (!isDay) {
            document.body.classList.add('darkmode');
        } else {
            document.body.classList.remove('darkmode');
        }
    }, [isDay]);

    useEffect(() => {
        const lenis = new Lenis({
            wrapper: scrollContainerRef.current,
            content: scrollContainerRef.current.querySelector('.contactMain'),
            duration: 1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });


        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0, 0);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div style={{
            containerType: 'size',
            containerName: 'contactApp'
        }}
            className='w-full h-full absolute inset-0'>
            <div ref={scrollContainerRef} className='w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar relative'>
                <main className='contactMain'>
                    <Header />
                    <Form />
                    <Information />
                    <CenterImage />
                    <Socials />
                    <Footer />
                </main>
            </div>

        </div>
    );
};
