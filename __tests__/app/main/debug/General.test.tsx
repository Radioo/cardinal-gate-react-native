import React from 'react';
import {render, screen} from '@testing-library/react-native';

jest.mock('@/components/shared/ShareImageModal', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', props)};
});

import General from '@/app/main/debug/General';

describe('Debug General', () => {
    it('renders without crashing', async () => {
        await render(<General />);
        expect(screen.toJSON()).toBeTruthy();
    });
});
