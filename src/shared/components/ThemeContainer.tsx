import {ReactNode} from 'react';
interface ThemeContainerProps{
    title:string,
    children:ReactNode;
}
export const ThemeContainer = ({ title, children }:ThemeContainerProps) => {
    return (
        <div className="w-[80%] mx-auto flex flex-col gap-3">
            <span className="text-[var(--title-setting)] uppercase tracking-wider  text-sm font-semibold">
                {title}
            </span>
            <div className="flex flex-wrap gap-4 w-full">
                {children}
            </div>
        </div>
    );
};