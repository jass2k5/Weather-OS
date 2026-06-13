import { useState } from "react"
import { BootSequence } from "./components/BootSequence"
export const App = ()=>{

  return(
    <div className=" main h-screen w-screen bg-black text-white flex justify-center items-center relative">
      <BootSequence/>
    </div>
  )
}
