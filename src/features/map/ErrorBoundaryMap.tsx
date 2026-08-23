import { FallbackProps } from 'react-error-boundary';
export const MapCrashFallback = ({ error, resetErrorBoundary }:FallbackProps) => {
    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] text-red-500 font-mono p-4 text-center h-full w-full rounded-2xl border border-red-900/50">
            <i className="ri-alert-fill text-4xl mb-2 text-red-600"></i>
            <h3 className="text-lg font-bold tracking-widest text-white">SYSTEM_FAILURE: MAP_MODULE</h3>
            
            <div className="text-xs text-red-400/70 mt-2 bg-red-900/20 p-2 rounded max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {(error as Error).message}
            </div>
            
            <button 
                onClick={resetErrorBoundary} 
                className="mt-4 px-4 py-1.5 bg-red-900/30 hover:bg-red-900/60 border border-red-700 rounded transition-colors text-white text-sm"
            >
                REBOOT_MODULE
            </button>
        </div>
    );
};