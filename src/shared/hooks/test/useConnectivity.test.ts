import { describe, it, expect, beforeEach } from 'vitest';
import { render, renderHook } from '@testing-library/react';
import {useConnectivity} from '../useConnectivity'
import { useOsStore } from '../../store/useOsStore';

describe("Connectivity test for online offline notification",()=>{
    beforeAll(() => {
        useOsStore.setState({
            notificationSetting: { enabled: true, sound: false }
        });
    });
    beforeEach(() => {
        useOsStore.setState({ activeNotifications: [] });
    });

    it("Triggers a Offline notification when users computers lose internet connection",()=>{
        renderHook(()=> useConnectivity());
        window.dispatchEvent(new Event("offline"));
        const notification = useOsStore.getState().activeNotifications;
        expect(notification.length).toBe(1);
        expect(notification[0].message).toBe("Connection Lost!");
    });
    it("Triggers a Online notification when users computers gain internet connection",()=>{
        renderHook(()=>useConnectivity());
        window.dispatchEvent(new Event("online"));
        const notification = useOsStore.getState().activeNotifications;
        expect(notification.length).toBe(1);
        expect(notification[0].message).toBe("Connection Gained!");
    });
    it("cleans up event listeners on unmount", () => {
        const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
        const { unmount } = renderHook(() => useConnectivity());
        unmount();
        expect(removeEventListenerSpy).toHaveBeenCalledWith("offline", expect.any(Function));
        expect(removeEventListenerSpy).toHaveBeenCalledWith("online", expect.any(Function));
        removeEventListenerSpy.mockRestore();
    });
})
