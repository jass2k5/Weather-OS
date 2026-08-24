import { useOsStore } from "../../../shared/store/useOsStore";
import { SettingGroup } from "../../../shared/components/SettingGroup";
import { SettingRow } from "../../../shared/components/SettingRow";
import { Switch } from "../../../shared/components/ToggleBtn";
import { Reset } from "../../../shared/components/ResetBtn";
export const NotifySet = ()=>{
    const enabled= useOsStore((state)=>state.notificationSetting.enabled);
    const sound = useOsStore((state)=>state.notificationSetting.sound);
    const setnotificationSetting = useOsStore((state)=>state.setnotificationSetting)
    const clearNotification = useOsStore((state)=>state.clearNotification)

    return(
        <div className="NotifySet w-full flex flex-col p-6 gap-3.5">

            <div className="Set min-h-[25%] h-auto w-[80%] flex flex-wrap  gap-4 mx-auto mt-6">
                <SettingGroup>
                    <SettingRow
                    title="Enable Notifications"
                    subtitle="enable and disable the notifications"
                    control={
                        <Switch
                        checked={enabled}
                        onChange={(e)=>setnotificationSetting('enabled',e.target.checked)}
                        />
                    }
                    />
                    <SettingRow
                    title="Enable Notifications Sound"
                    subtitle="enable and disable the notifications Sound"
                    control={
                        <Switch
                        checked={sound}
                        onChange={(e)=>setnotificationSetting('sound',e.target.checked)}
                        />
                    }
                    />
                    <SettingRow
                    title="Clear Notification History"
                    subtitle="notification app data"
                    showDivider={false}
                    control={
                        <Reset
                        onClick={clearNotification}/>
                    }
                    />
                </SettingGroup>
            </div>
        </div>
    )
}