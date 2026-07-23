import { useState, useRef } from "react";
import { useOsStore } from "../../../shared/store/useOsStore";
import { Switch } from "../../../shared/components/ToggleBtn";
import { Stepper } from "../../../shared/components/ArrowStepper";
import { SettingRow } from "./SettingRow";
import { DayNightSwitch } from "../../../shared/components/ThemeBtn";
import { PositionPicker } from "../../../shared/components/PositionPicker";
export const SystemSettings = () => {
    const setBg = useOsStore((state) => state.setBg)
    const addNotification = useOsStore((state) => state.addNotification)
    const fileInputRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const glassSettings = useOsStore((state) => state.glassSettings)
    const updateGlassSetting = useOsStore((state) => state.updateGlassSetting)
    const mouseFollower = useOsStore((state) => state.mouseFollower)
    const updateFollowerSetting = useOsStore((state) => state.updateFollowerSetting)
    const dateTimeSettings = useOsStore((state) => state.dateTimeSettings)
    const updateDateTimeSetting = useOsStore((state) => state.updateDateTimeSetting)

    const processFile = (file) => {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            addNotification("Please select an valid image", "warning");
            return;
        }

        const Max_Mb = 2;
        if (file.size > Max_Mb * 1024 * 1024) {
            addNotification("Image too large ", "error");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setBg(e.target.result);
            addNotification("Walpaper Changed", "success");
        };
        reader.onerror = () => {
            addNotification("Failed to read image", "error");
        }
        reader.readAsDataURL(file);

    }
    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        processFile(file);
        e.target.value = "";

    }
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        processFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    return (
        <div className="h-full w-full flex flex-col p-6 gap-3.5">
            <div className="w-[80%] mx-auto flex flex-col gap-3">
                <span className="text-white/60 uppercase tracking-wider text-sm font-semibold">
                    Background Preferences
                </span>

                <div className="flex flex-wrap gap-4 w-full">
                    <div
                        onClick={() => {
                            setBg("/stage1bg.png");
                            addNotification("Wallpaper Changed", "success")
                        }}
                        className="flex-1 min-w-[250px] h-[200px] border-2 border-white/30 rounded-lg overflow-hidden cursor-pointer hover:border-cyan-400 hover:scale-105 transition-all duration-400 ease-in-out"
                    >
                        <img className="h-full w-full object-cover object-center" src="/stage1bg.png" alt="bg1" />
                    </div>

                    <div
                        onClick={() => {
                            setBg("/stage2bg.png");
                            addNotification("Wallpaper Changed", "success")
                        }}
                        className="flex-1 min-w-[250px] h-[200px] border-2 border-white/30 rounded-lg overflow-hidden cursor-pointer hover:border-cyan-400 hover:scale-105 transition-all duration-400 ease-in-out"
                    >
                        <img className="h-full w-full object-cover object-center" src="/stage2bg.png" alt="bg2" />
                    </div>

                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={`bgPicker cursor-pointer flex-1 min-w-[250px] h-[200px] flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-8 transition-colors ${isDragging ? "border-cyan-400 bg-cyan-400/10" : "border-white/20"
                            }`}
                    >
                        <i className="ri-add-line text-3xl text-white/60"></i>
                        <span className="text-white/50 text-sm">
                            Drag & drop an image, or click to browse
                        </span>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                    </div>
                </div>
            </div>


            <div className="Set  min-h-[25%] h-auto w-[80%] flex flex-wrap items-stretch gap-4 mx-auto mt-6">


                <div className="flex-1 min-w-[440px] rounded-[0.8rem] bg-zinc-800 border border-white/50 flex flex-col">
                    <SettingRow
                        title="Glass Layer"
                        subtitle="glass layer above the Wallpaper"
                        control={
                            <Switch
                                checked={glassSettings?.enabled}
                                onChange={(e) => updateGlassSetting('enabled', e.target.checked)}
                            />
                        }
                    />

                    <SettingRow
                        title="Glass Value"
                        subtitle="change the intensity of blur"
                        control={
                            <Stepper
                                value={glassSettings?.blurValue || 0}
                                min={0}
                                max={20}
                                onChange={(newValue) => updateGlassSetting('blurValue', newValue)}
                            />
                        }
                        showDivider={false}
                    />
                </div>

                <div className="flex-1 min-w-[440px] rounded-[0.8rem] bg-zinc-800 border border-white/50 flex flex-col ">

                    <SettingRow
                        title="Mouse Follower"
                        subtitle="gif following the cursor"
                        control={
                            <Switch
                                checked={mouseFollower?.enabled}
                                onChange={(e) => updateFollowerSetting('enabled', e.target.checked)}
                            />
                        }
                    />

                    <SettingRow
                        title="Scroll Down"
                        subtitle="follower in Clock App"
                        control={
                            <Switch
                                checked={mouseFollower?.clockFollower}
                                onChange={(e) => updateFollowerSetting('clockFollower', e.target.checked)}
                            />
                        }
                        showDivider={false}
                    />
                </div>

                <div className="flex-1 min-w-[440px] rounded-[0.8rem] bg-zinc-800 border border-white/50 flex flex-col">
                    <SettingRow
                        title="Date & Time"
                        subtitle="date and time on screen"
                        control={<Switch
                            checked={dateTimeSettings.showDateTime}
                            onChange={(e)=>updateDateTimeSetting('showDateTime',e.target.checked)} />}
                    />

                    <SettingRow
                        title="Show Seconds"
                        subtitle="disable & enable seconds on screen"
                        control={<Switch
                            checked={dateTimeSettings.showSeconds}
                            onChange={(e)=>updateDateTimeSetting('showSeconds',e.target.checked)} />}
                    />

                    <SettingRow
                        title="Time Format"
                        subtitle="change format to 24h or 12h"
                        control={<Switch 
                            checked={dateTimeSettings?.format?.bol}
                            onChange={(e)=>updateDateTimeSetting('format',{
                                bol:e.target.checked,
                                hour:e.target.checked?"24h":"12h"
                            })}
                        />}
                    />

                    <SettingRow
                        title="Change Color"
                        subtitle="changing color of Date & Time"
                        control={<DayNightSwitch
                            checked={dateTimeSettings?.color?.bol}
                            onChange={(e) => updateDateTimeSetting('color', {
                                bol: e.target.checked,
                                clr: e.target.checked? "#fde047": "white"
                            })}
                        />}

                    />
                    <SettingRow
                        title="Position"
                        subtitle="change the position of date&time"
                        control={<PositionPicker
                            value={dateTimeSettings?.position}
                            onChange={(newPos) => updateDateTimeSetting('position', newPos)} />}
                        showDivider={false}
                    />


                </div>

            </div>
        </div>

    )
}