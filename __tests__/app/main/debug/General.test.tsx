import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('@/components/shared/ShareImageModal', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', props)};
});

import General from '@/app/main/debug/General';

describe('Debug General', () => {
    it('renders without crashing', () => {
        const tree = renderer.create(<General />).toJSON();
        expect(tree).toBeTruthy();
    });
});
