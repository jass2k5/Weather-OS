import { useEffect, useRef, useState } from "react";
import Map from "react-map-gl/maplibre";
import { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useOsStore } from "../../shared/store/useOsStore";


const getCoord = (lat,lon) => {
    if (lat != null && lon != null) return { lat,lon };
    return null;
};

export const TerminalMap = () => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [mapError, setMapError] = useState("");
    const containerRef = useRef(null);
    const mapRef = useRef(null);
    const flyby = useOsStore((state)=>state.mapSetting?.terminalMapTheme?.flyby);
    const marker = useOsStore((state)=>state.mapSetting?.terminalMapTheme?.marker);
    const theme = useOsStore((state)=>state.mapSetting?.terminalMapTheme?.theme)
    const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY;
    const mapStyleUrl = theme === "light"? `https://api.maptiler.com/maps/topo-v4/style.json?key=${MAPTILER_KEY}`:`https://api.maptiler.com/maps/dataviz-dark/style.json?key=${MAPTILER_KEY}`;
    const lat = useOsStore((state) => state.telemetryData?.location?.lat);
    const lon = useOsStore((state)=>state.telemetryData?.location?.lon);
    const coord = getCoord(lat,lon);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => mapRef.current?.getMap().resize());
        if (containerRef.current) resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);


  useEffect(() => {
        
        if (isMapLoaded && coord) {
            
            if (flyby) {
                mapRef.current.getMap().flyTo({
                    center: [coord.lon, coord.lat],
                    zoom: 12,
                    duration: 2500,
                    essential: true,
                });
            } else {
             
                mapRef.current.getMap().jumpTo({
                    center: [coord.lon, coord.lat],
                    zoom: 12
                });
            }
        }
    }, [lat,lon, isMapLoaded,flyby]);

    return (
        <div ref={containerRef} className="mapContainer relative h-full w-full overflow-hidden bg-slate-950">
            {!isMapLoaded && (
                <div
                    className="absolute inset-0 z-50 flex flex-col items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)" }}
                >
                    <SkeletonTheme baseColor="rgba(255,255,255,0.05)" highlightColor="rgba(255,255,255,0.15)">
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
                        requestAnimationFrame(() => event.target.resize());
                        setIsMapLoaded(true);
                    }}
                    onError={() => setMapError("MAP STYLE LOAD FAILED")}
                    style={{ width: "100%", height: "100%" }}>
                    {coord && marker && (
                        <Marker
                            longitude={coord.lon}
                            latitude={coord.lat}
                            color="rgba(255, 0, 0, 0.867)"
                            anchor="bottom"
                        />
                    )}
                </Map>
            </div>
        </div>
    );
};
