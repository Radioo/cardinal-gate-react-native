import React from 'react';
import {render, screen} from '@testing-library/react-native';

jest.mock('@/components/iidx/IidxDifficultyItem', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', props)};
});

import Iidx from '@/app/main/debug/Iidx';

describe('Debug Iidx', () => {
    it('renders without crashing', async () => {
        await render(<Iidx />);
        expect(screen.toJSON()).toBeTruthy();
    });
});
