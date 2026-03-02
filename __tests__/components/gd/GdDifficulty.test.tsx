import React from 'react';
import renderer from 'react-test-renderer';
import GdDifficultyInfo from '@/components/gd/GdDifficulty';
import {GdDifficulty} from '@/enums/gd-difficulty';

jest.mock('polished', () => ({lighten: (_a: number, c: string) => c}));

describe('GdDifficultyInfo', () => {
    it('renders EXTREME difficulty', () => {
        const tree = renderer.create(
            <GdDifficultyInfo difficulty={{type: 'DM', difficulty: GdDifficulty.EXTREME, level: 500}}/>
        ).toJSON();
        expect(tree).toBeTruthy();
    });

    it('renders BASIC difficulty', () => {
        const tree = renderer.create(
            <GdDifficultyInfo difficulty={{type: 'GF', difficulty: GdDifficulty.BASIC, level: 200}}/>
        ).toJSON();
        expect(tree).toBeTruthy();
    });
});
