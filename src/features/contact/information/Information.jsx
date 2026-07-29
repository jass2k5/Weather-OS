import { useScrollFade } from "../../../shared/hooks/useScrollFade";

export const Information = () => {
    const InfoRef = useScrollFade({y:50,ease:"power4.inOut",duration:1});
    const handleLocationClick = () => {
        const address = "Vinohradská 121, 130 00 Praha 3, Czech Republic"; 
        const safeAddress = encodeURIComponent(address);
        window.open(`https://www.google.com/maps/search/?api=1&query=${safeAddress}`, '_blank');
    };
    return (
        <section ref={InfoRef} className="studioInformation">
            <div className="first">
                <h2>Prague</h2>
                <h2>Studio</h2>
            </div>
            <div className="location">
                <span>Vinohradská 121,</span>
                <span>130 00 Praha 3,</span>
                <span>Czech Republic</span>
            </div>
            <div onClick={handleLocationClick} className="buttonContainer">
                <span>Get Direction</span>
                <div className="arrowWrapper">
                    <i className="ri-arrow-right-up-long-line above"></i>
                    <i className="ri-arrow-right-up-long-line below"></i>
                </div>
            </div>
        </section>
    )
}