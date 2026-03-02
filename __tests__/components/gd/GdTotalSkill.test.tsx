import React from 'react';
import {render, screen} from '@testing-library/react-native';
import GdTotalSkill from '@/components/gd/GdTotalSkill';

jest.mock('@/components/themed/GradientText', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: ({children, ...props}: Record<string, unknown>) => createElement('Text', props, children)};
});

describe('GdTotalSkill', () => {
    it('renders with skill data', async () => {
        await render(<GdTotalSkill name="Drums" skill={500000} allMusicSkill={400000} />);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders with undefined skill', async () => {
        await render(<GdTotalSkill name="Guitar" />);
        expect(screen.toJSON()).toBeTruthy();
    });
});
