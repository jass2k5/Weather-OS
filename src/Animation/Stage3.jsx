import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useOsStore } from "../store/useOsStore";

const Api_Key = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1";

const fetchLocationTelemetry = async(locationName) =>{
    try{
        const response = await axios.get(`${BASE_URL}/current.json`,{
            params:{

                key: Api_Key,
                q:locationName,
                aqi: "yes"
            }
        });

        return response.data;

    }catch(error){

        console.error("API CALL FAILED:",error);
        throw error;
    }};


export const RunAct3 =({onComplete}) =>{

    const [inputValue,setInputValue] = useState("");
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const RevalPannel = useRef(null);

    const setSystemTelemetry = useOsStore((state) => state.setSystemTelemetry);

    const { mutate,isPending,isSuccess,isError ,error} = useMutation({
        mutationFn:fetchLocationTelemetry,
        onSuccess: (data) =>{
            setSystemTelemetry(inputValue,data);
        }
    });
 
}