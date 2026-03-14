import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
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

let mockProfileReturn: Record<string, unknown>;
let mockSkillReturn: Record<string, unknown>;
let lastSkillVersion: number | undefined;

jest.mock('@/hooks/queries/useGdProfile', () => ({
    __esModule: true,
    default: () => mockProfileReturn,
}));

jest.mock('@/hooks/queries/useGdSkill', () => ({
    __esModule: true,
    default: (version: number | undefined) => {
        lastSkillVersion = version;
        return mockSkillReturn;
    },
}));

jest.mock('@/components/ui/select', () => {
    const {createElement} = require('react');
    let onValueChangeRef: ((option: {value: string; label: string}) => void) | null = null;

    function Select({children, value, onValueChange}: {children: React.ReactNode; value: {value: string; label: string}; onValueChange: (option: {value: string; label: string}) => void}) {
        onValueChangeRef = onValueChange;
        return createElement('View', {testID: 'select', selectedValue: value?.value}, children);
    }
    function SelectTrigger({children, ...props}: {children: React.ReactNode} & Record<string, unknown>) {
        return createElement('View', {testID: 'select-trigger', ...props}, children);
    }
    function SelectValue(props: Record<string, unknown>) {
        return createElement('View', {testID: 'select-value', ...props});
    }
    function SelectContent({children}: {children: React.ReactNode}) {
        return createElement('View', {testID: 'select-content'}, children);
    }
    function SelectItem(props: Record<string, unknown>) {
        return createElement('View', {
            testID: 'select-item',
            ...props,
            onPress: () => onValueChangeRef?.({value: props.value as string, label: props.label as string}),
        });
    }

    return {Select, SelectTrigger, SelectValue, SelectContent, SelectItem};
});

jest.mock('@/components/gd/GdSkillTabs', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: 'skill-tabs', ...props})};
});

jest.mock('@/components/gd/GdTotalSkill', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: 'total-skill', ...props})};
});

jest.mock('@/components/shared/ErrorScreen', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: {error: Error}) => createElement('View', {testID: 'error-screen', message: props.error.message})};
});

jest.mock('@/components/shared/FullScreenLoader', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: () => createElement('View', {testID: 'loader'})};
});

jest.mock('@/components/themed/GradientText', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: ({children}: {children: React.ReactNode}) => createElement('View', null, children)};
});

describe('Skill', () => {
    beforeEach(() => {
        mockProfileReturn = {data: mockProfileData, isPending: false, isError: false, error: null, refetch: jest.fn()};
        mockSkillReturn = {data: mockSkillData, isPending: false, isError: false, error: null, refetch: jest.fn()};
        lastSkillVersion = undefined;
    });

    it('renders the skill page with select and skill data', async () => {
        await render(<Skill />);
        expect(screen.getByTestId('select')).toBeTruthy();
        expect(screen.getAllByTestId('total-skill')).toHaveLength(2);
        expect(screen.getByTestId('skill-tabs')).toBeTruthy();
    });

    it('renders select items for each game version', async () => {
        await render(<Skill />);
        const selectItems = screen.getAllByTestId('select-item');
        expect(selectItems).toHaveLength(2);
        expect(selectItems[0].props.label).toBe('GITADORA HIGH-VOLTAGE');
        expect(selectItems[1].props.label).toBe('GITADORA FUZZ-UP');
    });

    it('changes version when a different game is selected', async () => {
        await render(<Skill />);
        expect(lastSkillVersion).toBe(10);

        const selectItems = screen.getAllByTestId('select-item');
        fireEvent.press(selectItems[1]);

        expect(lastSkillVersion).toBe(9);
    });

    it('renders two GdTotalSkill components for DM and GF', async () => {
        await render(<Skill />);
        const totalSkills = screen.getAllByTestId('total-skill');
        expect(totalSkills).toHaveLength(2);
    });

    it('shows loader when profile is pending', async () => {
        mockProfileReturn = {data: undefined, isPending: true, isError: false, error: null, refetch: jest.fn()};
        await render(<Skill />);
        expect(screen.getByTestId('loader')).toBeTruthy();
    });

    it('shows error screen when profile query fails', async () => {
        mockProfileReturn = {data: undefined, isPending: false, isError: true, error: new Error('Profile failed'), refetch: jest.fn()};
        await render(<Skill />);
        const errorScreen = screen.getByTestId('error-screen');
        expect(errorScreen.props.message).toBe('Profile failed');
    });

    it('shows error screen when skill query fails', async () => {
        mockSkillReturn = {data: undefined, isPending: false, isError: true, error: new Error('Skill failed'), refetch: jest.fn()};
        await render(<Skill />);
        const errorScreen = screen.getByTestId('error-screen');
        expect(errorScreen.props.message).toBe('Skill failed');
    });

    it('shows loader when skill is pending', async () => {
        mockSkillReturn = {data: undefined, isPending: true, isError: false, error: null, refetch: jest.fn()};
        await render(<Skill />);
        expect(screen.getByTestId('loader')).toBeTruthy();
    });
});
