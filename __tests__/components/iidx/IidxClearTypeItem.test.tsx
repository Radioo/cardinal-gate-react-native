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
    return {__esModule: true, default: () => createElement('View', {testID: 'fc-item'})};
});

describe('IidxClearTypeItem', () => {
    it('renders ColorBadge for non-FULL_COMBO types', async () => {
        await render(<IidxClearTypeItem clearType={IidxClearType.CLEAR}/>);
        expect(screen.getByText(IidxClearType.CLEAR)).toBeTruthy();
    });

    it('renders FullComboClearTypeItem for FULL_COMBO', async () => {
        await render(<IidxClearTypeItem clearType={IidxClearType.FULL_COMBO}/>);
        expect(screen.getByTestId('fc-item')).toBeTruthy();
    });

    it('renders different clear types with correct text', async () => {
        await render(<IidxClearTypeItem clearType={IidxClearType.HARD_CLEAR}/>);
        expect(screen.getByText(IidxClearType.HARD_CLEAR)).toBeTruthy();
    });
});
