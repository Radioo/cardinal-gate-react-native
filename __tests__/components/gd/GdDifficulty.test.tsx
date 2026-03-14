import React from 'react';
import {render, screen} from '@testing-library/react-native';
import GdDifficultyItem from '@/components/gd/GdDifficultyItem';
import {GdDifficulty} from '@/enums/gd-difficulty';

jest.mock('polished', () => ({lighten: (_a: number, c: string) => c}));

describe('GdDifficultyItem', () => {
    it('renders EXTREME difficulty', async () => {
        await render(<GdDifficultyItem difficulty={{type: 'DM', difficulty: GdDifficulty.EXTREME, level: 500}}/>);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders BASIC difficulty', async () => {
        await render(<GdDifficultyItem difficulty={{type: 'GF', difficulty: GdDifficulty.BASIC, level: 200}}/>);
        expect(screen.toJSON()).toBeTruthy();
    });
});
