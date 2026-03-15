import React from 'react';
import {render, screen} from '@testing-library/react-native';
import GdSkillListItem from '@/components/gd/GdSkillListItem';
import {GdDifficultyType} from '@/enums/gd-difficulty-type';
import {GdDifficulty} from '@/enums/gd-difficulty';

jest.mock('@/components/gd/GdDifficultyItem', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', props)};
});

const mockItem = {
    music_id: 1,
    title: 'Test Song',
    difficulty: {type: GdDifficultyType.DRUM, difficulty: GdDifficulty.EXTREME, level: 500},
    skill: 15000,
    percentage: 9500,
};

describe('GdSkillListItem', () => {
    it('renders skill list item', async () => {
        await render(<GdSkillListItem item={mockItem} index={0}/>);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders with negative skill value', async () => {
        const itemWithNegative = {...mockItem, skill: -1};
        await render(<GdSkillListItem item={itemWithNegative} index={2}/>);
        expect(screen.toJSON()).toBeTruthy();
    });
});
