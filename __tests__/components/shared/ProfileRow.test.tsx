import React from 'react';
import {render, screen} from '@testing-library/react-native';
import ProfileRow from '@/components/shared/ProfileRow';
import {Text} from 'react-native';

describe('ProfileRow', () => {
    it('renders with string value', async () => {
        await render(<ProfileRow icon={<Text>I</Text>} label="Name" value="Test"/>);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders with ReactNode value', async () => {
        await render(<ProfileRow icon={<Text>I</Text>} label="Name" value={<Text>Custom</Text>}/>);
        expect(screen.toJSON()).toBeTruthy();
    });
});
