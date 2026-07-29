import { useState } from "react";
import { useOsStore } from "../../../shared/store/useOsStore";
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useScrollFade } from "../../../shared/hooks/useScrollFade";
export const Form =()=>{
    const [isSubmitting,setIsSubmitting] = useState(false);
    const addNotification = useOsStore((state)=>state.addNotification);
    const FormRef = useScrollFade({y:-110,duration:2 ,ease:'power4.inOut'});
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



    return(
        <section ref={FormRef} className="formContact">
                    <form onSubmit={handleSubmit} id="formcontact">
                        <h1>Let's Talk</h1>
                        <div className="inputs">

                            <div className="inputholder">
                                <input type="text" name="name" placeholder="Your Name" required />
                                <input type="email" name="email" placeholder="Your Email" />
                            </div>
                            <textarea name="message" placeholder="Your Message" required></textarea>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                           className="btn"
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                        </div>
                    </form>
                </section>
    )
}
