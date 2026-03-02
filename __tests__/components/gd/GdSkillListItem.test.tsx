import React from 'react';
import renderer from 'react-test-renderer';
import GdSkillListItem from '@/components/gd/GdSkillListItem';

jest.mock('@/components/gd/GdDifficulty', () => {
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
    it('renders skill list item', () => {
        const tree = renderer.create(
            <GdSkillListItem item={mockItem} index={0}/>
        ).toJSON();
        expect(tree).toBeTruthy();
    });

    it('renders with negative skill value', () => {
        const itemWithNegative = {...mockItem, skill: -1};
        const tree = renderer.create(
            <GdSkillListItem item={itemWithNegative} index={2}/>
        ).toJSON();
        expect(tree).toBeTruthy();
    });
});
