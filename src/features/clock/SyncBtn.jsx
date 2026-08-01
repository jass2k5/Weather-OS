import { useState } from "react";
import { useOsStore } from "../../shared/store/useOsStore";
import { useQueryClient, useIsFetching } from "@tanstack/react-query";
export const SyncBtn = ({city}) => {
  const addNotification = useOsStore((state) => state.addNotification);
  const queryClient = useQueryClient();
  const isSyncing = useIsFetching({ queryKey: ["syncWeather", city] });
 const handleclick = async () => {
    if (isSyncing > 0) return;

    // 1. THE REACT QUERY FIX: Look inside the global cache and allow fuzzy matching (exact: false)
    const activeQuery = queryClient.getQueryCache().find({ 
        queryKey: ["syncWeather", city], 
        exact: false 
    });

    // 2. Safely grab the timestamp from that specific query
    const lastUpdated = activeQuery?.state?.dataUpdatedAt ?? 0;
    
    const timePassed = Date.now() - lastUpdated;
    const fifteenMinutes = 1000 * 60 * 15;

    // 3. The Math Check
    if (lastUpdated > 0 && timePassed < fifteenMinutes) {
      const minsLeft = Math.ceil((fifteenMinutes - timePassed) / 60000);
      addNotification(`${city} is already fresh! Please wait ${minsLeft} mins.`, "warning");
      return;
    }

    try {
      addNotification(`Syncing ${city}...`, "info");
      
      // 4. Force sync with exact: false so it catches it no matter what
      await queryClient.invalidateQueries({ 
          queryKey: ["syncWeather", city],
          exact: false 
      });
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div  className="generate-btn-wrapper absolute top-[20%] right-[2%]">
      <div className="button-wrap">
        <button onClick={handleclick} disabled={isSyncing > 0}>
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
