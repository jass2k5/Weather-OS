import React, { useState } from 'react';
import { useOsStore } from '../../shared/store/useOsStore';

const socialLinks = [
    { name: "Instagram", icon: "ri-instagram-line", url: "https://www.instagram.com/jaspinder____84/" },
    { name: "Pinterest", icon: "ri-pinterest-line", url: "https://in.pinterest.com/jsssndl/_profile/" },
    { name: "Discord", icon: "ri-discord-line", url: "https://discord.com/channels/@me/1451595945383825500" },
    { name: "Twitter", icon: "ri-twitter-x-line", url: "https://x.com/JStartswit84533" },
    { name: "Contact Me", icon: "ri-mail-line", url: "mailto:jaspindersingh3050@gmail.com" },
];

export const ContactApp = () => {
    const addNotification = useOsStore((state) => state.addNotification);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const zIndex = useOsStore((state) => 10 + state.windowOrder.indexOf("contact"));
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const form = e.target;
        const formData = new FormData(form);
        formData.append("access_key", "8ed52522-49ca-4f6d-b76e-ae710e10884b");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                addNotification("Success! Your message has been sent to Jass.", "success");
                form.reset();
            } else {
                addNotification("Error: " + data.message, "error");
            }
        } catch (error) {
            addNotification("Something went wrong. Please try again.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLocationClick = () => {
        const address = "Vinohradská 121, 130 00 Praha 3, Czech Republic";
        const safeAddress = encodeURIComponent(address);
        window.open(`https://www.google.com/maps/search/?api=1&query=${safeAddress}`, '_blank');
    };


    return (
        <div style={{ zIndex: zIndex }} className='contactMain'>
            <header className='header'>
               <div className='containerHeader'>
                 <div className='imgHeader'>
                    <img src="./contactheader.png" alt="contactimage" />

                </div>

                <div className='featured'>
                    <span>Jass</span>
                </div>
               </div>


            </header>

            <section className='form'>
                <form onSubmit={handleSubmit} id='form'>
                    <h1>Let's Talk</h1>
                    <div className='inputs'>
                        <div className='inputholder'>
                            <input type="text" name='name' placeholder='Your Name' required />
                            <input type="email" name='email' placeholder='Your Email' required />
                        </div>
                        <textarea name="message" placeholder='Your Message' required></textarea>
                        <button className="btn" type="submit">Send Message</button>
                    </div>
                </form>
            </section>

            <section className='centerImage'>
                <img src="./contactheader.png" alt="githubimage" />
            </section>

            <section className="studioInformation">
                <div className="first">
                    <h2>Jammu</h2>
                    <h2>Workspace</h2>
                </div>
                <div className="location">
                    <span>Jammu City,</span>
                    <span>Jammu & Kashmir,</span>
                    <span>India</span>
                </div>
                <div className="buttonContainer">
                    <span>Get Direction</span>
                    <div className="arrowWrapper">
                        <i className="ri-arrow-right-up-long-line above"></i>
                        <i className="ri-arrow-right-up-long-line below"></i>
                    </div>
                </div>
            </section>

            <section className="infomobile contactInfomobile">
                {socialLinks.map((link, index) => (
                    <div
                        key={index}
                        className="info reveal cursor-pointer"
                        onClick={() => window.open(link.url, '_blank')}
                    >
                        <h3>{link.name}</h3>
                        <div className="iconwrapper">
                            <i className={`${link.icon} logos`}></i>
                            <i className="ri-arrow-right-up-long-line arrow"></i>
                        </div>
                    </div>
                ))}
            </section>

             <footer className="footer">
            <section className="aboutandmore">
                <div className="first-half">
                    <img className='ema-img' src="./contactheader.png" alt="" />
                    <div className="sideview">
                        <h2>Ema Hanssen</h2>
                        <h3>photographer</h3>
                    </div>
                </div>
                <div className="second-half">
                    <a href=""><span>more templates</span></a>
                </div>
            </section>
            <section className="all">
                <div className="pages">
                    <h3>Pages</h3>
                    <div className="f-nav">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><a href="">About</a></li>
                            <li><a href="">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="CMS">
                    <h3>CMS</h3>
                    <div className="allcms">
                        <ul>
                            <li>Work</li>
                            <li>Work Single</li>
                            <li>Blog</li>
                            <li>Blog Single</li>
                        </ul>
                    </div>
                </div>
                <div className="utility">
                    <h3>Utility</h3>
                    <div className="utilities">
                        <ul>
                            <li>404</li>
                            <li>Password Page</li>
                            <li>Styleguide</li>
                            <li>Changelog</li>
                            <li>Licensing</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="end">
                <h3>@ Made by JASS</h3>
                <div className="contacts">
                    <a href="https://github.com/jass2k5"><i className="ri-github-line"></i></a>
                    <a href="jsssndl@gmail.com"><i className="ri-mail-ai-line"></i></a>
                    <a href="https://www.instagram.com/jaspinder____84/?next=%2F"><i className="ri-instagram-line"></i></a>
                </div>
            </section>
        </footer>


        </div>
    )
}
