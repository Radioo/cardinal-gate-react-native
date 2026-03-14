import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {TestRendererJSON} from '../../../helpers/types';
import {collectText, findAll} from '../../../helpers/tree-utils';

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

jest.mock('lucide-react-native', () => ({
    Paintbrush: (props: Record<string, unknown>) => require('react').createElement('View', {...props, testID: 'icon-paintbrush'}),
}));

import Index from '@/app/main/settings/index';

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
        const icons = findAll(tree, n => n.props?.testID === 'icon-paintbrush');
        expect(icons.length).toBe(1);
    });

    it('PrimaryColorSetting starts not visible', async () => {
        await render(<Index />);
        const props = capturedPrimaryColorSettingProps as Record<string, unknown>;
        expect(props).toBeTruthy();
        expect(props.visible).toBe(false);
    });
});
