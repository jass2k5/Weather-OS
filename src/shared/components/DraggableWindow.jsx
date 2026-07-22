import { Rnd } from "react-rnd";
import { useOsStore } from "../store/useOsStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useState } from "react";

const resizeHandleStyles = {
    right: { width: "14px", right: 0, zIndex: 100 },
    left: { width: "14px", left: 0, zIndex: 100 },
    bottom: { height: "14px", bottom: 0, zIndex: 100 },
    top: { height: "14px", top: 0, zIndex: 100 },
    bottomRight: { width: "18px", height: "18px", right: 0, bottom: 0, zIndex: 101 },
    bottomLeft: { width: "18px", height: "18px", left: 0, bottom: 0, zIndex: 101 },
    topRight: { width: "18px", height: "18px", right: 0, top: 0, zIndex: 101 },
    topLeft: { width: "18px", height: "18px", left: 0, top: 0, zIndex: 101 },
};

export const DraggableWindow = ({ children, title, Appid, defaultpos = { x: 300, y: 100 }, isResizable = true, defaultSize = { width: 1000, height: 500 }, minHeight, minWidth }) => {
    const closeApp = useOsStore((state) => state.closeApp);
    const windowRef = useRef(null);
    const focusApp = useOsStore((state) => state.focusApp);
    const windowOrder = useOsStore((state) => state.windowOrder);
    const zIndex = 15 + windowOrder.indexOf(Appid);
    const [size, setSize] = useState(defaultSize);
    const [position, setPosition] = useState(defaultpos);
    const [isMaximized, setIsMaximized] = useState(false);
    const [prevBounds, setPrevBounds] = useState({ size: defaultSize, position: defaultpos });

    gsap.registerPlugin(useGSAP);

    useGSAP(() => {
        gsap.fromTo(windowRef.current, {
            scaleY: 0,
            transformOrigin: "top center",
            opacity: 0
        }, {
            scaleY: 1,
            opacity: 1,
            duration: 0.3,
            ease: "power3.in"
        });
    });

    const handleclose = () => {
        gsap.to(windowRef.current, {
            scaleY: 1.1,
            opacity: 0,
            duration: 0.2,
            ease: "power3.in",
            onComplete: () => {
                closeApp(Appid);
            }
        });
    };
    const handleMinimize = () => {
        setPrevBounds({ size, position });
        setSize({ width: minWidth ?? 300, height: minHeight ?? 250 });
    };
    const handleMaximize = () => {
        if (isMaximized) {
            setSize(prevBounds.size);
            setPosition(prevBounds.position);
            setIsMaximized(false);
        } else {
            setPrevBounds({ size, position });
            setSize({ width: window.innerWidth, height: window.innerHeight });
            setPosition({ x: 0, y: 0 });
            setIsMaximized(true);
        }
    };

    return (
        <Rnd
            // default={{
            //     x: defaultpos.x,
            //     y: defaultpos.y,
            //     width: defaultSize.width,
            //     height: defaultSize.height,
            // }}
            size={size}
            position={position}
            onDragStop={(e, d) => {
                setPosition({ x: d.x, y: d.y });
            }}
            onResizeStop={(e, direction, ref, delta, newPosition) => {
                setSize({
                    width: ref.style.width,
                    height: ref.style.height,
                });
                setPosition(newPosition);
            }}
            onMouseDown={() => focusApp(Appid)}
            minWidth={minWidth ?? 300}
            minHeight={minHeight ?? 250}
            dragHandleClassName="window-header"
            bounds=".desktop"
            enableResizing={isResizable}
            resizeHandleStyles={resizeHandleStyles}
            style={{ display: "flex", flexDirection: "column", zIndex: zIndex }}
            className="window-wrapper pointer-events-auto"
        >
            <div
                ref={windowRef}
                className="w-full h-full flex flex-col border border-cyan-500/20 bg-black backdrop-blur-md rounded-[0.6rem] overflow-hidden shadow-2xl"
            >
                <div className="window-header shrink-0 w-full h-7 cursor-grab active:cursor-grabbing bg-zinc-800 p-4 flex items-center justify-center relative border-b border-cyan-500/10">
                    <div className="flex items-center gap-2 absolute left-[1%] top-[20%] cursor-pointer">
                        <button
                            onClick={() => handleclose()}
                            className="terminal-btn w-4.5 h-4.5 rounded-full bg-red-500 flex items-center justify-center group transition-all duration-75"
                        >
                            <span className="text-[10px] font-bold text-black opacity-0 group-hover:opacity-100">✕</span>
                        </button>

                        <button
                            onClick={() => {
                                handleMinimize()
                            }}
                            className="terminal-btn w-4.5 h-4.5 rounded-full bg-yellow-500 flex items-center justify-center group transition-opacity duration-75">
                            <span className="text-[14px] font-bold text-black opacity-0 group-hover:opacity-100 leading-none pb-0.5">−</span>
                        </button>

                        <button
                            onClick={() => {
                                handleMaximize()
                            }}
                            className="terminal-btn w-4.5 h-4.5 rounded-full bg-green-500 flex items-center justify-center group transition-opacity duration-75">
                            <span className="text-[14px] font-bold text-black opacity-0 group-hover:opacity-100 leading-none">＋</span>
                        </button>
                    </div>

                    <span className="text-l text-cyan-100/50 font-mono tracking-widest">{title}</span>
                </div>

                <div className="window-content flex-1 min-h-0 relative overflow-hidden">
                    {children}
                </div>
            </div>
        </Rnd>
    )
}