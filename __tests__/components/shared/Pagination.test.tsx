import React from 'react';
import {render, screen} from '@testing-library/react-native';
import Pagination from '@/components/shared/Pagination';

jest.mock('@expo/vector-icons', () => {
    const RN = require('react');
    return {
        Entypo: (props: Record<string, unknown>) => RN.createElement('View', props),
    };
});

jest.mock('@expo/vector-icons/Entypo', () => {
    const RN = require('react');
    return (props: Record<string, unknown>) => RN.createElement('View', props);
});

jest.mock('@/components/shared/SetPageModal', () => {
    const RN = require('react');
    return {__esModule: true, default: () => RN.createElement('View')};
});

describe('Pagination', () => {
    it('renders current page label', async () => {
        await render(<Pagination currentPage={3} totalPages={10} onPageChange={jest.fn()}/>);
        const json = JSON.stringify(screen.toJSON());
        expect(json).toContain('3 / 10');
    });

    it('disables prev button on first page', async () => {
        await render(<Pagination currentPage={1} totalPages={5} onPageChange={jest.fn()}/>);
        const json = JSON.stringify(screen.toJSON());
        // First button (prev) should be disabled on page 1
        expect(json).toContain('"disabled":true');
    });

    it('disables next button on last page', async () => {
        await render(<Pagination currentPage={5} totalPages={5} onPageChange={jest.fn()}/>);
        const json = JSON.stringify(screen.toJSON());
        expect(json).toContain('"disabled":true');
    });

    it('renders loading state with disabled buttons', async () => {
        await render(<Pagination currentPage={2} totalPages={5} onPageChange={jest.fn()} isLoading/>);
        const json = JSON.stringify(screen.toJSON());
        // When loading, both nav buttons should be disabled
        expect(json).toContain('"disabled":true');
    });

    it('formats large page numbers with locale string', async () => {
        await render(<Pagination currentPage={1000} totalPages={5000} onPageChange={jest.fn()}/>);
        const json = JSON.stringify(screen.toJSON());
        expect(json).toContain('1,000');
        expect(json).toContain('5,000');
    });
});
