import { useEffect, useRef, useState } from "react";
import Map from "react-map-gl/maplibre";
import { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { NavigationControl } from "react-map-gl/maplibre";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useOsStore } from "../../store/useOsStore";
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
    const mapStyleUrl = `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${MAPTILER_KEY}`;

    const closeApp = useOsStore((state) => state.closeApp);

    const isClosing = useOsStore((state)=>state.isClosing);
    const telemetryData = useOsStore((state) => state.telemetryData);
    const coord = getCoord(telemetryData);
    const addNotification = useOsStore((state) => state.addNotification); 

    useEffect(() => {
        const coord = getCoord(telemetryData);
        const currentAqi = telemetryData?.current?.air_quality?.['us-epa-index'];
        if (isMapLoaded && coord) {
            mapRef.current.getMap().flyTo({
                center: [coord.lon, coord.lat],
                zoom: 12,
                duration: 2500,
                essential: true,
            });
            addNotification(`Telemetry stream active: ${telemetryData?.location?.name}`,"info")
            let timer = setTimeout(() => {
                if(currentAqi<=2){
                    addNotification(`Aqi quality is Good for ${telemetryData?.location?.name}`,"success");
                }else if(currentAqi === 3){
                    addNotification(`Moderate Aqi quality in ${telemetryData?.location?.name}`,"warning");
                }else{
                    addNotification(`Critical: Hazardous AQI! in ${telemetryData?.location?.name}`,"error");
                }
              
            }, 4000);
            
            return ()=> clearTimeout(timer);
        }
    }, [telemetryData, isMapLoaded]);

    useEffect(()=>{
        if(!mapError) return;
       let timer = setTimeout(() => {
         addNotification(`${mapError}`,"warning")
       },2000);
       return ()=> clearTimeout(timer);
    },[mapError])

     useEffect(() => {
        if (!isClosing) return;
        gsap.fromTo(containerRef.current,
            { scale: 1, transformOrigin: "top center" },
            {
                duration: 1,
                scale: 0,
                ease: "power4.inOut",
                opacity: 0,
                onComplete: () => {
                    closeApp("map");
                },
            }
        );
    }, [isClosing]);


    

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
                    {coord && (
                        <Marker
                            longitude={coord.lon}
                            latitude={coord.lat}
                            color="rgba(255, 255, 0, 0.769)"
                            anchor="bottom"
                        />
                    )}
                    <NavigationControl
                        position="bottom-right"
                        showCompass={true}
                        showZoom={true}
                        visualizePitch={true}
                    />
                </Map>
            </div>
        </div>
    );
};

