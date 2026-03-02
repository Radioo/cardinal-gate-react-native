import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import PrimaryColorSetting from '@/components/shared/PrimaryColorSetting';

let capturedColorPickerProps: Record<string, unknown> = {};

jest.mock('reanimated-color-picker', () => {
    const {createElement} = require('react');
    const ColorPicker = ({children, ...props}: {children: React.ReactNode} & Record<string, unknown>) => {
        capturedColorPickerProps = props;
        return createElement('View', {testID: 'color-picker'}, children);
    };
    return {
        __esModule: true,
        default: ColorPicker,
        Panel1: (props: Record<string, unknown>) => createElement('View', {testID: 'panel1', ...props}),
        Preview: (props: Record<string, unknown>) => createElement('View', {testID: 'preview', ...props}),
        OpacitySlider: (props: Record<string, unknown>) => createElement('View', {testID: 'opacity-slider', ...props}),
        HueSlider: (props: Record<string, unknown>) => createElement('View', {testID: 'hue-slider', ...props}),
    };
});

const mockSetPrimaryColor = jest.fn();

jest.mock('@/store/theme', () => ({
    useThemeStore: () => ({primaryColor: '#f28b28', setPrimaryColor: mockSetPrimaryColor}),
}));

jest.mock('expo-blur', () => ({
    BlurView: 'BlurView',
}));

jest.mock('react-native-safe-area-context', () => ({
    SafeAreaProvider: ({children}: {children: React.ReactNode}) => children,
}));

jest.mock('@/components/themed/ThemedButton', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: `btn-${props.label}`, ...props})};
});

describe('PrimaryColorSetting', () => {
    beforeEach(() => {
        capturedColorPickerProps = {};
        mockSetPrimaryColor.mockClear();
    });

    it('renders color picker with current primary color', async () => {
        await render(<PrimaryColorSetting visible={true} onClose={jest.fn()} />);
        expect(capturedColorPickerProps.value).toBe('#f28b28');
    });

    it('renders all color picker sub-components', async () => {
        await render(<PrimaryColorSetting visible={true} onClose={jest.fn()} />);
        expect(screen.getAllByTestId('panel1')).toHaveLength(1);
        expect(screen.getAllByTestId('preview')).toHaveLength(1);
        expect(screen.getAllByTestId('hue-slider')).toHaveLength(1);
        expect(screen.getAllByTestId('opacity-slider')).toHaveLength(1);
    });

    it('renders Apply and Cancel buttons', async () => {
        await render(<PrimaryColorSetting visible={true} onClose={jest.fn()} />);
        expect(screen.getByTestId('btn-Apply')).toBeTruthy();
        expect(screen.getByTestId('btn-Cancel')).toBeTruthy();
    });

    it('calls onClose when Cancel is pressed', async () => {
        const onClose = jest.fn();
        await render(<PrimaryColorSetting visible={true} onClose={onClose} />);
        const cancelBtn = screen.getByTestId('btn-Cancel');
        fireEvent.press(cancelBtn);
        expect(onClose).toHaveBeenCalled();
    });

    it('calls setPrimaryColor and onClose when Apply is pressed', async () => {
        const onClose = jest.fn();
        await render(<PrimaryColorSetting visible={true} onClose={onClose} />);
        const applyBtn = screen.getByTestId('btn-Apply');
        fireEvent.press(applyBtn);
        expect(mockSetPrimaryColor).toHaveBeenCalledWith('#f28b28');
        expect(onClose).toHaveBeenCalled();
    });
});
