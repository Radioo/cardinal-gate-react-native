import React from 'react';
import {render, screen} from '@testing-library/react-native';
import GdDifficultyItem from '@/components/gd/GdDifficultyItem';
import {GdDifficulty} from '@/enums/gd-difficulty';
import {GdDifficultyType} from '@/enums/gd-difficulty-type';

describe('GdDifficultyItem', () => {
    it('renders difficulty type text', async () => {
        await render(<GdDifficultyItem difficulty={{type: GdDifficultyType.DRUM, difficulty: GdDifficulty.EXTREME, level: 500}}/>);
        expect(screen.getByText(GdDifficultyType.DRUM)).toBeTruthy();
    });

    it('renders difficulty name text', async () => {
        await render(<GdDifficultyItem difficulty={{type: GdDifficultyType.GUITAR, difficulty: GdDifficulty.BASIC, level: 200}}/>);
        expect(screen.getByText(GdDifficulty.BASIC)).toBeTruthy();
    });

    it('renders formatted skill level', async () => {
        await render(<GdDifficultyItem difficulty={{type: GdDifficultyType.DRUM, difficulty: GdDifficulty.EXTREME, level: 500}}/>);
        expect(screen.getByText('5.00')).toBeTruthy();
    });

    it('renders all three parts', async () => {
        await render(<GdDifficultyItem difficulty={{type: GdDifficultyType.BASS, difficulty: GdDifficulty.MASTER, level: 999}}/>);
        expect(screen.getByText(GdDifficultyType.BASS)).toBeTruthy();
        expect(screen.getByText(GdDifficulty.MASTER)).toBeTruthy();
        expect(screen.getByText('9.99')).toBeTruthy();
    });
});
