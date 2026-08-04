import { useState, useRef } from "react";
import { useOsStore } from "../../../shared/store/useOsStore";
import { Switch } from "../../../shared/components/ToggleBtn";
import { Stepper } from "../../../shared/components/ArrowStepper";
import { SettingRow } from "../../../shared/components/SettingRow";
import { DayNightSwitch } from "../../../shared/components/ThemeBtn";
import { PositionPicker } from "../../../shared/components/PositionPicker";
import { SettingGroup } from "../../../shared/components/SettingGroup";
import { ThemeCard } from "../../../shared/components/ThemeCard";
import { ThemeContainer } from "../../../shared/components/ThemeContainer";

const Wallpapers = [
    {
        id: "firstWalpaper",
        src: "/stage1bg.png",
        alt: "stage1"
    },
    {
        id: "secondWalpaper",
        src: "/stage2bg.png",
        alt: "stage2"
    },
    {
        id: "thirdWalpaper",
        src: "/stage3bg.png",
        alt: "stage3"
    }

]

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
            addNotification("Please select a valid image", "warning");
            return;
        }

        const MAX_MB = 2;
        if (file.size > MAX_MB * 1024 * 1024) {
            addNotification("Image too large", "error");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setBg(e.target.result);
            addNotification("Wallpaper Changed", "success");
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
        <div className="h-full w-full flex flex-col p-6 gap-1">
            <ThemeContainer
                title={"Background Preferences"}
            >



                {Wallpapers.map((wal) => (
                    <ThemeCard
                        key={wal.id}
                        src={wal.src}
                        onClick={() => {
                            setBg(wal.src);
                            addNotification("Wallpaper Changed", "success");
                        }}

                    />
                ))}

                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`bgPicker cursor-pointer flex-1 min-w-[250px] h-[200px] flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-8 transition-colors ${isDragging
                            ? "border-cyan-400 bg-cyan-400/10"
                            : "border-[var(--setting-border)]" 
                        }`}
                >
                    
                    <i className="ri-add-line text-3xl text-[var(--setting-subtitle)] transition-colors"></i>

                    
                    <span className="text-[var(--setting-subtitle)] text-sm text-center transition-colors">
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



            </ThemeContainer>



            <div className="Set  min-h-[25%] h-auto w-[80%] flex flex-wrap  gap-4 mx-auto mt-6">

                <SettingGroup>
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

                    />
                </SettingGroup>



                <SettingGroup>

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

                    />
                </SettingGroup>

                <SettingGroup>
                    <SettingRow
                        title="Date & Time"
                        subtitle="date and time on screen"
                        control={<Switch
                            checked={dateTimeSettings.showDateTime}
                            onChange={(e) => updateDateTimeSetting('showDateTime', e.target.checked)} />}
                    />

                    <SettingRow
                        title="Show Seconds"
                        subtitle="disable & enable seconds on screen"
                        control={<Switch
                            checked={dateTimeSettings.showSeconds}
                            onChange={(e) => updateDateTimeSetting('showSeconds', e.target.checked)} />}
                    />

                    <SettingRow
                        title="Time Format"
                        subtitle="change format to 24h or 12h"
                        control={<Switch
                            checked={dateTimeSettings?.format?.bol}
                            onChange={(e) => updateDateTimeSetting('format', {
                                bol: e.target.checked,
                                hour: e.target.checked ? "24h" : "12h"
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
                                clr: e.target.checked ? "red" : "white"
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
                </SettingGroup>

            </div>
        </div>

    )
}
