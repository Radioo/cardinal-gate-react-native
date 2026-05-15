const mockFetchApi = jest.fn();

jest.mock('@/services/api', () => ({
    __esModule: true,
    fetchApi: (...args: unknown[]) => mockFetchApi(...args),
}));

import React from 'react';
import {waitFor} from '@testing-library/react-native';
import useIidxPlays from '@/hooks/queries/useIidxPlays';
import {createTestClient, renderWithClient} from '@/__tests__/helpers/renderWithClient';
import {IidxPlay} from '@/types/iidx-play';

function Capture({page, sink}: {page: number; sink: (value: ReturnType<typeof useIidxPlays>) => void}) {
    const result = useIidxPlays(page);
    sink(result);
    return React.createElement('Text', null, 'test');
}

describe('useIidxPlays', () => {
    beforeEach(() => {
        mockFetchApi.mockReset();
    });

    it('hits the path-param plays endpoint', async () => {
        mockFetchApi.mockResolvedValue({pages: 1, plays: []});
        const client = createTestClient();
        const tree = await renderWithClient(
            client,
            React.createElement(Capture, {page: 3, sink: () => {}}),
        );
        await waitFor(() => expect(mockFetchApi).toHaveBeenCalledWith('/api2/iidx/plays/3'));
        client.cancelQueries();
        tree.unmount();
        client.clear();
    });

    it('translates the wire `name` field to the canonical `title`', async () => {
        mockFetchApi.mockResolvedValue({
            pages: 2,
            plays: [{
                id: 1,
                name: 'Wire Song Name',
                artist: 'Test Artist',
                difficulty: 'SPA',
                level: 12,
                clear_type: 'CLEAR',
                dead: false,
                ex_score: 1500,
                perfect_count: 1000,
                great_count: 500,
                grade: 'AAA',
                percentage: 85.5,
                miss_count: 10,
                has_score_card: true,
                dts: '2024-01-01T00:00:00Z',
            }],
        });
        const captured: ReturnType<typeof useIidxPlays>[] = [];
        const client = createTestClient();
        const tree = await renderWithClient(
            client,
            React.createElement(Capture, {page: 1, sink: (v) => captured.push(v)}),
        );
        await waitFor(() => expect(captured.at(-1)?.data?.plays.length).toBe(1));
        const play = captured.at(-1)!.data!.plays[0] as IidxPlay;
        expect(play.title).toBe('Wire Song Name');
        expect((play as IidxPlay & {name?: string}).name).toBeUndefined();
        client.cancelQueries();
        tree.unmount();
        client.clear();
    });
});
