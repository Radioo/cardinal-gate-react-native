import React from 'react';
import {render, screen} from '@testing-library/react-native';
import IidxDifficultyItem from '@/components/iidx/IidxDifficultyItem';
import {IidxDifficulty} from '@/enums/iidx-difficulty';
import {IidxPlayStyle} from '@/enums/iidx-play-style';

describe('IidxDifficultyItem', () => {
    it('renders SP play style stamp for an SP chart', async () => {
        await render(<IidxDifficultyItem difficulty={IidxDifficulty.SPA} level={12}/>);
        expect(screen.getByText(IidxPlayStyle.SP)).toBeTruthy();
    });

    it('renders DP play style stamp for a DP chart', async () => {
        await render(<IidxDifficultyItem difficulty={IidxDifficulty.DPN} level={7}/>);
        expect(screen.getByText(IidxPlayStyle.DP)).toBeTruthy();
    });

    it('renders the full difficulty name', async () => {
        await render(<IidxDifficultyItem difficulty={IidxDifficulty.SPA} level={12}/>);
        expect(screen.getByText('ANOTHER')).toBeTruthy();
    });

    it('renders LEGGENDARIA name for an L chart', async () => {
        await render(<IidxDifficultyItem difficulty={IidxDifficulty.SPL} level={12}/>);
        expect(screen.getByText('LEGGENDARIA')).toBeTruthy();
    });

    it('renders a two-digit level as-is', async () => {
        await render(<IidxDifficultyItem difficulty={IidxDifficulty.SPA} level={12}/>);
        expect(screen.getByText('12')).toBeTruthy();
    });

    it('zero-pads single-digit levels', async () => {
        await render(<IidxDifficultyItem difficulty={IidxDifficulty.SPN} level={7}/>);
        expect(screen.getByText('07')).toBeTruthy();
    });
});
