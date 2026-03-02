import {IidxDifficulty} from '@/enums/iidx-difficulty';

describe('IidxDifficulty', () => {
    it('has 10 members', () => {
        const members = Object.keys(IidxDifficulty);
        expect(members).toHaveLength(10);
    });

    it('has correct SP enum values', () => {
        expect(IidxDifficulty.SPB).toBe('SPB');
        expect(IidxDifficulty.SPN).toBe('SPN');
        expect(IidxDifficulty.SPH).toBe('SPH');
        expect(IidxDifficulty.SPA).toBe('SPA');
        expect(IidxDifficulty.SPL).toBe('SPL');
    });

    it('has correct DP enum values', () => {
        expect(IidxDifficulty.DPB).toBe('DPB');
        expect(IidxDifficulty.DPN).toBe('DPN');
        expect(IidxDifficulty.DPH).toBe('DPH');
        expect(IidxDifficulty.DPA).toBe('DPA');
        expect(IidxDifficulty.DPL).toBe('DPL');
    });

    it('contains all expected keys', () => {
        const expectedKeys = [
            'SPB', 'SPN', 'SPH', 'SPA', 'SPL',
            'DPB', 'DPN', 'DPH', 'DPA', 'DPL',
        ];
        expect(Object.keys(IidxDifficulty)).toEqual(expectedKeys);
    });
});
