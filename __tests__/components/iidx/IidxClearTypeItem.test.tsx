import React from 'react';
import {render, screen} from '@testing-library/react-native';
import IidxClearTypeItem, {IIDX_CLEAR_TYPE_DATA} from '@/components/iidx/IidxClearTypeItem';
import {IidxClearType} from '@/enums/iidx-clear-type';

jest.mock('@/components/iidx/IidxFullComboClearTypeItem', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: () => createElement('View', {testID: 'fc-item'})};
});

describe('IidxClearTypeItem', () => {
    it('renders the clear type label for CLEAR', async () => {
        await render(<IidxClearTypeItem clearType={IidxClearType.CLEAR}/>);
        expect(screen.getByText(IidxClearType.CLEAR)).toBeTruthy();
    });

    it('renders the clear type label for HARD_CLEAR', async () => {
        await render(<IidxClearTypeItem clearType={IidxClearType.HARD_CLEAR}/>);
        expect(screen.getByText(IidxClearType.HARD_CLEAR)).toBeTruthy();
    });

    it('renders the clear type label for EX_HARD_CLEAR', async () => {
        await render(<IidxClearTypeItem clearType={IidxClearType.EX_HARD_CLEAR}/>);
        expect(screen.getByText(IidxClearType.EX_HARD_CLEAR)).toBeTruthy();
    });

    it('renders the clear type label for FAILED', async () => {
        await render(<IidxClearTypeItem clearType={IidxClearType.FAILED}/>);
        expect(screen.getByText(IidxClearType.FAILED)).toBeTruthy();
    });

    it('delegates to FullCombo component for FULL_COMBO', async () => {
        await render(<IidxClearTypeItem clearType={IidxClearType.FULL_COMBO}/>);
        expect(screen.getByTestId('fc-item')).toBeTruthy();
    });

    it('exposes a text/color entry for every clear type', () => {
        for (const clearType of Object.values(IidxClearType)) {
            expect(IIDX_CLEAR_TYPE_DATA[clearType].color).toMatch(/^#[0-9a-fA-F]{6}$/);
            expect(IIDX_CLEAR_TYPE_DATA[clearType].text).toBeTruthy();
        }
    });
});
