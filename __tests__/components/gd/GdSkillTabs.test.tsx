import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {TestRendererJSON} from '../../helpers/types';
import GdSkillTabs from '@/components/gd/GdSkillTabs';

let capturedTabViewProps: Record<string, unknown> = {};

jest.mock('react-native-tab-view', () => {
    const {createElement} = require('react');
    return {
        TabView: (props: Record<string, unknown>) => {
            capturedTabViewProps = props;
            return createElement('View', {testID: 'tab-view'});
        },
        TabBar: (props: Record<string, unknown>) => createElement('View', props),
        TabBarItem: (props: Record<string, unknown>) => createElement('View', props),
        SceneMap: (scenes: Record<string, unknown>) => scenes,
    };
});

jest.mock('@/components/gd/GdSkillList', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', props)};
});

describe('GdSkillTabs', () => {
    beforeEach(() => {
        capturedTabViewProps = {};
    });

    it('renders a TabView component', async () => {
        await render(<GdSkillTabs data={undefined} />);
        const tree = screen.toJSON() as TestRendererJSON;
        expect(tree).toBeTruthy();
        expect(tree.props.testID).toBe('tab-view');
    });

    it('provides 4 routes for DM/GF hot and other tabs', async () => {
        await render(<GdSkillTabs data={undefined} />);
        const navState = capturedTabViewProps.navigationState as {routes: Array<{key: string; title: string}>};
        expect(navState.routes).toHaveLength(4);
        expect(navState.routes.map(r => r.key)).toEqual(['hot_dm', 'other_dm', 'hot_gf', 'other_gf']);
    });

    it('starts on the first tab', async () => {
        await render(<GdSkillTabs data={undefined} />);
        const navState = capturedTabViewProps.navigationState as {index: number};
        expect(navState.index).toBe(0);
    });
});
