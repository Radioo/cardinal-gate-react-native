import React from 'react';
import renderer from 'react-test-renderer';
import Logo from '@/assets/svg/Logo';

jest.mock('react-native-svg', () => {
    const {createElement} = require('react');
    return {SvgXml: (props: Record<string, unknown>) => createElement('View', props)};
});

describe('Logo', () => {
    it('renders with width and height', () => {
        const tree = renderer.create(
            <Logo width="50%" height="25%"/>
        ).toJSON();
        expect(tree).toBeTruthy();
    });
});
