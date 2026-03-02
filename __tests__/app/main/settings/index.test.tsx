import React from 'react';
import renderer from 'react-test-renderer';

let capturedPrimaryColorSettingProps: Record<string, unknown> | null = null;

jest.mock('@/components/shared/PrimaryColorSetting', () => {
    const {createElement} = require('react');
    return {
        __esModule: true,
        default: (props: Record<string, unknown>) => {
            capturedPrimaryColorSettingProps = props;
            return createElement('View', {testID: 'primary-color-setting', ...props});
        },
    };
});

jest.mock('@expo/vector-icons', () => ({
    Ionicons: (props: Record<string, unknown>) => require('react').createElement('View', {...props, testID: `icon-${props.name}`}),
}));

import Index from '@/app/main/settings/index';

function findAll(node: renderer.ReactTestRendererJSON | null, predicate: (n: renderer.ReactTestRendererJSON) => boolean): renderer.ReactTestRendererJSON[] {
    if (!node) return [];
    const results: renderer.ReactTestRendererJSON[] = [];
    if (predicate(node)) results.push(node);
    if (node.children) {
        for (const child of node.children) {
            if (typeof child !== 'string') {
                results.push(...findAll(child, predicate));
            }
        }
    }
    return results;
}

function collectText(node: renderer.ReactTestRendererJSON | null): string[] {
    if (!node) return [];
    const texts: string[] = [];
    if (node.children) {
        for (const child of node.children) {
            if (typeof child === 'string') texts.push(child);
            else texts.push(...collectText(child));
        }
    }
    return texts;
}

describe('Settings Index', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        capturedPrimaryColorSettingProps = null;
    });

    it('renders PrimaryColorSetting component', () => {
        const tree = renderer.create(<Index />).toJSON() as renderer.ReactTestRendererJSON;
        const settings = findAll(tree, n => n.props?.testID === 'primary-color-setting');
        expect(settings.length).toBe(1);
    });

    it('renders the Primary Color setting item with title and description', () => {
        const tree = renderer.create(<Index />).toJSON() as renderer.ReactTestRendererJSON;
        const allText = collectText(tree);
        expect(allText).toContain('Primary Color');
        expect(allText).toContain('Change the primary color of the app');
    });

    it('renders the color fill icon', () => {
        const tree = renderer.create(<Index />).toJSON() as renderer.ReactTestRendererJSON;
        const icons = findAll(tree, n => n.props?.testID === 'icon-color-fill-sharp');
        expect(icons.length).toBe(1);
    });

    it('PrimaryColorSetting starts not visible', () => {
        renderer.create(<Index />);
        const props = capturedPrimaryColorSettingProps as Record<string, unknown>;
        expect(props).toBeTruthy();
        expect(props.visible).toBe(false);
    });
});
