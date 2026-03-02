import {IidxClearType} from '@/enums/iidx-clear-type';

describe('IidxClearType', () => {
    it('has 8 members', () => {
        const members = Object.keys(IidxClearType);
        expect(members).toHaveLength(8);
    });

    it('has correct enum values', () => {
        expect(IidxClearType.NO_PLAY).toBe('NO PLAY');
        expect(IidxClearType.FAILED).toBe('FAILED');
        expect(IidxClearType.ASSIST_CLEAR).toBe('ASSIST CLEAR');
        expect(IidxClearType.EASY_CLEAR).toBe('EASY CLEAR');
        expect(IidxClearType.CLEAR).toBe('CLEAR');
        expect(IidxClearType.HARD_CLEAR).toBe('HARD CLEAR');
        expect(IidxClearType.EX_HARD_CLEAR).toBe('EX HARD CLEAR');
        expect(IidxClearType.FULL_COMBO).toBe('FULL COMBO');
    });

    it('contains all expected keys', () => {
        const expectedKeys = [
            'NO_PLAY',
            'FAILED',
            'ASSIST_CLEAR',
            'EASY_CLEAR',
            'CLEAR',
            'HARD_CLEAR',
            'EX_HARD_CLEAR',
            'FULL_COMBO',
        ];
        expect(Object.keys(IidxClearType)).toEqual(expectedKeys);
    });
});
