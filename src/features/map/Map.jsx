import { useEffect, useRef, useState } from "react";
import Map from "react-map-gl/maplibre";
import { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { NavigationControl } from "react-map-gl/maplibre";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useOsStore } from "../../shared/store/useOsStore";
import { Searchbar } from "./Searchbar";
import { Text } from "./Text";
import gsap from "gsap";


const getCoord = (data) => {
    const loc = data?.location || data?.coord;
    if (loc?.lat != null && loc?.lon != null) return { lat: loc.lat, lon: loc.lon };
    return null;
};

export const WeatherMap = () => {
    const windowOrder = useOsStore((state)=> state.windowOrder);
    const myZIndex = 10 + windowOrder.indexOf('map');
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [mapError, setMapError] = useState("");
    const containerRef = useRef(null);
    const mapRef = useRef(null);
    const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY;
    const mapSetting = useOsStore((state)=> state.mapSetting);
    const apps = useOsStore((state)=>state.apps)

    const mapThemes = {
    dark: `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${MAPTILER_KEY}`,
    light: `https://api.maptiler.com/maps/topo-v4/style.json?key=${MAPTILER_KEY}`,
    satellite: `https://api.maptiler.com/maps/satellite/style.json?key=${MAPTILER_KEY}`
};
    const mapStyleUrl = mapSetting?.theme === "dark"?mapThemes.dark:mapSetting.theme === "light"?mapThemes.light:mapThemes.satellite

    const closeApp = useOsStore((state) => state.closeApp);

    const isClosing = useOsStore((state)=>state.isClosing);
    const telemetryData = useOsStore((state) => state.telemetryData);
    const coord = getCoord(telemetryData);
    const addNotification = useOsStore((state) => state.addNotification); 

    useEffect(() => {
        const coord = getCoord(telemetryData);
        const currentAqi = telemetryData?.current?.air_quality?.['us-epa-index'];
        
        if (isMapLoaded && coord) {
            if (mapSetting?.flyby) {
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
    }, [telemetryData, isMapLoaded, mapSetting?.flyby]);
    
    useEffect(()=>{
        if(!mapError) return;
       let timer = setTimeout(() => {
         addNotification(`${mapError}`,"warning")
       },2000);
       return ()=> clearTimeout(timer);
    },[mapError])

    

    return (
        <div ref={containerRef} style={{zIndex:myZIndex}} className="mapContainer relative h-full w-full overflow-hidden bg-slate-950">
            {!isMapLoaded && (
                <div
                    className="absolute inset-0 z-50 flex flex-col items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)"}}
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
                {isMapLoaded && <Searchbar />}
                {isMapLoaded && <Text />}
                <Map
                    ref={mapRef}
                    initialViewState={{ longitude: 0, latitude: 20, zoom: 1.5 }}
                    mapStyle={mapStyleUrl}
                    onLoad={(event) => {
                        event.target.resize();
                        setIsMapLoaded(true);
                    }}
                    onError={() => setMapError("MAP STYLE LOAD FAILED")}
                    style={{ width: "100%", height: "100%" }}
                >
                    {coord && mapSetting?.marker && (
                        <Marker
                            longitude={coord.lon}
                            latitude={coord.lat}
                            color="rgba(255, 255, 0, 0.769)"
                            anchor="bottom"
                        />
                    )}
                    {mapSetting?.Navigations && (
                        <NavigationControl
                        position="bottom-right"
                        showCompass={true}
                        showZoom={true}
                        visualizePitch={true}
                    />
                    )}
                </Map>
            </div>
        </div>
    );
};

