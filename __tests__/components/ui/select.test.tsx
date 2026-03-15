import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from '@/components/ui/select';

describe('select exports', () => {
    it('exports all select components', () => {
        expect(Select).toBeDefined();
        expect(SelectTrigger).toBeDefined();
        expect(SelectValue).toBeDefined();
        expect(SelectContent).toBeDefined();
        expect(SelectItem).toBeDefined();
    });

    it('exports SelectTrigger as a function component', () => {
        expect(typeof SelectTrigger).toBe('function');
    });

    it('exports SelectContent as a function component', () => {
        expect(typeof SelectContent).toBe('function');
    });

    it('exports SelectItem as a function component', () => {
        expect(typeof SelectItem).toBe('function');
    });
});
