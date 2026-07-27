import { useOsStore } from "../../../shared/store/useOsStore";
import { Switch } from "../../../shared/components/ToggleBtn";
import { SettingRow } from "../../../shared/components/SettingRow";
import { SettingGroup } from "../../../shared/components/SettingGroup";
import { ThemeContainer } from "../../../shared/components/ThemeContainer";
import { ThemeCard } from "../../../shared/components/ThemeCard";
import { Alerts } from "../../../shared/components/Alerts";

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
             <div className="Set  min-h-[25%] h-auto w-[80%] flex flex-wrap  gap-4 mx-auto mt-6">

            <SettingGroup>
                <SettingRow
                title="Date&Time Format"
                subtitle="change time format to 24h"
                control={
                    <Switch
                    checked={clockSetting?.format?.bol}
                    onChange={(e)=>{
                        setClockSetting('format',{
                            enabled:e.target.checked,
                            hour:e.target.checked?"24h":"12h"
                        })
                    }}
                    />
                }
                />

                <SettingRow
                title="Temperature Unit"
                subtitle="fahrenheit or celsius"
                control={
                    <Switch
                    checked={clockSetting?.celsius}
                    onChange={(e)=>{
                        setClockSetting("celsius",e.target.checked)
                    }}
                    />
                }

                />
                <SettingRow
                title="Distance Unit"
                subtitle="Km or Miles"
                showDivider = {false}
                control={
                    <Switch
                    checked={clockSetting?.km}
                    showDivider={false}
                    onChange={(e)=>{
                        setClockSetting("km",e.target.checked)
                    }}
                    />
                }

                />

            </SettingGroup>
            </div>
            <Alerts variant="info" paragraph="Click on the videos to enable and disable them in ClockApp" />
            <Alerts variant="warning" paragraph="Video background may affect your CPU usage, depending upon your device"/>

        </div>
    )
}