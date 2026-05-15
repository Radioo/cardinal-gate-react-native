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

    it('uses the base difficulty color in dark mode', async () => {
        mockUseTheme.mockReturnValue(DARK_THEME);
        await render(<GdDifficultyItem difficulty={{type: GdDifficultyType.DRUM, difficulty: GdDifficulty.EXTREME, level: 500}}/>);
        const difficultyText = screen.getByText(GdDifficulty.EXTREME);
        // EXTREME maps to '#a21e1e' (base color) — should be used directly without lightening.
        expect(difficultyText.props.style.backgroundColor).toBe('#a21e1e');
    });

    it('lightens the difficulty color in light mode', async () => {
        mockUseTheme.mockReturnValue(LIGHT_THEME);
        await render(<GdDifficultyItem difficulty={{type: GdDifficultyType.DRUM, difficulty: GdDifficulty.EXTREME, level: 500}}/>);
        const difficultyText = screen.getByText(GdDifficulty.EXTREME);
        // Base #a21e1e lightened by 0.2 — not the raw base color
        expect(difficultyText.props.style.backgroundColor).not.toBe('#a21e1e');
        expect(difficultyText.props.style.backgroundColor).toMatch(/^#[0-9a-f]{6}$/i);
    });
});
