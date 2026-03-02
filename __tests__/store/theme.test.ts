import {useThemeStore} from '@/store/theme';

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('useThemeStore', () => {
    beforeEach(() => {
        // Reset to initial state before each test
        useThemeStore.setState({primaryColor: '#f28b28'});
    });

    it('has default primary color of #f28b28', () => {
        const state = useThemeStore.getState();
        expect(state.primaryColor).toBe('#f28b28');
    });

    it('updates primary color via setPrimaryColor', () => {
        const {setPrimaryColor} = useThemeStore.getState();
        setPrimaryColor('#ff0000');
        expect(useThemeStore.getState().primaryColor).toBe('#ff0000');
    });

    it('allows setting primary color to any valid hex string', () => {
        const {setPrimaryColor} = useThemeStore.getState();
        setPrimaryColor('#00ff00');
        expect(useThemeStore.getState().primaryColor).toBe('#00ff00');

        setPrimaryColor('#123abc');
        expect(useThemeStore.getState().primaryColor).toBe('#123abc');
    });

    it('preserves other state when updating primary color', () => {
        const stateBefore = useThemeStore.getState();
        expect(stateBefore.primaryColor).toBe('#f28b28');
        expect(typeof stateBefore.setPrimaryColor).toBe('function');

        stateBefore.setPrimaryColor('#aabbcc');
        const stateAfter = useThemeStore.getState();
        expect(stateAfter.primaryColor).toBe('#aabbcc');
        expect(typeof stateAfter.setPrimaryColor).toBe('function');
    });
});
