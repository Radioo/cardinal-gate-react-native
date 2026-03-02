import React from 'react';
import renderer from 'react-test-renderer';
import SdvxPlayRow from '@/components/sdvx/SdvxPlayRow';
import {SdvxPlay} from '@/types/sdvx-play';

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
    title: 'Test Song',
    difficulty: 'EXH',
    level: 18,
    clear_type: 'COMPLETE',
    score: 9800000,
    ex_score: 1500,
    grade: 'S',
} as SdvxPlay;

describe('SdvxPlayRow', () => {
    it('renders the song title', () => {
        const json = JSON.stringify(
            renderer.create(<SdvxPlayRow play={mockPlay}/>).toJSON()
        );
        expect(json).toContain('Test Song');
    });

    it('renders the score formatted with locale separators', () => {
        const json = JSON.stringify(
            renderer.create(<SdvxPlayRow play={mockPlay}/>).toJSON()
        );
        expect(json).toContain('9,800,000');
    });

    it('renders the grade', () => {
        const json = JSON.stringify(
            renderer.create(<SdvxPlayRow play={mockPlay}/>).toJSON()
        );
        expect(json).toContain('"S"');
    });

    it('renders ex score when non-zero', () => {
        const json = JSON.stringify(
            renderer.create(<SdvxPlayRow play={mockPlay}/>).toJSON()
        );
        expect(json).toContain('1,500');
        expect(json).toContain(' EX');
    });

    it('does not render ex score text when zero', () => {
        const playNoEx = {...mockPlay, ex_score: 0} as SdvxPlay;
        const json = JSON.stringify(
            renderer.create(<SdvxPlayRow play={playNoEx}/>).toJSON()
        );
        // "EXH" will still appear in the difficulty props, but the "X EX" text should not
        expect(json).not.toContain(' EX');
    });

    it('does not render ex score text when null', () => {
        const playNullEx = {...mockPlay, ex_score: null} as unknown as SdvxPlay;
        const json = JSON.stringify(
            renderer.create(<SdvxPlayRow play={playNullEx}/>).toJSON()
        );
        expect(json).not.toContain(' EX');
    });

    it('passes correct props to difficulty component', () => {
        const root = renderer.create(<SdvxPlayRow play={mockPlay}/>).root;
        const diffItem = root.findByProps({testID: 'sdvx-difficulty'});
        expect(diffItem.props.difficulty).toBe('EXH');
        expect(diffItem.props.level).toBe(18);
    });

    it('passes correct clear type to clear type component', () => {
        const root = renderer.create(<SdvxPlayRow play={mockPlay}/>).root;
        const clearItem = root.findByProps({testID: 'sdvx-clear-type'});
        expect(clearItem.props.clearType).toBe('COMPLETE');
    });
});
