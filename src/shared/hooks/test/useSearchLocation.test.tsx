import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useSearchLocation } from '../useSearchLocation';
import { useOsStore } from '../../store/useOsStore';

vi.mock('axios');

describe('useSearchLocation Hook', () => {
    const createTestWrapper = () => {
        const testQueryClient = new QueryClient({
            defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
        });

        return ({ children }: { children: React.ReactNode }) => (
            <QueryClientProvider client={testQueryClient}>
                {children}
            </QueryClientProvider>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
        vi.useRealTimers();
        useOsStore.setState({
            notificationSetting: { enabled: true, sound: false },
            searchHistory: [],
            activeNotifications: [],
            notificationHistory: []
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('fetches weather, updates history, and fires the delayed Good AQI notification', async () => {
        const mockData = {
            location: { name: 'London', country: 'United Kingdom', tz_id: 'Europe/London', lat: 51.5074, lon: -0.1278 },
            current: {
                temp_c: 18,
                condition: { text: 'Clear' },
                humidity: 60,
                wind_kph: 15,
                wind_degree: 180,
                vis_km: 10,
                feelslike_c: 17,
                is_day: 1,
                air_quality: { 'us-epa-index': 1 }
            }
        };

        vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockData } as any);

        const { result } = renderHook(() => useSearchLocation(), {
            wrapper: createTestWrapper()
        });

        act(() => {
            result.current.searchLocation('London');
        });

        await waitFor(() => {
            const state = useOsStore.getState();
            expect(state.searchHistory).toHaveLength(1);
            expect(state.searchHistory[0]?.city).toBe('London');
        });

        const state = useOsStore.getState();
        expect(state.activeNotifications.some((n) => n.message.includes('Telemetry stream active: London'))).toBe(true);

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 4100));
        });

        const finalState = useOsStore.getState();
        expect(finalState.activeNotifications.some((n) => n.message === 'AQI is Good for London')).toBe(true);
    });

    it('fires a Hazardous AQI warning when pollution index is above 3', async () => {
        const mockData = {
            location: { name: 'Delhi', country: 'India', tz_id: 'Asia/Kolkata', lat: 28.6139, lon: 77.209 },
            current: {
                temp_c: 32,
                condition: { text: 'Haze' },
                humidity: 55,
                wind_kph: 8,
                wind_degree: 220,
                vis_km: 8,
                feelslike_c: 36,
                is_day: 1,
                air_quality: { 'us-epa-index': 5 }
            }
        };

        vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockData } as any);

        const { result } = renderHook(() => useSearchLocation(), {
            wrapper: createTestWrapper()
        });

        act(() => {
            result.current.searchLocation('Delhi');
        });

        await waitFor(() => {
            const state = useOsStore.getState();
            expect(state.searchHistory).toHaveLength(1);
            expect(state.searchHistory[0]?.city).toBe('Delhi');
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 4100));
        });

        const finalState = useOsStore.getState();
        expect(finalState.activeNotifications.some((n) => n.message === 'Critical: Hazardous AQI in Delhi!')).toBe(true);
    });
});