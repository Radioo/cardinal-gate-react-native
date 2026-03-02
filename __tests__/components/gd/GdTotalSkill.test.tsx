import React from 'react';
import renderer from 'react-test-renderer';
import GdTotalSkill from '@/components/gd/GdTotalSkill';

jest.mock('@/components/themed/GradientText', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: ({children, ...props}: Record<string, unknown>) => createElement('View', props, children)};
});

describe('GdTotalSkill', () => {
    it('renders with skill data', () => {
        const tree = renderer.create(
            <GdTotalSkill name="Drums" skill={500000} allMusicSkill={400000} />
        ).toJSON();
        expect(tree).toBeTruthy();
    });

    it('renders with undefined skill', () => {
        const tree = renderer.create(
            <GdTotalSkill name="Guitar" />
        ).toJSON();
        expect(tree).toBeTruthy();
    });
});
