import {useToastStore} from '@/store/toast';
import {MessageSeverity} from '@/enums/message-severity';

beforeEach(() => {
    jest.useFakeTimers();
    useToastStore.setState({toasts: []});
});

afterEach(() => {
    jest.useRealTimers();
});

describe('useToastStore', () => {
    it('starts with empty toasts', () => {
        expect(useToastStore.getState().toasts).toEqual([]);
    });

    it('addToast inserts with incrementing IDs', () => {
        const {addToast} = useToastStore.getState();
        addToast({severity: MessageSeverity.SUCCESS, title: 'First', description: 'desc1'});
        addToast({severity: MessageSeverity.ERROR, title: 'Second', description: 'desc2'});

        const toasts = useToastStore.getState().toasts;
        expect(toasts).toHaveLength(2);
        expect(toasts[0].title).toBe('First');
        expect(toasts[1].title).toBe('Second');
        expect(toasts[0].id).not.toBe(toasts[1].id);
    });

    it('auto-removes toast after 3000ms', () => {
        const {addToast} = useToastStore.getState();
        addToast({severity: MessageSeverity.SUCCESS, title: 'Auto', description: 'remove'});

        expect(useToastStore.getState().toasts).toHaveLength(1);

        jest.advanceTimersByTime(2999);
        expect(useToastStore.getState().toasts).toHaveLength(1);

        jest.advanceTimersByTime(1);
        expect(useToastStore.getState().toasts).toHaveLength(0);
    });

    it('removeToast removes immediately', () => {
        const {addToast} = useToastStore.getState();
        addToast({severity: MessageSeverity.SUCCESS, title: 'Manual', description: 'remove'});

        const id = useToastStore.getState().toasts[0].id;
        useToastStore.getState().removeToast(id);

        expect(useToastStore.getState().toasts).toHaveLength(0);
    });

    it('multiple concurrent toasts do not interfere with each other', () => {
        const {addToast} = useToastStore.getState();
        addToast({severity: MessageSeverity.SUCCESS, title: 'First', description: 'a'});

        jest.advanceTimersByTime(1000);
        addToast({severity: MessageSeverity.ERROR, title: 'Second', description: 'b'});

        expect(useToastStore.getState().toasts).toHaveLength(2);

        jest.advanceTimersByTime(2000);
        expect(useToastStore.getState().toasts).toHaveLength(1);
        expect(useToastStore.getState().toasts[0].title).toBe('Second');

        jest.advanceTimersByTime(1000);
        expect(useToastStore.getState().toasts).toHaveLength(0);
    });

    it('auto-dismiss after manual remove is a no-op', () => {
        const {addToast} = useToastStore.getState();
        addToast({severity: MessageSeverity.SUCCESS, title: 'Early', description: 'remove'});

        const id = useToastStore.getState().toasts[0].id;
        useToastStore.getState().removeToast(id);
        expect(useToastStore.getState().toasts).toHaveLength(0);

        jest.advanceTimersByTime(3000);
        expect(useToastStore.getState().toasts).toHaveLength(0);
    });
});
