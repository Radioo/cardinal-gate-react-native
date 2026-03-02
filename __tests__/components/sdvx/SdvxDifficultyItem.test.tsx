import React from 'react';
import {render, screen} from '@testing-library/react-native';
import SdvxDifficultyItem from '@/components/sdvx/SdvxDifficultyItem';
import {SdvxDifficulty} from '@/enums/sdvx-difficulty';

jest.mock('polished', () => ({
    darken: (_amount: number, color: string) => color,
    lighten: (_amount: number, color: string) => color,
}));

describe('SdvxDifficultyItem', () => {
    it('renders EXHAUST difficulty', async () => {
        await render(<SdvxDifficultyItem difficulty={SdvxDifficulty.EXHAUST} level={18}/>);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders MAXIMUM difficulty', async () => {
        await render(<SdvxDifficultyItem difficulty={SdvxDifficulty.MAXIMUM} level={20}/>);
        expect(screen.toJSON()).toBeTruthy();
    });
});
