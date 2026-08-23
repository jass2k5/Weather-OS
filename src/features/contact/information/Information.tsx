import { useScrollFade } from "../../../shared/hooks/useScrollFade";

export const Information = () => {
    const InfoRef = useScrollFade({ x: 50, y: 0, ease: "power4.inOut", duration: 1 });
    
    const handleLocationClick = () => {
        const address = "Jammu, Jammu and Kashmir, India"; 
        const safeAddress = encodeURIComponent(address);
        window.open(`https://www.google.com/maps/search/?api=1&query=${safeAddress}`, '_blank');
    };

    return (
        <section ref={InfoRef} className="studioInformation">
            <div className="first">
                <h2>Jass</h2>
                <h2>Frontend Engg.</h2>
            </div>
            <div className="location flex flex-col justify-start ">
                <span className="self-start">Jammu,</span>
                <span>Jammu and Kashmir,</span>
                <span className="self-start">India</span>
            </div>
            
            <div onClick={handleLocationClick} className="buttonContainer cursor-pointer">
                <span>Get Direction</span>
                <div className="arrowWrapper">
                    <i className="ri-arrow-right-up-long-line above"></i>
                    <i className="ri-arrow-right-up-long-line below"></i>
                </div>
            </div>
        </section>
    )
}