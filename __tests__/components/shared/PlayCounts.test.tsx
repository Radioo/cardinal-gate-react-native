import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {TestRendererJSON} from '../../helpers/types';
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

function collectTextContent(node: TestRendererJSON | TestRendererJSON[] | string | null): string[] {
    if (node === null) return [];
    if (typeof node === 'string') return [node];
    if (Array.isArray(node)) return node.flatMap(n => collectTextContent(n));
    const results: string[] = [];
    if (node.children) {
        for (const child of node.children) {
            results.push(...collectTextContent(child));
        }
    }
    return results;
}

describe('PlayCounts', () => {
    it('renders loading state when isPending is true', async () => {
        mockUseSummary.mockReturnValue({
            data: undefined,
            isPending: true,
        });
        await render(<PlayCounts />);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectTextContent(tree);
        // FullScreenLoader does not show text content like "plays"
        expect(texts.find(t => t.includes('plays'))).toBeUndefined();
    });

    it('renders play count items with series names', async () => {
        mockUseSummary.mockReturnValue({
            data: {
                play_counts: [
                    {game: 'iidx', count: 100},
                    {game: 'sdvx', count: 200},
                ],
            },
            isPending: false,
        });
        await render(<PlayCounts />);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectTextContent(tree);
        expect(texts).toContain('beatmania IIDX');
        expect(texts).toContain('SOUND VOLTEX');
    });

    it('renders play count numbers with locale formatting', async () => {
        mockUseSummary.mockReturnValue({
            data: {
                play_counts: [
                    {game: 'iidx', count: 100},
                    {game: 'sdvx', count: 200},
                ],
            },
            isPending: false,
        });
        await render(<PlayCounts />);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectTextContent(tree);
        // count.toLocaleString() + " plays" renders as separate children
        expect(texts.find(t => t.includes('100'))).toBeTruthy();
        expect(texts.find(t => t.includes('200'))).toBeTruthy();
        expect(texts.find(t => t.includes('plays'))).toBeTruthy();
    });

    it('renders estimated play time', async () => {
        mockUseSummary.mockReturnValue({
            data: {
                play_counts: [
                    {game: 'iidx', count: 150},
                ],
            },
            isPending: false,
        });
        await render(<PlayCounts />);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectTextContent(tree);
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
        const texts = collectTextContent(tree);
        expect(texts).toContain('Estimated play time: ');
        expect(texts).toContain('0');
        expect(texts).toContain(' hours');
    });

    it('renders formatted play counts with thousands separators', async () => {
        mockUseSummary.mockReturnValue({
            data: {
                play_counts: [
                    {game: 'iidx', count: 12345},
                ],
            },
            isPending: false,
        });
        await render(<PlayCounts />);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectTextContent(tree);
        // 12345.toLocaleString() = "12,345"
        expect(texts.find(t => t.includes('12,345'))).toBeTruthy();
    });
});
