import { useState } from 'react';
import { useOsStore } from '../../shared/store/useOsStore';
import { Header } from './header/Header';
import { Form } from './form/Form';
import { Information } from './information/Information';
import { Socials } from './socials/Socials';
import { Footer } from './footer/Footer';
import { CenterImage } from './information/CenterImage';
export const ContactApp = () => {
    const addNotification = useOsStore((state) => state.addNotification);
    const Zindex = useOsStore((state) => 10 + state.windowOrder.indexOf("contact"));


    return (
        <div style={{
            zIndex: Zindex,
            containerType: 'size',
            containerName: 'contactApp'
        }}
            className='w-full h-full'>
            <div className='w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar relative'>
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
