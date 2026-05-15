import React from 'react';
import {render, screen} from '@testing-library/react-native';
import SdvxDifficultyItem from '@/components/sdvx/SdvxDifficultyItem';
import {SdvxDifficulty} from '@/enums/sdvx-difficulty';

describe('SdvxDifficultyItem', () => {
    it('renders the difficulty abbreviation', async () => {
        await render(<SdvxDifficultyItem difficulty={SdvxDifficulty.EXHAUST} level={18}/>);
        expect(screen.getByText(SdvxDifficulty.EXHAUST)).toBeTruthy();
    });

    it('renders a two-digit level as-is', async () => {
        await render(<SdvxDifficultyItem difficulty={SdvxDifficulty.MAXIMUM} level={20}/>);
        expect(screen.getByText('20')).toBeTruthy();
    });

    it('zero-pads single-digit levels', async () => {
        await render(<SdvxDifficultyItem difficulty={SdvxDifficulty.NOVICE} level={5}/>);
        expect(screen.getByText(SdvxDifficulty.NOVICE)).toBeTruthy();
        expect(screen.getByText('05')).toBeTruthy();
    });

    it('renders for every difficulty value', async () => {
        for (const difficulty of Object.values(SdvxDifficulty)) {
            const {unmount} = render(<SdvxDifficultyItem difficulty={difficulty} level={10}/>);
            expect(screen.getByText(difficulty)).toBeTruthy();
            unmount();
        }
    });
});
