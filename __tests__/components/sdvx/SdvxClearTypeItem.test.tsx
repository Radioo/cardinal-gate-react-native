import React from 'react';
import {render, screen} from '@testing-library/react-native';
import SdvxClearTypeItem from '@/components/sdvx/SdvxClearTypeItem';
import {SdvxClearType} from '@/enums/sdvx-clear-type';

jest.mock('@/components/sdvx/SdvxPerfectUltimateChainItem', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: () => createElement('View', {testID: 'puc-item'})};
});

describe('SdvxClearTypeItem', () => {
    it('renders CLEAR label for COMPLETE', async () => {
        await render(<SdvxClearTypeItem clearType={SdvxClearType.COMPLETE}/>);
        expect(screen.getByText('CLEAR')).toBeTruthy();
    });

    it('renders EXC CLEAR label for EXCESSIVE_COMPLETE', async () => {
        await render(<SdvxClearTypeItem clearType={SdvxClearType.EXCESSIVE_COMPLETE}/>);
        expect(screen.getByText('EXC CLEAR')).toBeTruthy();
    });

    it('renders MAXXIVE label for MAXXIVE_COMPLETE', async () => {
        await render(<SdvxClearTypeItem clearType={SdvxClearType.MAXXIVE_COMPLETE}/>);
        expect(screen.getByText('MAXXIVE')).toBeTruthy();
    });

    it('renders ULT CHAIN label for ULTIMATE_CHAIN', async () => {
        await render(<SdvxClearTypeItem clearType={SdvxClearType.ULTIMATE_CHAIN}/>);
        expect(screen.getByText('ULT CHAIN')).toBeTruthy();
    });

    it('renders NO PLAY label for NO_PLAY', async () => {
        await render(<SdvxClearTypeItem clearType={SdvxClearType.NO_PLAY}/>);
        expect(screen.getByText('NO PLAY')).toBeTruthy();
    });

    it('renders PLAYED label for PLAYED', async () => {
        await render(<SdvxClearTypeItem clearType={SdvxClearType.PLAYED}/>);
        expect(screen.getByText('PLAYED')).toBeTruthy();
    });

    it('delegates to PerfectUltimateChain component for PUC', async () => {
        await render(<SdvxClearTypeItem clearType={SdvxClearType.PERFECT_ULTIMATE_CHAIN}/>);
        expect(screen.getByTestId('puc-item')).toBeTruthy();
    });
});
