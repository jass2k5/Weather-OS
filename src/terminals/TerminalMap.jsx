import { useEffect, useRef, useState } from "react";
import Map from "react-map-gl/maplibre";
import { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useOsStore } from "../store/useOsStore";


const getCoord = (data) => {
    const loc = data?.location || data?.coord;
    if (loc?.lat != null && loc?.lon != null) return { lat: loc.lat, lon: loc.lon };
    return null;
};

export const TerminalMap = () => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [mapError, setMapError] = useState("");
    const containerRef = useRef(null);
    const mapRef = useRef(null);
    const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY;
    const mapStyleUrl = `https://api.maptiler.com/maps/topo-v4/style.json?key=${MAPTILER_KEY}`;
    const telemetryData = useOsStore((state) => state.telemetryData);
    const coord = getCoord(telemetryData);
   
    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => mapRef.current?.getMap().resize());
        if (containerRef.current) resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

  
    useEffect(() => {
        const coord = getCoord(telemetryData);
        if (isMapLoaded && coord) {
            mapRef.current.getMap().flyTo({
                center: [coord.lon, coord.lat],
                zoom: 12,
                duration: 2500,
                essential: true,
            });
        }
    }, [telemetryData, isMapLoaded]);

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
                        event.target.resize();
                        setIsMapLoaded(true);
                    }}
                    onError={() => setMapError("MAP STYLE LOAD FAILED")}
                    style={{ width: "100%", height: "100%" }}>
                        {coord && (
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
