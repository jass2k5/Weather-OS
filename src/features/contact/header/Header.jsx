import { useScrollFade } from "../../../shared/hooks/useScrollFade"
export const Header=()=>{
    const HeadRef = useScrollFade({x:-300,duration:2,ease:"power2.inOut",origin:"top center",y:0});
    return(
        <header ref={HeadRef} className='aboutHeader contactHeader'>
                    <div className='containerHeader'>
                        <div className="imgHeader">
                            <img src="./gitprofile.png" alt="headerimg" />
                        </div>

                        <div className="featured">
                            <span>Repository</span>
                        </div>

                    </div>
                </header>
    )
}