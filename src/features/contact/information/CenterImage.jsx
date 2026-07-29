import { useScrollFade } from "../../../shared/hooks/useScrollFade";
export const CenterImage =()=>{
    const ImgRef = useScrollFade({y:50,ease:"power4.inOut",duration:1,delay:0.5})
    return(
         <section ref={ImgRef}  className="centerImage reveal">
            <img src="/gitprofile.png" alt="centerimage" />
        </section>
    )
}