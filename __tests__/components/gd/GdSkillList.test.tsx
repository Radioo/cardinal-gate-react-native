import React from 'react';
import {render, screen} from '@testing-library/react-native';
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
    it('renders empty state with no data message', async () => {
        await render(<GdSkillList items={[]}/>);
        expect(screen.getByText('No data')).toBeTruthy();
    });

    it('renders with items', async () => {
        const items = [
            {title: 'Song A', difficulty: {type: 'DM', difficulty: 'EXT', level: 500}, skill: 15000, percentage: 9500},
            {title: 'Song B', difficulty: {type: 'GF', difficulty: 'ADV', level: 300}, skill: 10000, percentage: 8000},
        ];
        await render(<GdSkillList items={items}/>);
        expect(screen.toJSON()).toBeTruthy();
    });
});
