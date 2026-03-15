import React from 'react';
import {render, screen} from '@testing-library/react-native';
import SdvxDifficultyItem from '@/components/sdvx/SdvxDifficultyItem';
import {SdvxDifficulty} from '@/enums/sdvx-difficulty';

jest.mock('polished', () => ({
    darken: (_amount: number, color: string) => color,
    lighten: (_amount: number, color: string) => color,
}));

describe('SdvxDifficultyItem', () => {
    it('renders difficulty name', async () => {
        await render(<SdvxDifficultyItem difficulty={SdvxDifficulty.EXHAUST} level={18}/>);
        expect(screen.getByText(SdvxDifficulty.EXHAUST)).toBeTruthy();
    });

    it('renders level number', async () => {
        await render(<SdvxDifficultyItem difficulty={SdvxDifficulty.MAXIMUM} level={20}/>);
        expect(screen.getByText('20')).toBeTruthy();
    });

    it('renders both difficulty and level', async () => {
        await render(<SdvxDifficultyItem difficulty={SdvxDifficulty.NOVICE} level={5}/>);
        expect(screen.getByText(SdvxDifficulty.NOVICE)).toBeTruthy();
        expect(screen.getByText('5')).toBeTruthy();
    });
});
