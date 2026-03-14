import {MessageSeverity} from '@/enums/message-severity';
import {useToastStore} from '@/store/toast';
import {displayMessage} from '@/lib/notifications';

describe('displayMessage', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        useToastStore.setState({toasts: []});
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('displays error message', () => {
        displayMessage(MessageSeverity.ERROR, 'Something went wrong');
        const toasts = useToastStore.getState().toasts;
        expect(toasts).toHaveLength(1);
        expect(toasts[0]).toEqual(
            expect.objectContaining({
                title: 'Error',
                description: 'Something went wrong',
                severity: MessageSeverity.ERROR,
            })
        );
    });

    it('displays success message', () => {
        displayMessage(MessageSeverity.SUCCESS, 'Done');
        const toasts = useToastStore.getState().toasts;
        expect(toasts).toHaveLength(1);
        expect(toasts[0]).toEqual(
            expect.objectContaining({
                title: 'Success',
                description: 'Done',
                severity: MessageSeverity.SUCCESS,
            })
        );
    });
});
