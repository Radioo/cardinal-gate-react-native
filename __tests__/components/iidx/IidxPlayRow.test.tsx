import React from 'react';
import {render, screen} from '@testing-library/react-native';
import IidxPlayRow from '@/components/iidx/IidxPlayRow';
import {IidxPlay} from '@/types/iidx-play';
import {TestRendererJSON} from '../../helpers/types';
import {collectText} from '../../helpers/tree-utils';

jest.mock('@/components/shared/modal/ShareImageModal', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: 'share-modal', ...props})};
});

jest.mock('@/components/iidx/IidxDifficultyItem', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: 'difficulty', ...props})};
});

jest.mock('@/components/iidx/IidxClearTypeItem', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: 'clear-type', ...props})};
});

jest.mock('lucide-react-native', () => ({Camera: 'Camera'}));

const mockPlay: IidxPlay = {
    id: 1,
    title: 'Test Song',
    difficulty: 'SPA',
    level: 12,
    clear_type: 'CLEAR',
    ex_score: 1500,
    percentage: 85.5,
    grade: 'AAA',
    perfect_count: 1000,
    great_count: 500,
    miss_count: 10,
    has_score_card: true,
} as IidxPlay;

describe('IidxPlayRow', () => {
    it('renders the song name', async () => {
        await render(<IidxPlayRow play={mockPlay}/>);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts).toContain('Test Song');
    });

    it('renders the EX SCORE label', async () => {
        await render(<IidxPlayRow play={mockPlay}/>);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts).toContain('EX SCORE');
    });

    it('renders the formatted ex score value', async () => {
        await render(<IidxPlayRow play={mockPlay}/>);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts).toContain('1,500');
    });

    it('renders percentage with two decimal places', async () => {
        await render(<IidxPlayRow play={mockPlay}/>);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts.find(t => t.includes('85.50'))).toBeTruthy();
    });

    it('renders grade text', async () => {
        await render(<IidxPlayRow play={mockPlay}/>);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts).toContain('AAA');
    });

    it('renders artist below title', async () => {
        await render(<IidxPlayRow play={{...mockPlay, artist: 'BEMANI'} as IidxPlay}/>);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts).toContain('BEMANI');
    });

    it('renders PERFECT label with locale-formatted count', async () => {
        await render(<IidxPlayRow play={mockPlay}/>);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts).toContain('PERFECT');
        expect(texts).toContain('1,000');
    });

    it('renders GREAT label with locale-formatted count', async () => {
        await render(<IidxPlayRow play={mockPlay}/>);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts).toContain('GREAT');
        expect(texts).toContain('500');
    });

    it('renders MISS COUNT label with the miss count when present', async () => {
        await render(<IidxPlayRow play={mockPlay}/>);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts).toContain('MISS COUNT');
        expect(texts).toContain('10');
    });

    it('renders an em-dash in the MISS COUNT cell when null', async () => {
        const playNoMiss = {...mockPlay, miss_count: null} as IidxPlay;
        await render(<IidxPlayRow play={playNoMiss}/>);
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts).toContain('MISS COUNT');
        expect(texts).toContain('—');
    });

    it('renders camera button when has_score_card is true', async () => {
        await render(<IidxPlayRow play={mockPlay}/>);
        const json = JSON.stringify(screen.toJSON());
        expect((json.match(/"Camera"/g) || []).length).toBe(1);
    });

    it('does not render camera button when has_score_card is false', async () => {
        const playWithoutCard = {...mockPlay, has_score_card: false} as IidxPlay;
        await render(<IidxPlayRow play={playWithoutCard}/>);
        const json = JSON.stringify(screen.toJSON());
        expect(json).not.toContain('"Camera"');
    });

    it('passes correct props to difficulty component', async () => {
        await render(<IidxPlayRow play={mockPlay}/>);
        const diffItem = screen.getByTestId('difficulty');
        expect(diffItem.props.difficulty).toBe('SPA');
        expect(diffItem.props.level).toBe(12);
    });

    it('passes correct clear type to clear type component', async () => {
        await render(<IidxPlayRow play={mockPlay}/>);
        const clearItem = screen.getByTestId('clear-type');
        expect(clearItem.props.clearType).toBe('CLEAR');
    });
});
