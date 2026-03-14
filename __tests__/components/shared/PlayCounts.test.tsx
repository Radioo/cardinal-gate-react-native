import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {TestRendererJSON} from '../../helpers/types';
import {collectText} from '../../helpers/tree-utils';
import PlayCounts from '@/components/shared/PlayCounts';

jest.mock('lucide-react-native', () => ({
    Clock: 'Clock',
}));

const mockUseSummary = jest.fn();

jest.mock('@/hooks/queries/useSummary', () => ({
    __esModule: true,
    default: () => mockUseSummary(),
}));

jest.mock('@/services/game', () => ({
    getSeriesName: (series: string) => {
        const names: Record<string, string> = {
            iidx: 'beatmania IIDX',
            sdvx: 'SOUND VOLTEX',
            gd: 'GuitarFreaks & DrumMania',
        };
        return names[series] ?? 'Unknown series';
    },
    estimatePlayTimeHours: (playCounts: {count: number}[]) => {
        const minutes = playCounts.reduce((total: number, item: {count: number}) => total + item.count * 2, 0);
        const hours = minutes / 60;
        return Number.isInteger(hours) ? hours.toString() : hours.toFixed(1);
    },
}));

describe('PlayCounts', () => {
    it('renders loading state when isPending is true', async () => {
        mockUseSummary.mockReturnValue({
            data: undefined,
            isPending: true,
        });
        await render(<PlayCounts />);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        // FullScreenLoader does not show text content like "plays"
        expect(texts.find(t => t.includes('plays'))).toBeUndefined();
    });

    it('renders play count items with series names', async () => {
        mockUseSummary.mockReturnValue({
            data: {
                play_counts: [
                    {series: 'iidx', count: 100},
                    {series: 'sdvx', count: 200},
                ],
            },
            isPending: false,
        });
        await render(<PlayCounts />);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts).toContain('beatmania IIDX');
        expect(texts).toContain('SOUND VOLTEX');
    });

    it('renders play count numbers with locale formatting', async () => {
        mockUseSummary.mockReturnValue({
            data: {
                play_counts: [
                    {series: 'iidx', count: 100},
                    {series: 'sdvx', count: 200},
                ],
            },
            isPending: false,
        });
        await render(<PlayCounts />);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        // count.toLocaleString() + " plays" renders as separate children
        expect(texts.find(t => t.includes('100'))).toBeTruthy();
        expect(texts.find(t => t.includes('200'))).toBeTruthy();
        expect(texts.find(t => t.includes('plays'))).toBeTruthy();
    });

    it('renders estimated play time', async () => {
        mockUseSummary.mockReturnValue({
            data: {
                play_counts: [
                    {series: 'iidx', count: 150},
                ],
            },
            isPending: false,
        });
        await render(<PlayCounts />);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        // 150 plays * 2 min = 300 min = 5 hours
        expect(texts).toContain('Estimated play time: ');
        expect(texts).toContain('5');
        expect(texts).toContain(' hours');
    });

    it('renders zero play time when no play counts', async () => {
        mockUseSummary.mockReturnValue({
            data: {
                play_counts: [],
            },
            isPending: false,
        });
        await render(<PlayCounts />);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts).toContain('Estimated play time: ');
        expect(texts).toContain('0');
        expect(texts).toContain(' hours');
    });

    it('renders formatted play counts with thousands separators', async () => {
        mockUseSummary.mockReturnValue({
            data: {
                play_counts: [
                    {series: 'iidx', count: 12345},
                ],
            },
            isPending: false,
        });
        await render(<PlayCounts />);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        // 12345.toLocaleString() = "12,345"
        expect(texts.find(t => t.includes('12,345'))).toBeTruthy();
    });

    it('renders error state when isError is true', async () => {
        mockUseSummary.mockReturnValue({
            data: undefined,
            isPending: false,
            isError: true,
            error: new Error('Network error'),
            refetch: jest.fn(),
        });
        await render(<PlayCounts />);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts.find(t => t.includes('Network error'))).toBeTruthy();
    });
});
