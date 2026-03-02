import React from 'react';
import renderer from 'react-test-renderer';
import IidxClearTypeItem from '@/components/iidx/IidxClearTypeItem';
import {IidxClearType} from '@/enums/iidx-clear-type';

jest.mock('polished', () => ({
    darken: (_amount: number, color: string) => color,
    lighten: (_amount: number, color: string) => color,
}));

jest.mock('@/components/iidx/IidxFullComboClearTypeItem', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: () => createElement('View', null, 'FC')};
});

describe('IidxClearTypeItem', () => {
    it('renders CLEAR clear type', () => {
        const tree = renderer.create(
            <IidxClearTypeItem clearType={IidxClearType.CLEAR}/>
        ).toJSON();
        expect(tree).toBeTruthy();
    });

    it('renders FULL_COMBO clear type', () => {
        const tree = renderer.create(
            <IidxClearTypeItem clearType={IidxClearType.FULL_COMBO}/>
        ).toJSON();
        expect(tree).toBeTruthy();
    });
});
