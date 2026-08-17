export const timeToMinutes = (timeString?:"string" | null):number => {
  if (!timeString) return 0;// we have this so we can do ?:
  
  const [time, modifier] = timeString.split(" ");
  let [hours, minutes] = time.split(":").map(Number);//why map we converted the string to number array
  
  if (hours === 12) hours = 0; 
  
  if (modifier === "PM") hours += 12;
  
  return (hours * 60) + minutes;
};