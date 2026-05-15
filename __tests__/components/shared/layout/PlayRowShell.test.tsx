import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {Text} from 'react-native';
import PlayRowShell from '@/components/shared/layout/PlayRowShell';
import {collectText} from '../../../helpers/tree-utils';
import {TestRendererJSON} from '../../../helpers/types';

describe('PlayRowShell', () => {
    it('renders the title and artist', () => {
        render(
            <PlayRowShell
                title="Song Title"
                artist="Some Artist"
                difficultyChip={<Text>DIFF</Text>}
            >
                <Text>stats</Text>
            </PlayRowShell>,
        );
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts).toContain('Song Title');
        expect(texts).toContain('Some Artist');
    });

    it('omits the artist line when artist is not provided', () => {
        render(
            <PlayRowShell title="Solo Track" difficultyChip={<Text>D</Text>}>
                <Text>stats</Text>
            </PlayRowShell>,
        );
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts).toContain('Solo Track');
        // No artist line should be rendered when artist is undefined.
        expect(texts.filter(t => t.includes('Some Artist'))).toEqual([]);
    });

    it('renders the difficulty chip in the header', () => {
        render(
            <PlayRowShell title="X" difficultyChip={<Text>CHIP_LABEL</Text>}>
                <Text>stats</Text>
            </PlayRowShell>,
        );
        expect(screen.getByText('CHIP_LABEL')).toBeTruthy();
    });

    it('renders headerExtra alongside the difficulty chip', () => {
        render(
            <PlayRowShell
                title="X"
                difficultyChip={<Text>CHIP</Text>}
                headerExtra={<Text>EXTRA</Text>}
            >
                <Text>stats</Text>
            </PlayRowShell>,
        );
        expect(screen.getByText('EXTRA')).toBeTruthy();
    });

    it('renders children in the body slot', () => {
        render(
            <PlayRowShell title="X" difficultyChip={<Text>C</Text>}>
                <Text>BODY_CONTENT</Text>
            </PlayRowShell>,
        );
        expect(screen.getByText('BODY_CONTENT')).toBeTruthy();
    });
});
