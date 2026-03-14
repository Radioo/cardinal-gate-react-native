import React from 'react';
import {render, screen} from '@testing-library/react-native';
import SdvxPlayRow from '@/components/sdvx/SdvxPlayRow';
import {SdvxPlay} from '@/types/sdvx-play';
import {SdvxDifficulty} from '@/enums/sdvx-difficulty';
import {SdvxClearType} from '@/enums/sdvx-clear-type';

jest.mock('@/components/sdvx/SdvxDifficultyItem', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: 'sdvx-difficulty', ...props})};
});

jest.mock('@/components/sdvx/SdvxClearTypeItem', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: 'sdvx-clear-type', ...props})};
});

jest.mock('polished', () => ({
    darken: (_a: number, c: string) => c,
    lighten: (_a: number, c: string) => c,
}));

const mockPlay: SdvxPlay = {
    id: 1,
    title: 'Test Song',
    artist: 'Test Artist',
    difficulty: SdvxDifficulty.EXHAUST,
    level: 18,
    clear_type: SdvxClearType.COMPLETE,
    score: 9800000,
    ex_score: 1500,
    grade: 'S',
};

describe('SdvxPlayRow', () => {
    it('renders the song title', async () => {
        await render(<SdvxPlayRow play={mockPlay}/>);
        const json = JSON.stringify(screen.toJSON());
        expect(json).toContain('Test Song');
    });

    it('renders the score formatted with locale separators', async () => {
        await render(<SdvxPlayRow play={mockPlay}/>);
        const json = JSON.stringify(screen.toJSON());
        expect(json).toContain('9,800,000');
    });

    it('renders the grade', async () => {
        await render(<SdvxPlayRow play={mockPlay}/>);
        const json = JSON.stringify(screen.toJSON());
        expect(json).toContain('"S"');
    });

    it('renders ex score when non-zero', async () => {
        await render(<SdvxPlayRow play={mockPlay}/>);
        const json = JSON.stringify(screen.toJSON());
        expect(json).toContain('1,500');
        expect(json).toContain(' EX');
    });

    it('does not render ex score text when zero', async () => {
        const playNoEx = {...mockPlay, ex_score: 0} as SdvxPlay;
        await render(<SdvxPlayRow play={playNoEx}/>);
        const json = JSON.stringify(screen.toJSON());
        // "EXH" will still appear in the difficulty props, but the "X EX" text should not
        expect(json).not.toContain(' EX');
    });

    it('does not render ex score text when null', async () => {
        const playNullEx = {...mockPlay, ex_score: null} as unknown as SdvxPlay;
        await render(<SdvxPlayRow play={playNullEx}/>);
        const json = JSON.stringify(screen.toJSON());
        expect(json).not.toContain(' EX');
    });

    it('passes correct props to difficulty component', async () => {
        await render(<SdvxPlayRow play={mockPlay}/>);
        const diffItem = screen.getByTestId('sdvx-difficulty');
        expect(diffItem.props.difficulty).toBe('EXH');
        expect(diffItem.props.level).toBe(18);
    });

    it('passes correct clear type to clear type component', async () => {
        await render(<SdvxPlayRow play={mockPlay}/>);
        const clearItem = screen.getByTestId('sdvx-clear-type');
        expect(clearItem.props.clearType).toBe(SdvxClearType.COMPLETE);
    });
});
