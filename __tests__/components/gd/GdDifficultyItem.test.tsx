import React from 'react';
import {render, screen} from '@testing-library/react-native';
import GdDifficultyItem from '@/components/gd/GdDifficultyItem';
import {GdDifficulty} from '@/enums/gd-difficulty';
import {GdDifficultyType} from '@/enums/gd-difficulty-type';

const mockUseTheme = jest.fn();

jest.mock('@/hooks/useTheme', () => ({
    __esModule: true,
    default: () => mockUseTheme(),
}));

const DARK_THEME = {
    text: '#ECEDEE',
    background: '#151718',
    primary: '#f28b28',
    primarySurface: '#2a1f10',
    scheme: 'dark',
};

const LIGHT_THEME = {...DARK_THEME, scheme: 'light'};

describe('GdDifficultyItem', () => {
    beforeEach(() => {
        mockUseTheme.mockReturnValue(DARK_THEME);
    });

    it('renders difficulty type text', async () => {
        await render(<GdDifficultyItem difficulty={{type: GdDifficultyType.DRUM, difficulty: GdDifficulty.EXTREME, level: 500}}/>);
        expect(screen.getByText(GdDifficultyType.DRUM)).toBeTruthy();
    });

    it('renders difficulty name text', async () => {
        await render(<GdDifficultyItem difficulty={{type: GdDifficultyType.GUITAR, difficulty: GdDifficulty.BASIC, level: 200}}/>);
        expect(screen.getByText(GdDifficulty.BASIC)).toBeTruthy();
    });

    it('renders formatted skill level', async () => {
        await render(<GdDifficultyItem difficulty={{type: GdDifficultyType.DRUM, difficulty: GdDifficulty.EXTREME, level: 500}}/>);
        expect(screen.getByText('5.00')).toBeTruthy();
    });

    it('renders all three parts', async () => {
        await render(<GdDifficultyItem difficulty={{type: GdDifficultyType.BASS, difficulty: GdDifficulty.MASTER, level: 999}}/>);
        expect(screen.getByText(GdDifficultyType.BASS)).toBeTruthy();
        expect(screen.getByText(GdDifficulty.MASTER)).toBeTruthy();
        expect(screen.getByText('9.99')).toBeTruthy();
    });

    type WalkableNode = {parent: WalkableNode | null; props?: {style?: unknown}};
    function findSegmentBg(label: string): string | undefined {
        const node = screen.getByText(label) as unknown as WalkableNode;
        let current: WalkableNode | null = node.parent;
        while (current) {
            const style = current.props?.style;
            const flat = Array.isArray(style) ? style : [style];
            for (const entry of flat) {
                const bg = (entry as {backgroundColor?: string} | undefined)?.backgroundColor;
                if (typeof bg === 'string') return bg;
            }
            current = current.parent;
        }
        return undefined;
    }

    it('uses the base difficulty color in dark mode', async () => {
        mockUseTheme.mockReturnValue(DARK_THEME);
        await render(<GdDifficultyItem difficulty={{type: GdDifficultyType.DRUM, difficulty: GdDifficulty.EXTREME, level: 500}}/>);
        // EXTREME maps to '#a21e1e' (base color) — used directly without lightening.
        expect(findSegmentBg(GdDifficulty.EXTREME)).toBe('#a21e1e');
    });

    it('lightens the difficulty color in light mode', async () => {
        mockUseTheme.mockReturnValue(LIGHT_THEME);
        await render(<GdDifficultyItem difficulty={{type: GdDifficultyType.DRUM, difficulty: GdDifficulty.EXTREME, level: 500}}/>);
        const bg = findSegmentBg(GdDifficulty.EXTREME);
        // Base #a21e1e lightened by 0.2 — not the raw base color
        expect(bg).not.toBe('#a21e1e');
        expect(bg).toMatch(/^#[0-9a-f]{6}$/i);
    });
});
