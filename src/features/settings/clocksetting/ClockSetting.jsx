import { useState, useRef } from "react";
import { useOsStore } from "../../../shared/store/useOsStore";
import { Switch } from "../../../shared/components/ToggleBtn";
import { Stepper } from "../../../shared/components/ArrowStepper";
import { SettingRow } from "../../../shared/components/SettingRow";
import { DayNightSwitch } from "../../../shared/components/ThemeBtn";
import { PositionPicker } from "../../../shared/components/PositionPicker";
import { SettingGroup } from "../../../shared/components/SettingGroup";
import { ThemeContainer } from "../../../shared/components/ThemeContainer";
import { ThemeCard } from "../../../shared/components/ThemeCard";
const Clockthemes = [{ id: "night", src:"./NightVideo.mp4"  ,key:"liveNight"},
{id:"day",src:"./DayVideo.mp4",key:"liveDay"}
]
export const ClockSetting = () => {
    const clockSetting = useOsStore((state) => state.clockSetting);
    const setClockSetting = useOsStore((state) => state.setClockSetting);

    return (
        <div className="ClockSet w-full flex flex-col p-6 gap-3.5">
            <ThemeContainer title="live background for cards">
               {Clockthemes.map(Clock=>(
                 <ThemeCard
                    key={Clock.id}
                    onClick={() => {
                      const value = clockSetting[Clock.key];
                      setClockSetting(Clock.key,!value)
                    }}
                    videoSrc={Clock.src}
                    
                    alt={"ClockBgVideo"}
                />
               ))}
            </ThemeContainer>
        </div>
    )
}
