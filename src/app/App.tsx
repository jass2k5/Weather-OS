import { BootSequence } from "../core/BootSequence"
import { Desktop } from "../views/Desktop"
import { MouseFollower } from "../shared/components/mouseFollower/MouseFollower"
import { useOsStore } from "../shared/store/useOsStore"
import { useConnectivity } from "../shared/hooks/useConnectivity"
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
