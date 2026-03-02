import React from 'react';
import {render, screen} from '@testing-library/react-native';
import Skill from '@/app/main/gd/Skill';

const mockProfileData = {
    games: [{name: 'GITADORA HIGH-VOLTAGE', version: 10}, {name: 'GITADORA FUZZ-UP', version: 9}],
    name: 'TestPlayer',
};

const mockSkillData = {
    skill_data: {
        dm: {skill: 500000, all_music_skill: 400000, new: [], exist: []},
        gf: {skill: 300000, all_music_skill: 200000, new: [], exist: []},
    },
};

jest.mock('@/hooks/queries/useGdProfile', () => ({
    __esModule: true,
    default: () => ({
        data: mockProfileData,
        isPending: false, isError: false, error: null, refetch: jest.fn(),
    }),
}));

jest.mock('@/hooks/queries/useGdSkill', () => ({
    __esModule: true,
    default: () => ({
        data: mockSkillData,
        isPending: false, isError: false, error: null, refetch: jest.fn(),
    }),
}));

jest.mock('@react-native-picker/picker', () => {
    const {createElement} = require('react');
    const Picker = ({children, ...props}: {children: React.ReactNode} & Record<string, unknown>) =>
        createElement('View', {testID: 'picker', ...props}, children);
    Picker.Item = (props: Record<string, unknown>) => createElement('View', {testID: 'picker-item', ...props});
    return {Picker};
});

jest.mock('@/components/gd/GdSkillTabs', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: 'skill-tabs', ...props})};
});

jest.mock('@/components/gd/GdTotalSkill', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: 'total-skill', ...props})};
});

jest.mock('@/components/themed/GradientText', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: ({children}: {children: React.ReactNode}) => createElement('View', null, children)};
});

describe('Skill', () => {
    it('renders the skill page with picker and skill data', async () => {
        await render(<Skill />);
        const json = JSON.stringify(screen.toJSON());
        expect(json).toBeTruthy();
        expect(json).toContain('picker');
        expect(json).toContain('total-skill');
        expect(json).toContain('skill-tabs');
    });

    it('renders picker items for each game version', async () => {
        await render(<Skill />);
        const pickerItems = screen.getAllByTestId('picker-item');
        expect(pickerItems).toHaveLength(2);
        expect(pickerItems[0].props.label).toBe('GITADORA HIGH-VOLTAGE');
        expect(pickerItems[1].props.label).toBe('GITADORA FUZZ-UP');
    });

    it('renders two GdTotalSkill components for DM and GF', async () => {
        await render(<Skill />);
        const totalSkills = screen.getAllByTestId('total-skill');
        expect(totalSkills).toHaveLength(2);
    });
});
