import { Rnd } from "react-rnd";

export const DraggableWindow=({children, title , defaultpos = {x:50 , y:50}}) =>{

    return(
        <Rnd
        default={{
            x:100,
            y: 80,
            width:800,
            height:500,
        }}
        minWidth={300}
            minHeight={250}
            dragHandleClassName="window-header" 
            bounds=".desktop"
            className="window-wrapper flex flex-col border border-cyan-500/20 bg-gray-900/90 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl">

                
                <div className="window-header cursor-grab active:cursor-grabbing bg-gray-950/50 p-2 flex items-center justify-between border-b border-cyan-500/10">
                <span className="text-xs text-cyan-100/50 font-mono tracking-widest">{title}</span>
                <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                </div>
            </div>

            <div className="window-content grow relative overflow-hidden">
                {children}
            </div>

            </Rnd>
    )
}