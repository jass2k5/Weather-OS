import { useScrollFade } from "../../../shared/hooks/useScrollFade"
import { Reset } from "../../../shared/components/ResetBtn"
import contactHeaderImg from "../../../shared/assets/Contactheader.png"
export const Footer = () => {
    const FooterRef = useScrollFade();

    return (
        <footer ref={FooterRef} className="footer">
            <section className="aboutandmore">
                <div className="first-half">
                    <img className="ema-img" src={contactHeaderImg} alt="github profile pic" />
                    <div className="sideview">
                        <h2>Jaspinder Singh</h2>
                        <h3>Front End Developer</h3>
                    </div>
                </div>
                <div className="second-half">
                   <span>Weather Os</span>
                </div>
            </section>
            
            <section className="all">
              
                <div className="pages">
                    <h3>Core Stack</h3>
                    <div className="f-nav">
                        <ul>
                            <li>React JS 19</li>
                            <li>Tailwind CSS</li>
                            <li>Zustand State</li>
                            <li>Sass / SCSS</li>
                        </ul>
                    </div>
                </div>
                
              
                <div className="CMS">
                    <h3>Motion & UI</h3>
                    <div className="allcms">
                        <ul>
                            <li>GSAP & ScrollTrigger</li>
                            <li>Lenis Smooth Scroll</li>
                            <li>React RND</li>
                            <li>Remix Icons</li>
                        </ul>
                    </div>
                </div>
              
                <div className="utility">
                    <h3>Data & Maps</h3>
                    <div className="utilities">
                        <ul>
                            <li>React Query</li>
                            <li>Axios/fetch</li>
                            <li>MapLibre GL</li>
                            <li>Styled Components</li>
                            <li>Skeleton Loaders</li>
                        </ul>
                    </div>
                </div>
            </section>
            
            <section className="end">
                <h3>@ Made by JASS</h3>
               
            </section>
        </footer>
    )
}