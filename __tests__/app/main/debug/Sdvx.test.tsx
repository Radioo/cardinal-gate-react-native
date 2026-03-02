import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('@/components/sdvx/SdvxDifficultyItem', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: 'difficulty-item', ...props})};
});

jest.mock('@/components/sdvx/SdvxClearTypeItem', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: 'clear-type-item', ...props})};
});

let mockTabViewProps: Record<string, unknown> | null = null;

jest.mock('react-native-tab-view', () => {
    const {createElement} = require('react');
    return {
        TabView: (props: Record<string, unknown>) => {
            mockTabViewProps = props;
            return createElement('View', {testID: 'tab-view'});
        },
        SceneMap: (scenes: Record<string, unknown>) => scenes,
    };
});

import Sdvx from '@/app/main/debug/Sdvx';

describe('Debug Sdvx', () => {
    beforeEach(() => {
        mockTabViewProps = null;
    });

    it('renders a TabView', () => {
        const tree = renderer.create(<Sdvx />).toJSON() as renderer.ReactTestRendererJSON;
        expect(tree.props.testID).toBe('tab-view');
    });

    it('passes correct tab routes with Difficulties and Clear Types', () => {
        renderer.create(<Sdvx />);
        expect(mockTabViewProps).toBeTruthy();
        const navState = (mockTabViewProps as Record<string, unknown>).navigationState as {index: number; routes: {key: string; title: string}[]};
        expect(navState.routes).toHaveLength(2);
        expect(navState.routes[0].title).toBe('Difficulties');
        expect(navState.routes[1].title).toBe('Clear Types');
    });

    it('starts on the first tab (index 0)', () => {
        renderer.create(<Sdvx />);
        const navState = (mockTabViewProps as Record<string, unknown>).navigationState as {index: number; routes: {key: string; title: string}[]};
        expect(navState.index).toBe(0);
    });

    it('provides a renderScene with difficulties and clearTypes scenes', () => {
        renderer.create(<Sdvx />);
        const renderScene = (mockTabViewProps as Record<string, unknown>).renderScene as Record<string, unknown>;
        expect(renderScene).toHaveProperty('difficulties');
        expect(renderScene).toHaveProperty('clearTypes');
    });
});
