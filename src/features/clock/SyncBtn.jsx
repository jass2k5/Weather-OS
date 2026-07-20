import { useState } from "react";
import { useOsStore } from "../../shared/store/useOsStore";
export const SyncBtn = () => {

  const syncAllWeather = useOsStore((state) => state.syncAllWeather);
  const [Buttonstate,setButtonstate] = useState("Sync");

  const handleclick = async ()=>{
    if(Buttonstate === "syncing") return;

    try{
      setButtonstate("Syncing");
      await syncAllWeather();
      setButtonstate("Synced");
      setTimeout(() => {
        setButtonstate("Sync");
      }, 4000);
    }catch (error){
      setButtonstate("Sync");
      console.warn(error)
    }

  }
  return (
    <div onClick={()=>{
      handleclick();
    }} className="generate-btn-wrapper absolute top-[20%] right-[2%]">
      <div className="button-wrap">
        <button>
          <span >{Buttonstate}</span>
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
