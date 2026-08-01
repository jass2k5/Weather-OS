import { useState } from "react";
import { useOsStore } from "../../shared/store/useOsStore";
import { useQueryClient, useIsFetching } from "@tanstack/react-query";
export const SyncBtn = ({city}) => {
  const addNotification = useOsStore((state) => state.addNotification);
  const queryClient = useQueryClient();
  const isSyncing = useIsFetching({ queryKey: ["syncWeather", city] });
  const handleclick = async () => {
    if (isSyncing > 0) return;
    const lastUpdated = queryClient.getQueryState(["syncWeather", city])?.dataUpdatedAt ?? 0;
    const timePassed = Date.now() - lastUpdated;
    const fifteenMinutes = 1000 * 60 * 15;
    if (timePassed < fifteenMinutes) {
      addNotification(`${city} is already fresh! Please wait 15 minutes to sync again.`, "warning");
      return;
    } else {
      try {
        addNotification(`Syncing ${city}...`, "info");
        await queryClient.invalidateQueries({ queryKey: ["syncWeather", city] });
      }catch(err){
        console.warn(err);
      }
    }
  }

  return (
    <div onClick={handleclick} className="generate-btn-wrapper absolute top-[20%] right-[2%]">
      <div className="button-wrap">
        <button disabled={isSyncing > 0}>
          <span>{isSyncing > 0 ? "Syncing..." : "Sync"}</span>
        </button>
        <div className="button-shadow" />
      </div>

      {/* Background Dotted Grid */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}
      >
        <defs>
          <pattern patternUnits="userSpaceOnUse" height={30} width={30} id="dottedGrid">
            <circle fill="rgba(0,0,0,0.15)" r={1} cy={2} cx={2} />
          </pattern>
        </defs>
        <rect fill="url(#dottedGrid)" height="100%" width="100%" />
      </svg>
    </div>
  );
};
