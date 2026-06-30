import { useEffect, useRef, useState } from "react";
import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useOsStore } from "../store/useOsStore";

export const TerminalMap = () => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [mapError, setMapError] = useState("");
    const containerRef = useRef(null);
    const mapRef = useRef(null);
    const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY;
    const mapStyleUrl = `https://api.maptiler.com/maps/topo-v4/style.json?key=${MAPTILER_KEY}`;
    const telemetryData =  useOsStore((state) => state.telemetryData)

    useEffect(() => {
        const resizeMap = () => {
            if (mapRef.current) {
                mapRef.current.getMap().resize();
            }
        };

        const timer = setTimeout(resizeMap, 0);
        const resizeObserver = new ResizeObserver(resizeMap);

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }


        return () => {
            clearTimeout(timer);
            resizeObserver.disconnect();
        };
    }, []);

    //useeffect for the map animation
   useEffect(() => {
        let timer; 

        if (isMapLoaded && telemetryData?.coord && mapRef.current) {
            const { lat, lon } = telemetryData.coord;
            
            const mapInstance =  mapRef.current.getMap();

            timer = setTimeout(() => {
                mapInstance.flyTo({
                    center: [lon, lat],
                    zoom: 12,
                    duration: 2500,
                    essential: true,
                    curve: 1.4
                });
            }, 100); 
        }

        // ✅ FIX 2: You were right! Always clean up your timeouts in React
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [telemetryData, isMapLoaded]);

    return (
        <div ref={containerRef} className="mapContainer relative h-full w-full overflow-hidden bg-slate-950">
            {!isMapLoaded && (
                <div
                    className="absolute inset-0 z-50 flex flex-col items-center justify-center"
                    style={{
                        background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
                        boxShadow: "0 4px 30px rgba(15, 32, 39, 0.4)",
                    }}
                >
                    <SkeletonTheme baseColor="rgba(255, 255, 255, 0.05)" highlightColor="rgba(255, 255, 255, 0.15)">
                        <Skeleton count={1} className="w-full h-full absolute inset-0" />
                        <div className="relative z-10 flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-2 border-cyan-300/30 border-t-cyan-400 rounded-full animate-spin" />
                            <span className="text-cyan-100/70 font-mono tracking-[0.2em] text-xs">
                                {mapError || "INITIALIZING..."}
                            </span>
                        </div>
                    </SkeletonTheme>
                </div>
            )}

            <div className="map-layer w-full h-full absolute inset-0 z-0">
                <Map
                    ref={mapRef}
                    initialViewState={{ longitude: 0, latitude: 20, zoom: 1.5 }}
                    mapStyle={mapStyleUrl}
                    onLoad={(event) => {
                        event.target.resize();
                        setIsMapLoaded(true);
                    }}
                    onError={(event) => {
                        console.error("Map Load Error:", event);
                        setMapError("MAP STYLE LOAD FAILED");
                    }}
                    style={{ width: "100%", height: "100%" }}
                />
            </div>
        </div>
    );
};

