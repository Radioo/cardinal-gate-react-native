import React from 'react';
import {render, screen} from '@testing-library/react-native';
import FullScreenLoader from '@/components/shared/FullScreenLoader';

describe('FullScreenLoader', () => {
    it('renders without crashing', async () => {
        await render(<FullScreenLoader />);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders with custom style', async () => {
        await render(<FullScreenLoader style={{backgroundColor: 'red'}} />);
        expect(screen.toJSON()).toBeTruthy();
    });
});
