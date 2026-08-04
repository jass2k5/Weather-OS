export const SettingRow = ({ title, subtitle, control, showDivider = true }) => {
    return (
        <>
            <div className="flex justify-between items-center p-3">
                <div className="flex flex-col justify-center items-start">
                    <span className="text-[var(--setting-title)] transition-colors duration-300">{title}</span>
                    <span className="text-[var(--setting-subtitle)] text-xs transition-colors duration-300">{subtitle}</span>
                </div>
                
                <div>
                    {control}
                </div>
            </div>

            {showDivider && (
                <div className="h-[1px] w-full bg-[var(--setting-divider)] my-0.5 transition-colors duration-300"></div>
            )}
        </>
    );
};