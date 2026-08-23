import { useScrollFade } from "../../../shared/hooks/useScrollFade";
const socialLinks = [
    { name: "Instagram", icon: "ri-instagram-line", url: "https://www.instagram.com/jaspinder____84/" },
    { name: "Pinterest", icon: "ri-pinterest-line", url: "https://in.pinterest.com/jsssndl/_profile/" },
    { name: "Discord", icon: "ri-discord-line", url: "https://discord.com/channels/@me/1451595945383825500" },
    { name: "Twitter", icon: "ri-twitter-x-line", url: "https://x.com/JStartswit84533" },
    { name: "Contact Me", icon: "ri-mail-line", url: "mailto:jaspindersingh3050@gmail.com" },
];

export const Socials = () => {
    const SocialRef = useScrollFade({x:50,y:0,ease:"power4.inOut",duration:1,delay:0.8});
    return (
        <section ref={SocialRef} className="infomobile contactInfomobile">
            {socialLinks.map((link, index) => (
                <div
                    key={index}
                    className="info reveal"
                    onClick={() => window.open(link.url, '_blank')}
                    style={{ cursor: "pointer" }}
                >
                    <h3>{link.name}</h3>
                    <div className="iconwrapper">
                        <i className={`${link.icon} logos`}></i>
                        <i className="ri-arrow-right-up-long-line arrow"></i>
                    </div>
                </div>
            ))}
        </section>
    )
}