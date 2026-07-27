 
export const Alerts = ({paragraph,variant})=>{
    return(
        <div className={`w-[80%] mx-auto mt-auto shrink-0 flex items-center gap-2 rounded-lg border  px-4 py-2.5 ${variant === "warning"?"border-yellow-500/20 bg-yellow-500/10":variant === "info"?"border-blue-500/20 bg-blue-500/10":"border-red-500/20 bg-red-500/10"}`}>
                <i className={`ri-error-warning-fill ${variant === "warning"?"text-yellow-500":variant==="info"?"text-blue-500":"text-red-500"}  text-lg mt-0.5`}></i>
                <span className="text-white/60 text-sm leading-snug">
                   {paragraph}
                </span>
            </div>
    )
}