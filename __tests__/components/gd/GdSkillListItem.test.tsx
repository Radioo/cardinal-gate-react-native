import React from 'react';
import {render, screen} from '@testing-library/react-native';
import GdSkillListItem from '@/components/gd/GdSkillListItem';

jest.mock('@/components/gd/GdDifficultyItem', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', props)};
});

jest.mock('polished', () => ({
    darken: (_a: number, c: string) => c,
    lighten: (_a: number, c: string) => c,
}));

const mockItem = {
    title: 'Test Song',
    difficulty: {type: 'DM', difficulty: 'EXT', level: 500},
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
