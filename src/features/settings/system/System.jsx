import { useState, useRef } from "react";
import { useOsStore } from "../../../shared/store/useOsStore";
import { Switch } from "../../../shared/components/ToggleBtn";
export const SystemSettings = () => {
    const setBg = useOsStore((state) => state.setBg);
    const addNotification = useOsStore((state) => state.addNotification);
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const processFile = (file) => {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            addNotification("Please select an valid image", "warning");
            return;
        }

        const Max_Mb = 2;
        if (file.size > Max_Mb*1024*1024) {
            addNotification("Image too large ", "error");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
           setBg(e.target.result);
            addNotification("Walpaper Changed", "success");
        };
        reader.onerror = () => {
            addNotification("Failed to read image", "error");
        }
        reader.readAsDataURL(file);

    }
    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        processFile(file);
        e.target.value = "";

    }
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        processFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    return (
        <div className="h-full w-full flex flex-col p-6 overflow-y-auto gap-3.5">
            <div className="w-[80%] mx-auto flex flex-col gap-3">
                <span className="text-white/60 uppercase tracking-wider text-sm font-semibold">
                    Background Preferences
                </span>

                <div className="flex flex-row gap-4 h-50 w-full">
                    <div
                        onClick={() => {
                           setBg("/stage1bg.png");
                            addNotification("Wallpaper Changed", "success")
                        }}
                        className="flex-1 border-2 border-white/30 rounded-lg overflow-hidden cursor-pointer hover:border-cyan-400 hover:scale-105 transition-all duration-400 ease-in-out"
                    >
                        <img className="h-full w-full object-cover object-center" src="/stage1bg.png" alt="bg1" />
                    </div>

                    <div
                        onClick={() => {
                           setBg("/stage2bg.png");
                            addNotification("Wallpaper Changed", "success")
                        }}
                        className="flex-1 border-2 border-white/30 rounded-lg overflow-hidden cursor-pointer hover:border-cyan-400 hover:scale-105 transition-all duration-400 ease-in-out"
                    >
                        <img className="h-full w-full object-cover object-center" src="/stage2bg.png" alt="bg2" />
                    </div>

                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={`bgPicker cursor-pointer flex-1 flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-8 transition-colors ${isDragging ? "border-cyan-400 bg-cyan-400/10" : "border-white/20"
                            }`}
                    >
                        <i className="ri-add-line text-3xl text-white/60"></i>
                        <span className="text-white/50 text-sm">
                            Drag & drop an image, or click to browse
                        </span>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                    </div>
                </div>
            </div>
            <div className=" date h-[40%] w-[80%]
            mx-auto ">
                <div className="Dateholder h-full w-[62%] border border-white/60 rounded-[0.5rem] p-3 bg-zinc-900">
                <div className="DateNdTime h-auto w-full">
                    <span className="text-white/60">Date and Time</span>
                    <Switch/>
                    
                </div>
                </div>
            </div>
        </div>
    )
}