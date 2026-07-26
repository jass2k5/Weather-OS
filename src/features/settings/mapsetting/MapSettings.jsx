import { useOsStore } from "../../../shared/store/useOsStore"
import { useState, useRef } from "react";
import { Switch } from "../../../shared/components/ToggleBtn";
import { Stepper } from "../../../shared/components/ArrowStepper";
import { SettingRow } from "../../../shared/components/SettingRow";
import { DayNightSwitch } from "../../../shared/components/ThemeBtn";
import { SettingGroup } from "../../../shared/components/SettingGroup";
import { ThemeContainer } from "../../../shared/components/ThemeContainer";
import { ThemeCard } from "../../../shared/components/ThemeCard";
  const Themes = [
        { id: "theme1", src: "/dark.png", theme: "dark" },
        { id: "theme2", src: "/light.webp", theme: "light" },
        { id: "theme3", src: "/satellite.png", theme: "satellite" }
    ]

export const MapSet = () => {
    const mapSetting = useOsStore((state) => state.mapSetting);
    const setMapSetting = useOsStore((state) => state.setMapSetting);
    const addNotification = useOsStore((state) => state.addNotification);
  
    return (
        <div className="MapSet  w-full flex flex-col p-6 gap-3.5">


            <ThemeContainer title={"Map Themes"}>
                {Themes.map((theme)=>(
                    <ThemeCard 
                key={theme.id}
                src={theme.src}
                
                onClick={() => {
                            setMapSetting('theme',theme.theme)
                            addNotification("Map Theme Changed To Dark", "success")
                        }}
                        />
                ))}
            </ThemeContainer>


            <div className="Set  min-h-[25%] h-auto w-[80%] flex flex-wrap  gap-4 mx-auto mt-6">
                <SettingGroup>
                    <SettingRow
                        title="Show Navigation"
                        subtitle="zoom and axis controller"
                        control={
                            <Switch
                                checked={mapSetting?.Navigations}
                                onChange={(e) =>
                                    setMapSetting('Navigations', e.target.checked)
                                }
                            />
                        }
                    />
                    <SettingRow
                        title="Fly By"
                        subtitle="Flyby animation on telemetryData change"
                        control={
                            <Switch
                                checked={mapSetting?.flyby}
                                onChange={(e) =>
                                    setMapSetting('flyby', e.target.checked)
                                }
                            />
                        }
                    />
                    <SettingRow
                        title="Marker"
                        subtitle="Marker on searched area or Capital State"
                        control={
                            <Switch
                                checked={mapSetting?.marker}
                                onChange={(e) =>
                                    setMapSetting('marker', e.target.checked)
                                }
                            />
                        }
                        showDivider={false}
                    />

                </SettingGroup>

                <SettingGroup>
                    <SettingRow
                        title="Terminal Map Theme "
                        subtitle="Resizeable map theme"
                        control={
                            <DayNightSwitch
                                checked={mapSetting?.terminalMapTheme.bol}
                                onChange={(e) => setMapSetting("terminalMapTheme", {
                                    ...mapSetting.terminalMapTheme,
                                    bol: e.target.checked,
                                    theme: e.target.checked ? "dark" : "light"
                                })

                                }
                            />
                        }
                    />
                    <SettingRow
                        title="Fly By"
                        subtitle="Flyby animation on telemetryData change"
                        control={
                            <Switch
                                checked={mapSetting?.terminalMapTheme.flyby}
                                onChange={(e) =>
                                    setMapSetting('terminalMapTheme', {
                                        ...mapSetting.terminalMapTheme,
                                        'flyby': e.target.checked
                                    })
                                }
                            />
                        }
                    />
                    <SettingRow
                        title="Marker"
                        subtitle="Marker on searched area or Capital State in Map inside terminal"
                        control={
                            <Switch
                                checked={mapSetting?.terminalMapTheme?.marker}
                                onChange={(e) =>
                                    setMapSetting('terminalMapTheme', {
                                        ...mapSetting.terminalMapTheme,
                                        'marker': e.target.checked
                                    })
                                }
                            />
                        }
                        showDivider={false}
                    />
                </SettingGroup>
            </div>
            <div className="w-[80%] mx-auto mt-auto shrink-0 flex items-center gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-4 py-2.5">
                <i className="ri-error-warning-fill text-yellow-500 text-lg mt-0.5"></i>
                <span className="text-white/60 text-sm leading-snug">
                    Disabling the flyby animation and marker will decrease the load on the backend.
                </span>
            </div>
        </div>
    )
}
