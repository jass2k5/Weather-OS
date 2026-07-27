export const ThemeContainer = ({ title, children }) => {
    return (
        <div className="w-[80%] mx-auto flex flex-col gap-3">
            <span className="text-white/60 uppercase tracking-wider  text-sm font-semibold">
                {title}
            </span>
            <div className="flex flex-wrap gap-4 w-full">
                {children}
            </div>
        </div>
    );
};