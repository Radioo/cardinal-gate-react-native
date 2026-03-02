import {SdvxDifficulty} from '@/enums/sdvx-difficulty';

describe('SdvxDifficulty', () => {
    it('has 9 members', () => {
        const members = Object.keys(SdvxDifficulty);
        expect(members).toHaveLength(9);
    });

    it('has correct enum values', () => {
        expect(SdvxDifficulty.NOVICE).toBe('NOV');
        expect(SdvxDifficulty.ADVANCED).toBe('ADV');
        expect(SdvxDifficulty.EXHAUST).toBe('EXH');
        expect(SdvxDifficulty.INFINITE).toBe('INF');
        expect(SdvxDifficulty.GRAVITY).toBe('GRV');
        expect(SdvxDifficulty.HEAVENLY).toBe('HVN');
        expect(SdvxDifficulty.VIVID).toBe('VVD');
        expect(SdvxDifficulty.EXCEED).toBe('XCD');
        expect(SdvxDifficulty.MAXIMUM).toBe('MXM');
    });

    it('contains all expected keys', () => {
        const expectedKeys = [
            'NOVICE', 'ADVANCED', 'EXHAUST', 'INFINITE',
            'GRAVITY', 'HEAVENLY', 'VIVID', 'EXCEED', 'MAXIMUM',
        ];
        expect(Object.keys(SdvxDifficulty)).toEqual(expectedKeys);
    });
});
