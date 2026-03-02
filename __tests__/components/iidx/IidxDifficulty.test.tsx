import React from 'react';
import {render, screen} from '@testing-library/react-native';
import IidxDifficultyItem from '@/components/iidx/IidxDifficulty';
import {IidxDifficulty} from '@/enums/iidx-difficulty';

jest.mock('polished', () => ({
    lighten: (_amount: number, color: string) => color,
}));

describe('IidxDifficultyItem', () => {
    it('renders SP ANOTHER difficulty', async () => {
        await render(<IidxDifficultyItem difficulty={IidxDifficulty.SPA} level={12}/>);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders DP NORMAL difficulty', async () => {
        await render(<IidxDifficultyItem difficulty={IidxDifficulty.DPN} level={7}/>);
        expect(screen.toJSON()).toBeTruthy();
    });
});
