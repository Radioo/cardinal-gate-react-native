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
    it('renders the song title and formatted skill/percentage', async () => {
        await render(<GdSkillListItem item={mockItem} index={0}/>);
        expect(screen.getByText('Test Song')).toBeTruthy();
        // 15000 / 100 = 150.00 (skill), 9500 / 100 = 95.00 (percentage)
        expect(screen.getByText('150.00')).toBeTruthy();
        expect(screen.getByText('95.00%')).toBeTruthy();
    });

    it('renders a zero-padded rank from the index', async () => {
        await render(<GdSkillListItem item={mockItem} index={2}/>);
        // index 2 → #03
        expect(screen.getByText('#03')).toBeTruthy();
    });

    it('renders ??? for a negative skill value', async () => {
        await render(<GdSkillListItem item={{...mockItem, skill: -1}} index={0}/>);
        expect(screen.getByText('???')).toBeTruthy();
    });
});
