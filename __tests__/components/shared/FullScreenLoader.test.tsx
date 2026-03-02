import React from 'react';
import renderer from 'react-test-renderer';
import FullScreenLoader from '@/components/shared/FullScreenLoader';

describe('FullScreenLoader', () => {
    it('renders without crashing', () => {
        const tree = renderer.create(<FullScreenLoader />).toJSON();
        expect(tree).toBeTruthy();
    });

    it('renders with custom style', () => {
        const tree = renderer.create(
            <FullScreenLoader style={{backgroundColor: 'red'}} />
        ).toJSON();
        expect(tree).toBeTruthy();
    });
});
