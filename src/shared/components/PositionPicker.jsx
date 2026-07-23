export const PositionPicker = ({ value, onChange }) => {
 
    return (
        <div className="w-14 h-10 bg-black/30 rounded-md p-1 grid grid-cols-2 grid-rows-2 gap-1 border border-white/10">
            
            <div 
                onClick={() => onChange('top-left')}
                className={`rounded-[3px] cursor-pointer transition-colors duration-200 ${value === 'top-left' ? 'bg-cyan-400' : 'bg-white/10 hover:bg-white/20'}`}
            ></div>
            
           
            <div 
                onClick={() => onChange('top-right')}
                className={`rounded-[3px] cursor-pointer transition-colors duration-200 ${value === 'top-right' ? 'bg-cyan-400' : 'bg-white/10 hover:bg-white/20'}`}
            ></div>
            
        
            <div 
                onClick={() => onChange('bottom-left')}
                className={`rounded-[3px] cursor-pointer transition-colors duration-200 ${value === 'bottom-left' ? 'bg-cyan-400' : 'bg-white/10 hover:bg-white/20'}`}
            ></div>
            
         
            <div 
                onClick={() => onChange('bottom-right')}
                className={`rounded-[3px] cursor-pointer transition-colors duration-200 ${value === 'bottom-right' ? 'bg-cyan-400' : 'bg-white/10 hover:bg-white/20'}`}
            ></div>
        </div>
    );
};