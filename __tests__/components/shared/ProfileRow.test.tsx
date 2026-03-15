import React from 'react';
import {render, screen} from '@testing-library/react-native';
import ProfileRow from '@/components/shared/ProfileRow';
import {Text} from 'react-native';

describe('ProfileRow', () => {
    it('renders label text', async () => {
        await render(<ProfileRow icon={<Text>I</Text>} label="Name" value="Test"/>);
        expect(screen.getByText('Name')).toBeTruthy();
    });

    it('renders string value as text', async () => {
        await render(<ProfileRow icon={<Text>I</Text>} label="Name" value="John Doe"/>);
        expect(screen.getByText('John Doe')).toBeTruthy();
    });

    it('renders ReactNode value directly', async () => {
        await render(<ProfileRow icon={<Text>I</Text>} label="Name" value={<Text testID="custom">Custom</Text>}/>);
        expect(screen.getByTestId('custom')).toBeTruthy();
        expect(screen.getByText('Custom')).toBeTruthy();
    });

    it('renders the icon element', async () => {
        await render(<ProfileRow icon={<Text testID="icon">IC</Text>} label="Label" value="Val"/>);
        expect(screen.getByTestId('icon')).toBeTruthy();
    });
});
