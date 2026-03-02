import React from 'react';
import renderer from 'react-test-renderer';
import IidxDifficultyItem from '@/components/iidx/IidxDifficulty';
import {IidxDifficulty} from '@/enums/iidx-difficulty';

jest.mock('polished', () => ({
    lighten: (_amount: number, color: string) => color,
}));

describe('IidxDifficultyItem', () => {
    it('renders SP ANOTHER difficulty', () => {
        const tree = renderer.create(
            <IidxDifficultyItem difficulty={IidxDifficulty.SPA} level={12}/>
        ).toJSON();
        expect(tree).toBeTruthy();
    });

    it('renders DP NORMAL difficulty', () => {
        const tree = renderer.create(
            <IidxDifficultyItem difficulty={IidxDifficulty.DPN} level={7}/>
        ).toJSON();
        expect(tree).toBeTruthy();
    });
});
