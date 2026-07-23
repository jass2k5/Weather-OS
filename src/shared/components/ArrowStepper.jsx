
export const Stepper = ({ value, onChange, min = 0, max = 50 }) => {
    
    const handleDecrease = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    const handleIncrease = () => {
        if (value < max) {
            onChange(value + 1);
        }
    };

    return (
        <div className="flex items-center bg-black/40 rounded-lg p-1 border border-white/10">
            {/* Decrease Button */}
            <button 
                type="button"
                onClick={handleDecrease}
                disabled={value <= min}
                className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/10 text-white/50 hover:text-white transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"/>
                </svg>
            </button>
            
            {/* Display Value */}
            <span className="text-white font-mono text-sm w-8 text-center select-none">
                {value}
            </span>
            
            {/* Increase Button */}
            <button 
                type="button"
                onClick={handleIncrease}
                disabled={value >= max}
                className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/10 text-white/50 hover:text-white transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"/>
                </svg>
            </button>
        </div>
    );
};