import { useScrollFade } from "../../../shared/hooks/useScrollFade"
export const Footer = ()=>{
    const FooterRef = useScrollFade()
    return(
        <footer ref={FooterRef} className="footer">
            <section className="aboutandmore">
                <div className="first-half">
                    <img className="ema-img" src="./gitprofile.png" alt="github profile pic" />
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
                    <a href="mailto:jsssndl@gmail.com"><i className="ri-mail-ai-line"></i></a>
                    <a href="https://www.instagram.com/jaspinder____84/?next=%2F"><i className="ri-instagram-line"></i></a>
                </div>
            </section>
        </footer>
    )
}