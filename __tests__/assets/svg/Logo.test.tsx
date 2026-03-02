import React from 'react';
import {render, screen} from '@testing-library/react-native';
import Logo from '@/assets/svg/Logo';

jest.mock('react-native-svg', () => {
    const {createElement} = require('react');
    return {SvgXml: (props: Record<string, unknown>) => createElement('View', props)};
});

describe('Logo', () => {
    it('renders with width and height', async () => {
        await render(<Logo width="50%" height="25%"/>);
        expect(screen.toJSON()).toBeTruthy();
    });
});
