import { describe, it, expect, beforeEach, afterEach, beforeAll, vi } from 'vitest';
import { useOsStore } from './useOsStore';

describe("Zustand osStoreStore For State Management", () => {
    beforeEach(() => {
        useOsStore.setState({
            theme: 'dark',
            isDay: true,
            isScrollHovered: false,
            isGithubHovered: false,
            githubText: null,
            isBooted: false,
            systemBg: "/stage1bg.webp",
            activeLocation: null,
            telemetryData: null,

            apps: {
                map: { isOpen: true },
                clock: { isOpen: false },
                notification: { isOpen: false },
                settings: { isOpen: false },
                contact: { isOpen: false },
                weather: { isOpen: false }
            },

            searchHistory: [],
            windowOrder: ['map', 'clock', 'settings', "notification", "contact", "weather"],
            notificationHistory: [],
            activeNotifications: [],

            dateTimeSettings: {
                showDateTime: true,
                showSeconds: true,
                format: { hour: "12h", bol: false },
                color: { clr: "white", bol: true },
                position: 'top-right'
            },

            tempdist: {
                celsius: false,
                km: false,
            },

            glassSettings: {
                enabled: true,
                blurValue: 2,
            },

            mouseFollower: {
                enabled: true,
                clockFollower: true,
            },

            mapSetting: {
                theme: "dark",
                Navigations: true,
                flyby: true,
                marker: true
            },

            clockSetting: {
                liveNight: false,
                liveDay: false,
                format: { hour: '12h', enabled: false },
            },

            notificationSetting: {
                enabled: true,
                sound: false // Keeping this off it's browser dependent it will crash the test 
            }
        });
    });
    
    describe("Standard state updates", () => {

        describe("Opening Closing Apps System States And It's Functions", () => {
            it("Opening the app state", () => {
                const { openApp } = useOsStore.getState();
                openApp("weather");
                expect(useOsStore.getState().apps.weather.isOpen).toBe(true);
            })
            
            it("Closing the app State", () => {
                const { closeApp } = useOsStore.getState();
                closeApp('weather');
                expect(useOsStore.getState().apps.weather.isOpen).toBe(false);
            })
            
            it("Closing all States", () => {
                const { closeAll } = useOsStore.getState();
                closeAll();
                const { apps } = useOsStore.getState()
                Object.values(apps).forEach((app) => {
                    expect(app.isOpen).toBe(false);
                })
            })
        });

        it("Index handler for all apps", () => {
            const { windowOrder, focusApp } = useOsStore.getState();
            focusApp('map')
            expect(useOsStore.getState().windowOrder.at(-1)).toBe('map')
        })

        describe("Settings State Functions", () => {
            it("Global Ui Date Time Settings", () => {
                const { updateDateTimeSetting } = useOsStore.getState();
                updateDateTimeSetting('showDateTime', false);
                expect(useOsStore.getState().dateTimeSettings.showDateTime).toBe(false);
            })
            
            it("Global temperature and distance converter km,mi,c,f", () => {
                const { settempdist } = useOsStore.getState();
                settempdist('km', true);
                expect(useOsStore.getState().tempdist.km).toBe(true);
            })
            
            it("Walpaper Blur", () => {
                const { updateGlassSetting } = useOsStore.getState();
                updateGlassSetting('blurValue', 17); //limit at <= 20
                expect(useOsStore.getState().glassSettings.blurValue).toBe(17);
            })
            
            it("Global Mouse Follower ", () => {
                const { updateFollowerSetting } = useOsStore.getState();
                updateFollowerSetting('enabled', false);
                expect(useOsStore.getState().mouseFollower.enabled).toBe(false);
            })

            it("Map Settings", () => {
                const { setMapSetting } = useOsStore.getState();
                setMapSetting('Navigations', false)
                setMapSetting('flyby', false)
                setMapSetting('marker', false)
                setMapSetting('theme', 'light')
                
                const { mapSetting } = useOsStore.getState();
                Object.values(mapSetting).forEach((val) => {
                    if (typeof (val) === 'boolean') {
                        expect(val).toBe(false);
                    } else {
                        expect(val).toBe('light');
                    }
                })
            })

            it("Clock Settings ", () => {
                const { setClockSetting } = useOsStore.getState();
                setClockSetting('liveNight', false)
                setClockSetting('format', {
                    hour: '24h',
                    enabled: true
                })
                
                const { clockSetting } = useOsStore.getState();
                expect(clockSetting.liveNight).toBe(false);
                expect(clockSetting.format.hour).toBe('24h');
            })
            
            it("Notification Settings", () => {
                const { setnotificationSetting } = useOsStore.getState();
                setnotificationSetting('enabled', false);
                
                expect(useOsStore.getState().notificationSetting.enabled).toBe(false);
            })
        })
    })
    
    describe("Time Dependent States", () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.useRealTimers();
        });
        
        it("removes notification after 4 seconds", () => {
            const { addNotification } = useOsStore.getState();
            addNotification("Test Message", "info");
            expect(useOsStore.getState().activeNotifications.length).toBe(1);
            
            vi.advanceTimersByTime(4000);
            expect(useOsStore.getState().activeNotifications.length).toBe(0);
        });
    })
    
    describe("Adding to Search History", () => {
        const mockWeatherApiData = (cityName: string) => ({
            location: {
                name: cityName,
                country: "Testland",
                tz_id: "Test/Zone",
                lat: 10,
                lon: 20
            },
            current: {
                temp_c: 22,
                condition: { text: "Sunny" },
                humidity: 50,
                wind_kph: 15,
                wind_degree: 180,
                vis_km: 10,
                feelslike_c: 24,
                is_day: 1,
                air_quality: { 'us-epa-index': 1 }
            }
        });
        
        beforeAll(() => {
            window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
        });
        
        it("Add a new search history and updates the telemetry ", () => {
            const { addSearchToHistory } = useOsStore.getState();
            addSearchToHistory(mockWeatherApiData('London'));
            
            const state = useOsStore.getState();
            expect(state.searchHistory.length).toBe(1);
            expect(state.searchHistory[0].city).toBe("London");
            expect(state.searchHistory[0].liveCondition).toBe("Sunny");
            expect(state.activeLocation).toBe("London");
            expect(state.telemetryData?.city).toBe("London");
        })
        
        it("prevents duplicates and moves the existing city to the top (case-insensitive)", () => {
            const { addSearchToHistory } = useOsStore.getState();

            addSearchToHistory(mockWeatherApiData("London"));
            addSearchToHistory(mockWeatherApiData("Paris"));
            addSearchToHistory(mockWeatherApiData("london"));

            const state = useOsStore.getState();
            expect(state.searchHistory.length).toBe(2);
            expect(state.searchHistory[0].city).toBe("london");
            expect(state.searchHistory[1].city).toBe("Paris");
        });
        
        it("restricts the history list to a maximum of 5 items", () => {
            const { addSearchToHistory } = useOsStore.getState();

            const cities = ["Paris", "London", "Tokyo", "Berlin", "Madrid", "Rome"];
            cities.forEach(city => addSearchToHistory(mockWeatherApiData(city)));

            const state = useOsStore.getState();

            expect(state.searchHistory.length).toBe(5);
            expect(state.searchHistory[0].city).toBe("Rome");
            const hasParis = state.searchHistory.some(loc => loc.city === "Paris");
            expect(hasParis).toBe(false);
        });
        
        it("removes a specific search item by city name", () => {
            const { addSearchToHistory, removeSearchItem } = useOsStore.getState();

            addSearchToHistory(mockWeatherApiData("London"));
            addSearchToHistory(mockWeatherApiData("Paris"));

            removeSearchItem("London");

            const state = useOsStore.getState();
            expect(state.searchHistory.length).toBe(1);
            expect(state.searchHistory[0].city).toBe("Paris");
        });
        
        it("handles invalid data safely without crashing", () => {
            const { addSearchToHistory } = useOsStore.getState();
            
            // @ts-ignore
            addSearchToHistory(null);
            // @ts-ignore
            addSearchToHistory({ random: "data" });
            
            const state = useOsStore.getState();
            expect(state.searchHistory.length).toBe(0);
        });
    })
})