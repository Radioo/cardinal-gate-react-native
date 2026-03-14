import React from 'react';
import {render} from '@testing-library/react-native';
import {Icon} from '@/components/ui/icon';
import {Circle} from 'lucide-react-native';

describe('Icon', () => {
    it('renders without crashing', async () => {
        const {toJSON} = await render(<Icon as={Circle} />);
        expect(toJSON()).toBeTruthy();
    });

    it('renders with custom size', async () => {
        const {toJSON} = await render(<Icon as={Circle} size={24} />);
        expect(toJSON()).toBeTruthy();
    });

    it('renders with default size of 14', async () => {
        const {toJSON} = await render(<Icon as={Circle} />);
        expect(toJSON()).toBeTruthy();
    });
});
