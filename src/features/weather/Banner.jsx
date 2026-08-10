import { getWeatherAdvisory } from "../../shared/components/BannerInfo";
import { useCityForecast } from "../../shared/hooks/useCityForecast";
import warning from '../../shared/assets/warning.png';

export const Banner = ({ city }) => {
    const { data, isLoading, isError } = useCityForecast(city);
    const { mainHeadline, bannerTags, allGuidance } = getWeatherAdvisory(data);

    const [status, action] = (mainHeadline ?? "").split(". ");

    return (
        <div className="banner min-h-[160px] w-full bg-[#f09550] rounded-[0.8rem] p-4 flex flex-col gap-4 shadow-sm">
            
       
            <div className="flex items-center gap-2 text-xs font-bold text-black tracking-wider">
                <span className="text-white">07</span> ADVISORY
            </div>

            <div className="banner-content flex flex-col w-full gap-5">
                
               
                <div className="banner-left flex items-start gap-3 w-full">
                    <img src={warning} alt="warn" className="w-8 h-8 mt-1 shrink-0" />
                    <div className="mainheadline flex flex-col text-white">
                        <span className="text-2xl font-bold leading-tight">{status}.</span>
                        <span className="text-lg font-medium text-white/90">{action}</span> 
                    </div>
                </div>

              
                <div className="banner-right flex flex-col justify-center w-full">
                    
                   
                    <div className="flex flex-row flex-wrap items-center gap-2 text-black text-sm font-medium mb-1">
                        {bannerTags.map((tag, index) => (
                            <div key={index} className="flex items-center gap-2">
                             
                                <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-black"></div>
                                <span>{tag}</span>
                                
                                
                                {index !== bannerTags.length - 1 && (
                                    <span className="mx-1 text-black/40">·</span>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    
                    <div className="w-full h-px bg-black/20 my-2"></div>
                    
                  
                    <button className="flex items-center gap-1 text-black text-sm font-medium hover:opacity-70 transition-opacity w-max">
                        Tap for full guidance <span className="text-lg leading-none">→</span>
                    </button>

                </div>
            </div>
        </div>
    );
};