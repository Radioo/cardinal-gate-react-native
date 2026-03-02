import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {TestRendererJSON} from '../../../helpers/types';

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

function findAll(node: TestRendererJSON | null, predicate: (n: TestRendererJSON) => boolean): TestRendererJSON[] {
    if (!node) return [];
    const results: TestRendererJSON[] = [];
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

function collectText(node: TestRendererJSON | null): string[] {
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

    it('renders PrimaryColorSetting component', async () => {
        await render(<Index />);
        const tree = screen.toJSON() as TestRendererJSON;
        const settings = findAll(tree, n => n.props?.testID === 'primary-color-setting');
        expect(settings.length).toBe(1);
    });

    it('renders the Primary Color setting item with title and description', async () => {
        await render(<Index />);
        const tree = screen.toJSON() as TestRendererJSON;
        const allText = collectText(tree);
        expect(allText).toContain('Primary Color');
        expect(allText).toContain('Change the primary color of the app');
    });

    it('renders the color fill icon', async () => {
        await render(<Index />);
        const tree = screen.toJSON() as TestRendererJSON;
        const icons = findAll(tree, n => n.props?.testID === 'icon-color-fill-sharp');
        expect(icons.length).toBe(1);
    });

    it('PrimaryColorSetting starts not visible', async () => {
        await render(<Index />);
        const props = capturedPrimaryColorSettingProps as Record<string, unknown>;
        expect(props).toBeTruthy();
        expect(props.visible).toBe(false);
    });
});
