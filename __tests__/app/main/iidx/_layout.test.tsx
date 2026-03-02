import React from 'react';
import {render, screen} from '@testing-library/react-native';

jest.mock('@/components/shared/GameTabLayout', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', props)};
});

import Layout from '@/app/main/iidx/_layout';

describe('IIDX Layout', () => {
    it('renders without crashing', async () => {
        await render(<Layout />);
        expect(screen.toJSON()).toBeTruthy();
    });
});
