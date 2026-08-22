interface ThemeCardProps{
    src: string;
    alt?: string;
    onClick: () => void;
    videoSrc?: string;
}
export const ThemeCard = ({ src, alt, onClick,videoSrc }: ThemeCardProps) => {
    return (
        <div
            onClick={onClick}
            className="flex-1 relative min-w-[250px] h-[200px] border-2 border-[var(--setting-border)] rounded-lg overflow-hidden cursor-pointer hover:border-white/40 hover:scale-104 transition-all duration-400 ease-in-out" 
        >
          {videoSrc ? (
                <video 
                    className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none scale-[1.35]"
                    src={videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            ) : (
                <img 
                    className="h-full w-full object-cover object-center" 
                    src={src} 
                    alt={alt || "theme-image"} 
                    loading="eager"
                    fetchPriority="high"
                />
            )}

        </div>
    );
}