import React from 'react';
import renderer from 'react-test-renderer';
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

    it('renders color picker with current primary color', () => {
        renderer.create(<PrimaryColorSetting visible={true} onClose={jest.fn()} />);
        expect(capturedColorPickerProps.value).toBe('#f28b28');
    });

    it('renders all color picker sub-components', () => {
        const root = renderer.create(
            <PrimaryColorSetting visible={true} onClose={jest.fn()} />
        ).root;
        expect(root.findAllByProps({testID: 'panel1'})).toHaveLength(1);
        expect(root.findAllByProps({testID: 'preview'})).toHaveLength(1);
        expect(root.findAllByProps({testID: 'hue-slider'})).toHaveLength(1);
        expect(root.findAllByProps({testID: 'opacity-slider'})).toHaveLength(1);
    });

    it('renders Apply and Cancel buttons', () => {
        const root = renderer.create(
            <PrimaryColorSetting visible={true} onClose={jest.fn()} />
        ).root;
        expect(root.findByProps({testID: 'btn-Apply'})).toBeTruthy();
        expect(root.findByProps({testID: 'btn-Cancel'})).toBeTruthy();
    });

    it('calls onClose when Cancel is pressed', () => {
        const onClose = jest.fn();
        const root = renderer.create(
            <PrimaryColorSetting visible={true} onClose={onClose} />
        ).root;
        const cancelBtn = root.findByProps({testID: 'btn-Cancel'});
        cancelBtn.props.onPress();
        expect(onClose).toHaveBeenCalled();
    });

    it('calls setPrimaryColor and onClose when Apply is pressed', () => {
        const onClose = jest.fn();
        const root = renderer.create(
            <PrimaryColorSetting visible={true} onClose={onClose} />
        ).root;
        const applyBtn = root.findByProps({testID: 'btn-Apply'});
        applyBtn.props.onPress();
        expect(mockSetPrimaryColor).toHaveBeenCalledWith('#f28b28');
        expect(onClose).toHaveBeenCalled();
    });
});
