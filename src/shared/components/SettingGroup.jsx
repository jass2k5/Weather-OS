export const SettingGroup = ({ children }) => {
    return (
        <div className="flex-1 min-w-[340px] rounded-[0.8rem] bg-zinc-800 border border-white/50 flex flex-col">
            {children}
        </div>
    );
};