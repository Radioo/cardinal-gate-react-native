import React from 'react';
import renderer from 'react-test-renderer';
import GdSkillList from '@/components/gd/GdSkillList';

jest.mock('@/components/gd/GdSkillListItem', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', props)};
});

jest.mock('polished', () => ({
    darken: (_a: number, c: string) => c,
    lighten: (_a: number, c: string) => c,
}));

describe('GdSkillList', () => {
    it('renders empty state with no data message', () => {
        const tree = renderer.create(
            <GdSkillList items={[]}/>
        );
        const root = tree.root;
        const noDataText = root.findByProps({children: 'No data'});
        expect(noDataText).toBeTruthy();
    });

    it('renders with items', () => {
        const items = [
            {title: 'Song A', difficulty: {type: 'DM', difficulty: 'EXT', level: 500}, skill: 15000, percentage: 9500},
            {title: 'Song B', difficulty: {type: 'GF', difficulty: 'ADV', level: 300}, skill: 10000, percentage: 8000},
        ];
        const tree = renderer.create(
            <GdSkillList items={items}/>
        ).toJSON();
        expect(tree).toBeTruthy();
    });
});
