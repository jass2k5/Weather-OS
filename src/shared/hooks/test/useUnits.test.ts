import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTemperatureUnit } from '../useUnits'; // Adjust path
import { useOsStore } from '../../store/useOsStore'; // Adjust path

describe("Unit Testing From Celsius to Farheniet and Km To mi and rounding",()=>{
    beforeEach(()=>{
        useOsStore.setState({
            tempdist: { celsius: false, km: false }
        });
    });

    it("Celsius and Kilometer",()=>{
        const {result} = renderHook(()=>useTemperatureUnit());
        expect(result.current.formatTemp(23.4)).toBe('23°C');
        expect(result.current.formatDistance(10)).toBe('10 km');
    })
    it("Farheniet and Miles",()=>{
        useOsStore.setState({
         tempdist: { celsius: true, km: true }
        });

        const {result} = renderHook(()=>useTemperatureUnit());
        expect(result.current.formatDistance(10)).toBe("6 mi");
        expect(result.current.formatTemp(25)).toBe("77°F");
    })
})