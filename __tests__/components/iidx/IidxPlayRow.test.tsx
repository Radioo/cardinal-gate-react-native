import React from 'react';
import renderer from 'react-test-renderer';
import IidxPlayRow from '@/components/iidx/IidxPlayRow';
import {IidxPlay} from '@/types/iidx-play';

jest.mock('@/components/shared/ShareImageModal', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: 'share-modal', ...props})};
});

jest.mock('@/components/iidx/IidxDifficulty', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: 'difficulty', ...props})};
});

jest.mock('@/components/iidx/IidxClearTypeItem', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: 'clear-type', ...props})};
});

jest.mock('@expo/vector-icons', () => ({FontAwesome: 'FontAwesome'}));

const mockPlay: IidxPlay = {
    id: 1,
    name: 'Test Song',
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

function collectTextContent(node: renderer.ReactTestRendererJSON | renderer.ReactTestRendererJSON[] | string | null): string[] {
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

describe('IidxPlayRow', () => {
    it('renders the song name', () => {
        const tree = renderer.create(
            <IidxPlayRow play={mockPlay}/>
        ).toJSON() as renderer.ReactTestRendererJSON;
        const texts = collectTextContent(tree);
        expect(texts).toContain('Test Song');
    });

    it('renders ex score with EX suffix', () => {
        const tree = renderer.create(
            <IidxPlayRow play={mockPlay}/>
        ).toJSON() as renderer.ReactTestRendererJSON;
        const texts = collectTextContent(tree);
        // toLocaleString produces "1,500" and then " EX" is appended
        const exScoreText = texts.find(t => t.includes('EX'));
        expect(exScoreText).toBeTruthy();
    });

    it('renders percentage', () => {
        const tree = renderer.create(
            <IidxPlayRow play={mockPlay}/>
        ).toJSON() as renderer.ReactTestRendererJSON;
        const texts = collectTextContent(tree);
        // percentage.toFixed(2) = "85.50" + "%"
        const pctText = texts.find(t => t.includes('85.50'));
        expect(pctText).toBeTruthy();
    });

    it('renders grade text', () => {
        const tree = renderer.create(
            <IidxPlayRow play={mockPlay}/>
        ).toJSON() as renderer.ReactTestRendererJSON;
        const texts = collectTextContent(tree);
        expect(texts).toContain('AAA');
    });

    it('renders perfect and great counts', () => {
        const tree = renderer.create(
            <IidxPlayRow play={mockPlay}/>
        ).toJSON() as renderer.ReactTestRendererJSON;
        const texts = collectTextContent(tree);
        const pgText = texts.find(t => t.includes('PG'));
        expect(pgText).toBeTruthy();
        const grText = texts.find(t => t.includes('GR'));
        expect(grText).toBeTruthy();
    });

    it('renders miss count when present', () => {
        const tree = renderer.create(
            <IidxPlayRow play={mockPlay}/>
        ).toJSON() as renderer.ReactTestRendererJSON;
        const texts = collectTextContent(tree);
        const mcText = texts.find(t => t.includes('MC'));
        expect(mcText).toBeTruthy();
    });

    it('does not render miss count when null', () => {
        const playNoMiss = {...mockPlay, miss_count: null} as IidxPlay;
        const tree = renderer.create(
            <IidxPlayRow play={playNoMiss}/>
        ).toJSON() as renderer.ReactTestRendererJSON;
        const texts = collectTextContent(tree);
        const mcText = texts.find(t => t.includes('MC'));
        expect(mcText).toBeUndefined();
    });

    it('renders camera button when has_score_card is true', () => {
        const root = renderer.create(
            <IidxPlayRow play={mockPlay}/>
        ).root;
        const cameraIcons = root.findAllByType('FontAwesome' as unknown as React.ComponentClass);
        expect(cameraIcons.length).toBe(1);
    });

    it('does not render camera button when has_score_card is false', () => {
        const playWithoutCard = {...mockPlay, has_score_card: false} as IidxPlay;
        const root = renderer.create(
            <IidxPlayRow play={playWithoutCard}/>
        ).root;
        const cameraIcons = root.findAllByType('FontAwesome' as unknown as React.ComponentClass);
        expect(cameraIcons.length).toBe(0);
    });

    it('passes correct props to difficulty component', () => {
        const root = renderer.create(
            <IidxPlayRow play={mockPlay}/>
        ).root;
        const diffItem = root.findByProps({testID: 'difficulty'});
        expect(diffItem.props.difficulty).toBe('SPA');
        expect(diffItem.props.level).toBe(12);
    });

    it('passes correct clear type to clear type component', () => {
        const root = renderer.create(
            <IidxPlayRow play={mockPlay}/>
        ).root;
        const clearItem = root.findByProps({testID: 'clear-type'});
        expect(clearItem.props.clearType).toBe('CLEAR');
    });
});
