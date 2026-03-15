import React from 'react';
import {render, screen} from '@testing-library/react-native';
import SdvxClearTypeItem from '@/components/sdvx/SdvxClearTypeItem';
import {SdvxClearType} from '@/enums/sdvx-clear-type';

describe('SdvxClearTypeItem', () => {
    it('renders COMPLETE clear type', async () => {
        await render(<SdvxClearTypeItem clearType={SdvxClearType.COMPLETE}/>);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders PUC clear type', async () => {
        await render(<SdvxClearTypeItem clearType={SdvxClearType.PERFECT_ULTIMATE_CHAIN}/>);
        expect(screen.toJSON()).toBeTruthy();
    });
});
