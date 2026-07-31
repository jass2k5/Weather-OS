import { useScrollFade } from "../../../shared/hooks/useScrollFade"
import { useOsStore } from "../../../shared/store/useOsStore";
import { useEffect } from "react";
export const Header=()=>{
    const isGithubHovered = useOsStore((state)=>state.isGithubHovered);
    const setIsGithubHovered = useOsStore((state)=>state.setIsGithubHovered);
    const setgithubText = useOsStore((state)=>state.setgithubText);
    const HeadRef = useScrollFade({y:300,duration:1.7,ease:"power2.inOut",origin:"top center",});
    useEffect(() => {
        return () => {
            setIsGithubHovered(false);
            setgithubText(null);
        };
    }, []);
    return(
        <header ref={HeadRef} className='aboutHeader contactHeader cursor-none'>
                    <div
                    onMouseEnter={()=>{
                        setIsGithubHovered(true);
                        setgithubText("jass2k5")
                    }}
                    onMouseLeave={()=>{
                        setIsGithubHovered(false);
                    }}
                    onClick={()=>{
                        window.open('https://github.com/jass2k5','_blank')
                    }} className='containerHeader '>
                        <div className="imgHeader relative">
                            <img className="border "  src="./Contactheader.png" alt="headerimg" />
                            <div className="absolute inset-0 z-30 backdrop-blur-[3px]  rounded-2xl"></div>
                        </div>

                        <div className="featured z-40">
                            <span>GitHub</span>
                        </div>
                       
                    </div>
                </header>
    )
}