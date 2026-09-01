import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useSyncAllWeather } from '../useSyncAllWeather';
import { useOsStore } from '../../store/useOsStore';

vi.mock('axios');

describe("useSyncAllWeather Hook", () => {
    let testQueryClient: QueryClient;

    const initialCityState = {
        city: "London",
        country: "UK",
        tz_id: "Europe/London",
        loc: { lat: 51.52, lon: -0.11 },
        liveTemp: 20.0,
        liveCondition: "Clear",
        humidity: 50,
        wind: 10,
        windDegree: 180,
        visibility: 10,
        feelsLike: 20.0,
        isDay: true,
        aqi: 1
    };

    beforeEach(() => {
        useOsStore.setState({
            searchHistory: [initialCityState],
            activeNotifications: [],
            notificationHistory: [],
            notificationSetting: { enabled: true, sound: false },
            telemetryData: null,
            activeLocation: null
        });

        vi.clearAllMocks();
        vi.useFakeTimers();

        testQueryClient = new QueryClient({
            defaultOptions: { queries: { retry: false, gcTime: 0 } }
        });
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={testQueryClient}>
            {children}
        </QueryClientProvider>
    );

    it("detects a data change, updates the store, and fires the 1-second delayed notification", async () => {
        const changedApiResponse = {
            location: { name: "London", country: "UK", tz_id: "Europe/London", lat: 51.52, lon: -0.11 },
            current: {
                temp_c: 22.5, 
                condition: { text: "Clear" },
                humidity: 50,
                wind_kph: 10,
                wind_degree: 180,
                vis_km: 10,
                feelslike_c: 20.0,
                is_day: 1,
                air_quality: { 'us-epa-index': 1 }
            }
        };
        
        // Intercept axios directly so useQueries picks it up correctly
        vi.mocked(axios.get).mockResolvedValueOnce({ data: changedApiResponse });

        renderHook(() => useSyncAllWeather(), { wrapper });

        // Wrap the timer advance inside act() to satisfy React's state update requirements
        await act(async () => {
            await vi.advanceTimersByTimeAsync(200);
        });

        expect(useOsStore.getState().searchHistory[0].liveTemp).toBe(22.5);

        await act(async () => {
            await vi.advanceTimersByTimeAsync(1000);
        });

        const state = useOsStore.getState();
        const hasSyncNotif = state.activeNotifications.some(n => n.message === "Synced Weather Data For London");
        expect(hasSyncNotif).toBe(true);
    });

    it("does nothing if the background sync returns the exact same data", async () => {
        const identicalApiResponse = {
            location: { name: "London", country: "UK", tz_id: "Europe/London", lat: 51.52, lon: -0.11 },
            current: {
                temp_c: 20.0, 
                condition: { text: "Clear" },
                humidity: 50,
                wind_kph: 10,
                wind_degree: 180,
                vis_km: 10,
                feelslike_c: 20.0,
                is_day: 1,
                air_quality: { 'us-epa-index': 1 }
            }
        };

        vi.mocked(axios.get).mockResolvedValueOnce({ data: identicalApiResponse });

        renderHook(() => useSyncAllWeather(), { wrapper });

        await act(async () => {
            await vi.advanceTimersByTimeAsync(200);
        });

        expect(useOsStore.getState().searchHistory[0].liveTemp).toBe(20);

        await act(async () => {
            await vi.advanceTimersByTimeAsync(1500);
        });

        const state = useOsStore.getState();
        const hasSyncNotif = state.activeNotifications.some(n => n.message === "Synced Weather Data For London");
        expect(hasSyncNotif).toBe(false);
    });
});