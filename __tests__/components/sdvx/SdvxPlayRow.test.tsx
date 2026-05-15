import React from 'react';
import {render, screen} from '@testing-library/react-native';
import SdvxPlayRow from '@/components/sdvx/SdvxPlayRow';
import {SdvxPlay} from '@/types/sdvx-play';
import {SdvxDifficulty} from '@/enums/sdvx-difficulty';
import {SdvxClearType} from '@/enums/sdvx-clear-type';
import {TestRendererJSON} from '../../helpers/types';
import {collectText} from '../../helpers/tree-utils';

jest.mock('@/components/sdvx/SdvxDifficultyItem', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: 'sdvx-difficulty', ...props})};
});

jest.mock('@/components/sdvx/SdvxClearTypeItem', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: 'sdvx-clear-type', ...props})};
});

const mockPlay: SdvxPlay = {
    id: 1,
    title: 'Test Song',
    artist: 'Test Artist',
    difficulty: SdvxDifficulty.EXHAUST,
    level: 18,
    clear_type: SdvxClearType.CLEAR,
    score: 9800000,
    ex_score: 1500,
    grade: 'S',
};

describe('SdvxPlayRow', () => {
    it('renders the song title', async () => {
        await render(<SdvxPlayRow play={mockPlay}/>);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts).toContain('Test Song');
    });

    it('renders the artist under the title', async () => {
        await render(<SdvxPlayRow play={mockPlay}/>);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts).toContain('Test Artist');
    });

    it('omits the artist line when artist is falsy', async () => {
        await render(<SdvxPlayRow play={{...mockPlay, artist: ''} as SdvxPlay}/>);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts).not.toContain('Test Artist');
    });

    it('renders the GRADE label and value', async () => {
        await render(<SdvxPlayRow play={mockPlay}/>);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts).toContain('GRADE');
        expect(texts).toContain('S');
    });

    it('renders the SCORE label and formatted value', async () => {
        await render(<SdvxPlayRow play={mockPlay}/>);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts).toContain('SCORE');
        expect(texts).toContain('9,800,000');
    });

    it('renders the CLEAR LAMP label', async () => {
        await render(<SdvxPlayRow play={mockPlay}/>);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts).toContain('CLEAR LAMP');
    });

    it('renders ex score line when ex_score is non-zero', async () => {
        await render(<SdvxPlayRow play={mockPlay}/>);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        // RN splits text interpolations into separate string children
        expect(texts).toContain('1,500');
        expect(texts.some(t => t.includes('EX'))).toBe(true);
    });

    it('does not render ex score line when ex_score is 0', async () => {
        await render(<SdvxPlayRow play={{...mockPlay, ex_score: 0} as SdvxPlay}/>);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts.some(t => t.includes('EX'))).toBe(false);
    });

    it('does not render ex score line when ex_score is null', async () => {
        await render(<SdvxPlayRow play={{...mockPlay, ex_score: null} as unknown as SdvxPlay}/>);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts.some(t => t.includes('EX'))).toBe(false);
    });

    it('passes correct props to the difficulty component', async () => {
        await render(<SdvxPlayRow play={mockPlay}/>);
        const diffItem = screen.getByTestId('sdvx-difficulty');
        expect(diffItem.props.difficulty).toBe(SdvxDifficulty.EXHAUST);
        expect(diffItem.props.level).toBe(18);
    });

    it('passes correct clear type to the clear type component', async () => {
        await render(<SdvxPlayRow play={mockPlay}/>);
        const clearItem = screen.getByTestId('sdvx-clear-type');
        expect(clearItem.props.clearType).toBe(SdvxClearType.CLEAR);
    });
});
