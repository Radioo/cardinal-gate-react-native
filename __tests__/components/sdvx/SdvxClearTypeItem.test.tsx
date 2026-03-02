import React from 'react';
import renderer from 'react-test-renderer';
import SdvxClearTypeItem from '@/components/sdvx/SdvxClearTypeItem';
import {SdvxClearType} from '@/enums/sdvx-clear-type';

jest.mock('polished', () => ({
    darken: (_amount: number, color: string) => color,
    lighten: (_amount: number, color: string) => color,
}));

describe('SdvxClearTypeItem', () => {
    it('renders COMPLETE clear type', () => {
        const tree = renderer.create(
            <SdvxClearTypeItem clearType={SdvxClearType.COMPLETE}/>
        ).toJSON();
        expect(tree).toBeTruthy();
    });

    it('renders PUC clear type', () => {
        const tree = renderer.create(
            <SdvxClearTypeItem clearType={SdvxClearType.PERFECT_ULTIMATE_CHAIN}/>
        ).toJSON();
        expect(tree).toBeTruthy();
    });
});
