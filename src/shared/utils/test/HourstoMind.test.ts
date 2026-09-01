import { describe, it, expect } from 'vitest';
import { timeToMinutes } from '../HourstoMint'; // Update to your actual path

describe("timeToMinutes utility function", () => {
    it("returns 0 for null, undefined, or empty time strings", () => {
        expect(timeToMinutes(null)).toBe(0);
        expect(timeToMinutes(undefined)).toBe(0);
        expect(timeToMinutes("")).toBe(0);
    });

    it("correctly converts AM times to total minutes", () => {
        expect(timeToMinutes("12:00 AM")).toBe(0);
        expect(timeToMinutes("01:30 AM")).toBe(90);
        expect(timeToMinutes("11:45 AM")).toBe(705);
    });

    it("correctly converts PM times to total minutes", () => {
        expect(timeToMinutes("12:00 PM")).toBe(720);
        expect(timeToMinutes("01:15 PM")).toBe(795);
        expect(timeToMinutes("11:59 PM")).toBe(1439);
    });
});