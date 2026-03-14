import React from 'react';
import {render, screen} from '@testing-library/react-native';

jest.mock('@/components/shared/GameTabLayout', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', props)};
});

jest.mock('lucide-react-native', () => ({Wrench: 'Wrench', Drum: 'Drum', Disc: 'Disc', Hexagon: 'Hexagon'}));

import Layout from '@/app/main/debug/_layout';

describe('Debug Layout', () => {
    it('renders without crashing', async () => {
        await render(<Layout />);
        expect(screen.toJSON()).toBeTruthy();
    });
});
