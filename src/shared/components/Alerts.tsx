interface AlertProps{
    paragraph:string;
    variant:"warning"|"info"|"error";
}
export const Alerts = ({ paragraph, variant }:AlertProps) => {
    return (
        <div className={`w-[80%] mx-auto mt-auto shrink-0 flex items-center gap-2 rounded-lg border px-4 py-2.5 transition-colors duration-300 ${
            variant === "warning" ? "border-yellow-500/30 bg-yellow-500/10" : 
            variant === "info" ? "border-blue-500/30 bg-blue-500/10" : 
            "border-red-500/30 bg-red-500/10"
        }`}>
           
            <i className={`ri-error-warning-fill text-lg mt-0.5 ${
                variant === "warning" ? "text-yellow-500" : 
                variant === "info" ? "text-blue-500" : 
                "text-red-500"
            }`}></i>
            
            <span className="text-[var(--setting-title)] opacity-80 text-sm leading-snug transition-colors duration-300">
                {paragraph}
            </span>
        </div>
    )
}