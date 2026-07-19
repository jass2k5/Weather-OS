import { useState } from "react"
import { BootSequence } from "./components/BootSequence"
import { Desktop } from "./components/Desktop"
import { MouseFollower } from "./components/mouseFollower/MouseFollower"
import { useOsStore } from "./store/useOsStore"
import { useConnectivity } from "./hooks/useConnectivity"
export const App = ()=>{
const isBooted = useOsStore((state) => state.isBooted);
useConnectivity()
  return(
    <div className=" main h-screen w-screen bg-black text-white flex justify-center items-center relative">
      <MouseFollower/>
      {!isBooted && <BootSequence/>}
      {isBooted && <Desktop/>}
    </div>
  )
}
