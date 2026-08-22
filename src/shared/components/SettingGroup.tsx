import {ReactNode} from 'react';
interface SettingGroupProps{
    children:ReactNode;
}
export const SettingGroup = ({ children }:SettingGroupProps) => {
    return (
        <div className="flex-1 min-w-[340px] rounded-[0.8rem] bg-[var(--setting-bg)] border border-[var(--setting-border)] flex flex-col transition-colors duration-300">
            {children}
        </div>
    );
};