import React from 'react';
import {render, screen} from '@testing-library/react-native';
import IidxClearTypeItem from '@/components/iidx/IidxClearTypeItem';
import {IidxClearType} from '@/enums/iidx-clear-type';

jest.mock('polished', () => ({
    darken: (_amount: number, color: string) => color,
    lighten: (_amount: number, color: string) => color,
}));

jest.mock('@/components/iidx/IidxFullComboClearTypeItem', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: () => createElement('View', null, createElement('Text', null, 'FC'))};
});

describe('IidxClearTypeItem', () => {
    it('renders CLEAR clear type', async () => {
        await render(<IidxClearTypeItem clearType={IidxClearType.CLEAR}/>);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders FULL_COMBO clear type', async () => {
        await render(<IidxClearTypeItem clearType={IidxClearType.FULL_COMBO}/>);
        expect(screen.toJSON()).toBeTruthy();
    });
});
