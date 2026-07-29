import { useScrollFade } from "../../../shared/hooks/useScrollFade";
import { useOsStore } from "../../../shared/store/useOsStore";
export const CenterImage =()=>{
    const ImgRef = useScrollFade({x:50,y:0,ease:"power4.inOut",duration:1,delay:0.5});
    const setIsGithubHovered = useOsStore((state)=>state.setIsGithubHovered);
    const setgithubText = useOsStore((state)=>state.setgithubText);
    return(
         <section ref={ImgRef}
         onMouseEnter={()=>{
            setIsGithubHovered(true);
            setgithubText("Repo");

         }}
         onMouseLeave={()=>{
            setIsGithubHovered(false);
         }}
          onClick={()=>{
            window.open('https://github.com/jass2k5/Weather-OS','_blank');
         }} className="centerImage reveal">
            <img src="/gitprofile.png" alt="centerimage" />
        </section>
    )
}
