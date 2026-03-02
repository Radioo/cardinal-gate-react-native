import React from 'react';
import {render, screen} from '@testing-library/react-native';
import GameTabLayout from '@/components/shared/GameTabLayout';

jest.mock('@expo/vector-icons/AntDesign', () => 'AntDesign');
jest.mock('@expo/vector-icons', () => ({
    Entypo: 'Entypo',
}));

jest.mock('expo-router', () => {
    const {createElement} = require('react');
    return {
        Tabs: Object.assign(
            ({children}: {children: React.ReactNode}) => createElement('View', null, children),
            {
                Screen: (props: Record<string, unknown>) => createElement('View', props),
            }
        ),
    };
});

describe('GameTabLayout', () => {
    it('renders default tabs (Profile and Plays)', async () => {
        await render(<GameTabLayout />);
        const json = JSON.stringify(screen.toJSON());
        expect(json).toBeTruthy();
        expect(json).toContain('Profile');
        expect(json).toContain('Plays');
    });

    it('renders the correct number of default tab screens', async () => {
        await render(<GameTabLayout />);
        const json = JSON.stringify(screen.toJSON());
        expect(json).toContain('"name":"Profile"');
        expect(json).toContain('"name":"Plays"');
    });

    it('renders custom tabs when provided', async () => {
        const customTabs = [
            {
                name: 'Skill',
                title: 'Skill Points',
                icon: (color: string) => <>{color}</>,
            },
            {
                name: 'Records',
                title: 'My Records',
                icon: (color: string) => <>{color}</>,
            },
        ];
        await render(<GameTabLayout tabs={customTabs} />);
        const json = JSON.stringify(screen.toJSON());
        expect(json).toContain('Skill');
        expect(json).toContain('Records');
        expect(json).not.toContain('Profile');
        expect(json).not.toContain('Plays');
    });

    it('renders a single tab when only one custom tab is provided', async () => {
        const customTabs = [
            {
                name: 'Scores',
                title: 'High Scores',
                icon: (color: string) => <>{color}</>,
            },
        ];
        await render(<GameTabLayout tabs={customTabs} />);
        const json = JSON.stringify(screen.toJSON());
        expect(json).toContain('Scores');
        expect(json).not.toContain('Profile');
        expect(json).not.toContain('Plays');
    });
});
