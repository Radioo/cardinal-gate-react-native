import React from 'react';
import {render, screen} from '@testing-library/react-native';

jest.mock('@/components/gd/GdDifficultyItem', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', props)};
});

import Gd from '@/app/main/debug/Gd';

describe('Debug Gd', () => {
    it('renders without crashing', async () => {
        await render(<Gd />);
        expect(screen.toJSON()).toBeTruthy();
    });
});
