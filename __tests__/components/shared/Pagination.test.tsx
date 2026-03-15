import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import Pagination, {buildSlots, SLOT_COUNT} from '@/components/shared/Pagination';

jest.mock('lucide-react-native', () => {
    const RN = require('react');
    return {
        ChevronLeft: (props: Record<string, unknown>) => RN.createElement('View', props),
        ChevronRight: (props: Record<string, unknown>) => RN.createElement('View', props),
    };
});

jest.mock('@/components/shared/SetPageModal', () => {
    const RN = require('react');
    return {__esModule: true, default: () => RN.createElement('View')};
});

describe('buildSlots', () => {
    it('always returns exactly SLOT_COUNT slots', () => {
        expect(buildSlots(1, 1)).toHaveLength(SLOT_COUNT);
        expect(buildSlots(1, 5)).toHaveLength(SLOT_COUNT);
        expect(buildSlots(1, 100)).toHaveLength(SLOT_COUNT);
        expect(buildSlots(50, 100)).toHaveLength(SLOT_COUNT);
        expect(buildSlots(100, 100)).toHaveLength(SLOT_COUNT);
        expect(buildSlots(1, 0)).toHaveLength(SLOT_COUNT);
    });

    it('returns all pages with empty padding when total <= 7', () => {
        const slots = buildSlots(1, 5);
        const pages = slots.filter(s => s.type === 'page').map(s => s.type === 'page' ? s.page : null);
        expect(pages).toEqual([1, 2, 3, 4, 5]);
        expect(slots.filter(s => s.type === 'empty')).toHaveLength(2);
    });

    it('returns all empty slots when total is 0', () => {
        const slots = buildSlots(1, 0);
        expect(slots.every(s => s.type === 'empty')).toBe(true);
    });

    it('shows near-start pattern: 1 2 3 4 5 … N', () => {
        const slots = buildSlots(2, 20);
        const types = slots.map(s => s.type);
        expect(types).toEqual(['page', 'page', 'page', 'page', 'page', 'ellipsis', 'page']);
        const pages = slots.filter(s => s.type === 'page').map(s => s.type === 'page' ? s.page : null);
        expect(pages).toEqual([1, 2, 3, 4, 5, 20]);
    });

    it('shows middle pattern: 1 … X-1 X X+1 … N', () => {
        const slots = buildSlots(10, 20);
        const types = slots.map(s => s.type);
        expect(types).toEqual(['page', 'ellipsis', 'page', 'page', 'page', 'ellipsis', 'page']);
        const pages = slots.filter(s => s.type === 'page').map(s => s.type === 'page' ? s.page : null);
        expect(pages).toEqual([1, 9, 10, 11, 20]);
    });

    it('shows near-end pattern: 1 … N-4 N-3 N-2 N-1 N', () => {
        const slots = buildSlots(19, 20);
        const types = slots.map(s => s.type);
        expect(types).toEqual(['page', 'ellipsis', 'page', 'page', 'page', 'page', 'page']);
        const pages = slots.filter(s => s.type === 'page').map(s => s.type === 'page' ? s.page : null);
        expect(pages).toEqual([1, 16, 17, 18, 19, 20]);
    });

    it('handles exactly 7 pages without ellipsis', () => {
        const slots = buildSlots(4, 7);
        expect(slots.every(s => s.type === 'page')).toBe(true);
        const pages = slots.map(s => s.type === 'page' ? s.page : null);
        expect(pages).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('handles single page', () => {
        const slots = buildSlots(1, 1);
        expect(slots[0]).toEqual({type: 'page', page: 1});
        expect(slots.filter(s => s.type === 'empty')).toHaveLength(6);
    });
});

describe('Pagination', () => {
    it('shows all page buttons for small page counts', async () => {
        await render(<Pagination currentPage={2} totalPages={5} onPageChange={jest.fn()}/>);
        for (let i = 1; i <= 5; i++) {
            expect(screen.getByText(String(i))).toBeTruthy();
        }
    });

    it('calls onPageChange when a page button is pressed', async () => {
        const onPageChange = jest.fn();
        await render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange}/>);
        fireEvent.press(screen.getByText('4'));
        expect(onPageChange).toHaveBeenCalledWith(4);
    });

    it('calls onPageChange with previous page on prev button press', async () => {
        const onPageChange = jest.fn();
        await render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange}/>);
        const buttons = screen.getAllByRole('button');
        fireEvent.press(buttons[0]); // ChevronLeft (prev)
        expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it('calls onPageChange with next page on next button press', async () => {
        const onPageChange = jest.fn();
        await render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange}/>);
        const buttons = screen.getAllByRole('button');
        fireEvent.press(buttons[buttons.length - 1]); // ChevronRight (next)
        expect(onPageChange).toHaveBeenCalledWith(4);
    });

    it('disables prev button on first page', async () => {
        const onPageChange = jest.fn();
        await render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange}/>);
        const buttons = screen.getAllByRole('button');
        fireEvent.press(buttons[0]); // prev
        expect(onPageChange).not.toHaveBeenCalled();
    });

    it('disables next button on last page', async () => {
        const onPageChange = jest.fn();
        await render(<Pagination currentPage={5} totalPages={5} onPageChange={onPageChange}/>);
        const buttons = screen.getAllByRole('button');
        fireEvent.press(buttons[buttons.length - 1]); // next
        expect(onPageChange).not.toHaveBeenCalled();
    });

    it('disables all interactive elements when loading', async () => {
        const onPageChange = jest.fn();
        await render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} isLoading/>);
        // Press all page number buttons and nav buttons
        const buttons = screen.getAllByRole('button');
        buttons.forEach(button => fireEvent.press(button));
        screen.getAllByText(/\d/).forEach(el => fireEvent.press(el));
        expect(onPageChange).not.toHaveBeenCalled();
    });

    it('preserves totalPages layout during loading', async () => {
        const onPageChange = jest.fn();
        // First render with real data
        const {rerender} = await render(
            <Pagination currentPage={5} totalPages={20} onPageChange={onPageChange}/>
        );
        expect(screen.getByText('20')).toBeTruthy();

        // Re-render as loading with totalPages fallen back to 1
        await rerender(
            <Pagination currentPage={6} totalPages={1} onPageChange={onPageChange} isLoading/>
        );
        // Should still show the old totalPages (20) in the slots
        expect(screen.getByText('20')).toBeTruthy();
    });

    it('shows ellipsis for large page counts', async () => {
        await render(<Pagination currentPage={10} totalPages={20} onPageChange={jest.fn()}/>);
        expect(screen.getAllByText('…')).toHaveLength(2);
    });
});
