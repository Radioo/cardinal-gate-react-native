import React from 'react';
import renderer from 'react-test-renderer';
import ProfileRow from '@/components/shared/ProfileRow';
import {Text} from 'react-native';

describe('ProfileRow', () => {
    it('renders with string value', () => {
        const tree = renderer.create(
            <ProfileRow icon={<Text>I</Text>} label="Name" value="Test"/>
        ).toJSON();
        expect(tree).toBeTruthy();
    });

    it('renders with ReactNode value', () => {
        const tree = renderer.create(
            <ProfileRow icon={<Text>I</Text>} label="Name" value={<Text>Custom</Text>}/>
        ).toJSON();
        expect(tree).toBeTruthy();
    });
});
