import React from 'react';
import {render, screen} from '@testing-library/react-native';
import GdTotalSkill from '@/components/gd/GdTotalSkill';

jest.mock('@/components/shared/GradientText', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: ({children, ...props}: Record<string, unknown>) => createElement('Text', props, children)};
});

describe('GdTotalSkill', () => {
    it('renders the title and formatted skill values', async () => {
        await render(<GdTotalSkill name="Drums" skill={50000} allMusicSkill={40000} />);
        // skill is 1/100-scaled: 50000 → 500.00
        expect(screen.getByText('Drums')).toBeTruthy();
        expect(screen.getByText('500.00')).toBeTruthy();
        expect(screen.getByText('400.00')).toBeTruthy();
    });

    it('renders ??? for undefined skill values', async () => {
        await render(<GdTotalSkill name="Guitar" />);
        expect(screen.getByText('Guitar')).toBeTruthy();
        expect(screen.getAllByText('???').length).toBeGreaterThan(0);
    });
});
