import React from 'react';
import renderer from 'react-test-renderer';
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
    it('renders default tabs (Profile and Plays)', () => {
        const tree = renderer.create(<GameTabLayout />).toJSON();
        expect(tree).toBeTruthy();
        const json = JSON.stringify(tree);
        expect(json).toContain('Profile');
        expect(json).toContain('Plays');
    });

    it('renders the correct number of default tab screens', () => {
        const root = renderer.create(<GameTabLayout />).root;
        const tabScreens = root.findAllByProps({name: 'Profile'});
        expect(tabScreens.length).toBeGreaterThanOrEqual(1);
        const playsScreens = root.findAllByProps({name: 'Plays'});
        expect(playsScreens.length).toBeGreaterThanOrEqual(1);
    });

    it('renders custom tabs when provided', () => {
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
        const tree = renderer.create(<GameTabLayout tabs={customTabs} />).toJSON();
        const json = JSON.stringify(tree);
        expect(json).toContain('Skill');
        expect(json).toContain('Records');
        expect(json).not.toContain('Profile');
        expect(json).not.toContain('Plays');
    });

    it('renders a single tab when only one custom tab is provided', () => {
        const customTabs = [
            {
                name: 'Scores',
                title: 'High Scores',
                icon: (color: string) => <>{color}</>,
            },
        ];
        const tree = renderer.create(<GameTabLayout tabs={customTabs} />).toJSON();
        const json = JSON.stringify(tree);
        expect(json).toContain('Scores');
        expect(json).not.toContain('Profile');
        expect(json).not.toContain('Plays');
    });
});
