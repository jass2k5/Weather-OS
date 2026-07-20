import { useOsStore } from "../../shared/store/useOsStore"

export const NotificationApp = ()=>{

    const notificationHistory = useOsStore((state)=> state.notificationHistory);
    const windowOrder = useOsStore((state) => state.windowOrder);

    const myZIndex = 10 + windowOrder.indexOf('notification');
    
    return(
        <div style={{zIndex:myZIndex}} className="Notify h-auto rounded-[0.8rem] w-max p-4  bg-[rgba(0,0,0,0.63)] absolute inset-0 flex items-center justify-start flex-col gap-[1rem] overflow-y-auto scrollbar-none">
  
      
            <span className="text-m text-white/60 self-start ">$ tail -f ~/.notifications --follow</span>
            {notificationHistory.length > 0 && notificationHistory.map((notify)=>(
                <div key={`${notify.id}`} className=" w-full h-auto flex items-start justify-start gap-2.5">
                    <span className="text-s text-white/60">{notify.timestamp}</span>
                    <span className={`text-s uppercase  ${notify.type === 'success' && 'text-green-400'} ${notify.type === 'error' && 'text-red-400'} ${notify.type ==='warning' && 'text-yellow-400' } ${notify.type === 'info' && "text-blue-400"} ${notify.type === 'offline' && 'text-red-400'}  ${notify.type === 'online' && 'text-green-400'}`}>[{notify.type}]</span>
                    <span className="text-s ">{notify.message}</span>
                </div>
            ))}

            {notificationHistory.length === 0 && (
                <div>No Notification Yet</div>
            )}

        </div>
    )
}
