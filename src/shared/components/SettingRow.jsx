// SettingRow Component
export const SettingRow = ({ title, subtitle, control, showDivider = true }) => {
    return (
        <>
            <div className="flex justify-between items-center p-3">
                <div className="flex flex-col justify-center items-start">
                    <span className="text-white">{title}</span>
                    <span className="text-white/50 text-xs">{subtitle}</span>
                </div>
                
                <div>
                    {control}
                </div>
            </div>

            {showDivider && (
                <div className="h-[1px] w-full bg-white/10 my-0.5"></div>
            )}
        </>
    );
};