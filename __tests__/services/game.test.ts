import {getSeriesName, formatArcadeId, formatGdSkillValue, formatPlayTimeHours} from '@/services/game';
import {Series} from '@/enums/series';

describe('getSeriesName', () => {
    it('returns correct name for IIDX', () => {
        expect(getSeriesName(Series.IIDX)).toBe('beatmania IIDX');
    });

    it('returns correct name for SDVX', () => {
        expect(getSeriesName(Series.SDVX)).toBe('SOUND VOLTEX');
    });

    it('returns correct name for GD', () => {
        expect(getSeriesName(Series.GD)).toBe('GuitarFreaks & DrumMania');
    });

    it('returns all series names', () => {
        Object.values(Series).forEach(series => {
            const name = getSeriesName(series);
            expect(name).toBeTruthy();
            expect(name).not.toBe('Unknown series');
        });
    });

    it('returns Unknown series for invalid value', () => {
        expect(getSeriesName('invalid' as Series)).toBe('Unknown series');
    });
});

describe('formatArcadeId', () => {
    it('formats an 8-digit id with a dash in the middle', () => {
        expect(formatArcadeId(12345678)).toBe('1234-5678');
    });

    it('formats another 8-digit id', () => {
        expect(formatArcadeId(99887766)).toBe('9988-7766');
    });

    it('formats an id with leading digits correctly', () => {
        expect(formatArcadeId(10000001)).toBe('1000-0001');
    });
});

describe('formatGdSkillValue', () => {
    it('formats a normal value with two decimal places', () => {
        expect(formatGdSkillValue(15000)).toBe('150.00');
    });

    it('formats zero as 0.00', () => {
        expect(formatGdSkillValue(0)).toBe('0.00');
    });

    it('returns ??? for undefined', () => {
        expect(formatGdSkillValue(undefined)).toBe('???');
    });

    it('returns ??? for negative values', () => {
        expect(formatGdSkillValue(-1)).toBe('???');
    });

    it('formats small values correctly', () => {
        expect(formatGdSkillValue(1)).toBe('0.01');
    });
});

describe('formatPlayTimeHours', () => {
    it('calculates hours from play counts', () => {
        expect(formatPlayTimeHours([{count: 30}])).toBe('1');
    });

    it('returns 0 for empty array', () => {
        expect(formatPlayTimeHours([])).toBe('0');
    });

    it('sums multiple games', () => {
        expect(formatPlayTimeHours([{count: 30}, {count: 60}])).toBe('3');
    });

    it('formats fractional hours with one decimal', () => {
        expect(formatPlayTimeHours([{count: 10}])).toBe('0.3');
    });
});
