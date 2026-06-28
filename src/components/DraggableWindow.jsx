import { Rnd } from "react-rnd";

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

export const DraggableWindow = ({ children, title, defaultpos = { x: 300, y: 100 } }) => {

    return (
        <Rnd
            default={{
                x: defaultpos.x,
                y: defaultpos.y,
                width: 1000,
                height: 500,
            }}
            minWidth={300}
            minHeight={250}
            dragHandleClassName="window-header"
            bounds=".desktop"
            resizeHandleStyles={resizeHandleStyles}
            style={{ display: "flex", flexDirection: "column" }}
            className="window-wrapper border border-cyan-500/20 bg-black backdrop-blur-md rounded-[0.6rem] overflow-hidden shadow-2xl">


            <div className="window-header shrink-0 cursor-grab active:cursor-grabbing bg-zinc-800 p-8 flex items-center justify-center relative border-b border-cyan-500/10">

                <div className="flex gap-0.5 absolute left-[1%] top-[30%] gap-1.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500/50"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-green-500/50"></div></div>

                <span className="text-l text-cyan-100/50 font-mono tracking-widest">{title}</span>
            </div>

            <div className="window-content flex-1 min-h-0 relative overflow-hidden">
                {children}
            </div>

        </Rnd>
    )
}
