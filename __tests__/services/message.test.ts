import {MessageSeverity} from '@/enums/message-severity';

jest.mock('react-native-notifier', () => ({
    Notifier: {
        showNotification: jest.fn(),
    },
    NotifierComponents: {
        Alert: 'Alert',
    },
}));

const {Notifier} = require('react-native-notifier');

describe('displayMessage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('displays error message', async () => {
        const {displayMessage} = require('@/services/message');
        displayMessage(MessageSeverity.ERROR, 'Something went wrong');
        expect(Notifier.showNotification).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'Error',
                description: 'Something went wrong',
            })
        );
    });

    it('displays success message', async () => {
        const {displayMessage} = require('@/services/message');
        displayMessage(MessageSeverity.SUCCESS, 'Done');
        expect(Notifier.showNotification).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'Success',
                description: 'Done',
            })
        );
    });
});
