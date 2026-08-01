import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState, useEffect, useRef } from "react";
import { useOsStore } from "../../shared/store/useOsStore";
import { useSearchLocation } from "../../shared/hooks/useSearchLocation";

export const Searchbar = () => {
    const [inputvalue, setInputValue] = useState("");
    const [prev, setPrev] = useState(false);
    
   
    const removeSearchItem = useOsStore((state) => state.removeSearchItem);
    const telemetryDataloc = useOsStore((state) => state.telemetryData?.location?.name);
    const searchHistory = useOsStore((state) => state.searchHistory);
    const addNotification = useOsStore((state) => state.addNotification);
 
    const { searchLocation, isSearching } = useSearchLocation();
    
   
    const formRef = useRef(null);
    const searchWrapperRef = useRef(null);
    const isFirstRender = useRef(true);
    const inputRef = useRef(null); 


    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlkey || e.metakey) && e.key.toLowerCase() === 'f') {
                e.preventDefault();
                if (inputRef.current) {
                    inputRef.current.focus();
                    setPrev(true);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

   
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
                setPrev(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (telemetryDataloc) searchLocation(telemetryDataloc);
    }, []);

    useGSAP(() => {
        if (isFirstRender.current) {
            const tl = gsap.timeline();
            gsap.set(".arrow", { opacity: 0, y: 30 });
            gsap.set(".form", { width: 0, opacity: 0, overflow: "hidden" });
            gsap.set(".search", { opacity: 0, scale: 0.5 });

            tl.to(".form", { width: "100%", opacity: 1, duration: 1, ease: "power3.out" })
              .to(".search", { opacity: 1, scale: 1, duration: 1, ease: "back.out(2)" });
            
            isFirstRender.current = false;
            return;
        }

        if (isSearching) {
            gsap.to(".search", { opacity: 0, y: -30, duration: 0.3, ease: "power3.inOut" });
            gsap.fromTo(".arrow", { opacity: 0, y: 30 }, { y: 0, opacity: 1, duration: 0.3, ease: "power3.inOut" });
        } else {
            gsap.to(".arrow", { y: -30, opacity: 0, duration: 0.4, ease: "back.in(1.5)" });
            gsap.fromTo(".search", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.5)", delay: 0.1 });
        }
    }, { scope: formRef, dependencies: [isSearching] });

    const handlesumbit = (e) => {
        e.preventDefault();
        let cleanvalue = inputvalue.trim();
        if (!cleanvalue) return;
        setPrev(false);
        searchLocation(cleanvalue);
    };

    return (
        <div ref={searchWrapperRef} className="expandsearch">
            <div ref={formRef} className="SearchContainer">
                <div className="logoAndbar">
                    <form onSubmit={handlesumbit} className="form">
                        <input 
                            ref={inputRef}
                            type="text"
                            className="input"
                            value={inputvalue}
                            placeholder="Enter Your Location (Ctrl+F)"
                            onClick={() => setPrev(true)}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </form>
                    <div className="holder">
                        <i onClick={handlesumbit} className="ri-search-line search"></i>
                        <i className="ri-send-plane-fill arrow"></i>
                    </div>
                </div>
            </div>

            <div className={`PrevSearches flex-col justify-center items-start p-4 border-2 border-white/80 rounded-2xl bg-white text-black ${prev && searchHistory.length > 0 ? "flex" : "hidden"} `}>
                {searchHistory.map((loc, index) => (
                    <div
                        key={`${loc.city}-${index}`}
                        onClick={() => {
                            setInputValue(loc.city);
                            searchLocation(loc.city);
                            setPrev(false);
                        }}
                        className="flex items-center justify-between holder h-full w-full holder"
                    >
                        <div className="flex flex-row items-center gap-0.5 ">
                            <i className="ri-history-line"></i>
                            <span>{loc.city}, {loc.country}</span>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                removeSearchItem(loc.city);
                                addNotification(`${loc.city} removed from history`, "info");
                            }}
                        >
                            <i className="ri-close-line text-lg"></i>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};