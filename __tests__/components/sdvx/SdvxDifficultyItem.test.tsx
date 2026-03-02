import React from 'react';
import renderer from 'react-test-renderer';
import SdvxDifficultyItem from '@/components/sdvx/SdvxDifficultyItem';
import {SdvxDifficulty} from '@/enums/sdvx-difficulty';

jest.mock('polished', () => ({
    darken: (_amount: number, color: string) => color,
    lighten: (_amount: number, color: string) => color,
}));

describe('SdvxDifficultyItem', () => {
    it('renders EXHAUST difficulty', () => {
        const tree = renderer.create(
            <SdvxDifficultyItem difficulty={SdvxDifficulty.EXHAUST} level={18}/>
        ).toJSON();
        expect(tree).toBeTruthy();
    });

    it('renders MAXIMUM difficulty', () => {
        const tree = renderer.create(
            <SdvxDifficultyItem difficulty={SdvxDifficulty.MAXIMUM} level={20}/>
        ).toJSON();
        expect(tree).toBeTruthy();
    });
});
