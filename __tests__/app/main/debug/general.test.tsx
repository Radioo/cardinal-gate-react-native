import React from 'react';
import {render, screen} from '@testing-library/react-native';

jest.mock('@/components/shared/modal/ShareImageModal', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', props)};
});

import General from '@/app/main/debug/general';

describe('Debug General', () => {
    it('renders without crashing', async () => {
        await render(<General />);
        expect(screen.toJSON()).toBeTruthy();
    });
});
