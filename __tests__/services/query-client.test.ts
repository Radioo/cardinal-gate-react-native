import {queryClient} from '@/services/query-client';
import {QueryClient} from '@tanstack/react-query';

describe('queryClient', () => {
    it('exports a QueryClient instance', () => {
        expect(queryClient).toBeInstanceOf(QueryClient);
    });
});
