import { useState } from "react";
import { getWeatherAdvisory } from "../../shared/utils/BannerInfo";
import { useCityForecast } from "../../shared/hooks/useCityForecast";
import warning from '../../shared/assets/warning.webp';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
interface BannerProps{
    city:string;
}
export const Banner = ({ city }:BannerProps) => {
    const { data, isLoading, isError } = useCityForecast(city);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="banner min-h-[160px] w-full bg-[#f09550] rounded-[0.8rem] p-4 flex flex-col gap-4 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-black tracking-wider">
                    <span className="text-white">07</span> ADVISORY
                </div>

                <div className="banner-content flex flex-col w-full gap-5">
                    <div className="flex items-start gap-3 w-full">
                        <Skeleton circle width={32} height={32} />
                        <div className="flex flex-col w-full">
                            <Skeleton height={28} width={`80%`} />
                            <Skeleton height={20} width={`50%`} className="mt-1" />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center w-full">
                        <Skeleton height={16} width={`60%`} className="mb-2" />
                        <div className="w-full h-px bg-black/20 my-2"></div>
                        <Skeleton height={16} width={120} />
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="banner min-h-[160px] w-full bg-[#f09550] rounded-[0.8rem] p-4 flex flex-col items-center justify-center shadow-sm">
                <img src={warning} alt="error" className="w-8 h-8 mb-2 opacity-50 grayscale" />
                <span className="text-black/70 font-bold text-sm">Failed to load weather advisory.</span>
            </div>
        );
    }

    const { mainHeadline, bannerTags, allGuidance } = getWeatherAdvisory(data);
    const [status, action] = (mainHeadline ?? "").split(". ");

    return (
        <>
           
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
                                    {index !== bannerTags.length - 1 && <span className="mx-1 text-black/40">·</span>}
                                </div>
                            ))}
                        </div>
                        
                        <div className="linebelow w-full h-px bg-black/20 my-2"></div>
                        
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-1 text-black text-sm font-medium hover:opacity-70 transition-opacity w-max cursor-pointer"
                        >
                            Tap for all Warnings <span className="text-lg leading-none">→</span>
                        </button>
                    </div>
                </div>
            </div>

      
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-[#faf6ef] border border-black/15 w-full max-w-lg rounded-2xl p-6 shadow-2xl flex flex-col gap-4 relative">
                        
                        <div className="flex justify-between items-center pb-3 border-b border-black/10">
                            <div className="flex items-center gap-2">
                                <span className="bg-[#f09550] text-white px-2 py-0.5 rounded text-xs font-bold">DIRECTORY</span>
                                <h2 className="text-xl font-bold text-black">All Weather Guidance</h2>
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(false)} 
                                className="w-8 h-8 flex items-center justify-center bg-black/5 hover:bg-black/10 rounded-full text-black font-bold transition-colors cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex flex-col gap-3 overflow-y-auto max-h-[60vh] pr-2">
                            {allGuidance.map((item, idx) => (
                                <div key={idx} className="bg-white border border-black/10 p-4 rounded-xl flex flex-col gap-2 shadow-xs">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-[#f09550] uppercase tracking-wider">{item.type}</span>
                                    </div>
                                    <p className="text-base font-medium text-black">{item.headline}</p>
                                    <div className="flex flex-wrap gap-1.5 mt-1">
                                        {item.tags.map(tag => (
                                            <span key={tag} className="text-xs font-semibold px-2.5 py-1 bg-black/5 text-black/70 rounded-full border border-black/5">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="w-full bg-[#f09550] text-white py-2.5 rounded-xl font-bold hover:opacity-90 transition-opacity mt-2 shadow-sm cursor-pointer"
                        >
                            Close Guidance
                        </button>

                    </div>
                </div>
            )}
        </>
    );
};