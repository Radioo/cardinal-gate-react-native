import {downloadToLocalFile} from '@/services/image';

const mockFetchApiBlob = jest.fn();

jest.mock('@/services/api', () => ({
    fetchApiBlob: (...args: unknown[]) => mockFetchApiBlob(...args),
}));

const mockWriteAsStringAsync = jest.fn();

jest.mock('expo-file-system', () => ({
    cacheDirectory: '/cache/',
    writeAsStringAsync: (...args: unknown[]) => mockWriteAsStringAsync(...args),
    EncodingType: {
        Base64: 'base64',
    },
}));

// Mock FileReader
class MockFileReader {
    result: string | null = null;
    onload: (() => void) | null = null;
    onerror: ((err: unknown) => void) | null = null;

    readAsDataURL(_blob: Blob) {
        this.result = 'data:image/png;base64,aW1hZ2VkYXRh';
        if (this.onload) this.onload();
    }
}

(global as Record<string, unknown>).FileReader = MockFileReader;

describe('downloadToLocalFile', () => {
    beforeEach(() => {
        mockFetchApiBlob.mockReset();
        mockWriteAsStringAsync.mockReset();
    });

    it('fetches blob with skipRootUrl option', async () => {
        const blob = new Blob(['test']);
        mockFetchApiBlob.mockResolvedValue(blob);
        mockWriteAsStringAsync.mockResolvedValue(undefined);

        await downloadToLocalFile('https://example.com/image.png', 'image.png');

        expect(mockFetchApiBlob).toHaveBeenCalledWith(
            'https://example.com/image.png',
            undefined,
            {skipRootUrl: true},
        );
    });

    it('writes base64 data to the cache directory', async () => {
        const blob = new Blob(['test']);
        mockFetchApiBlob.mockResolvedValue(blob);
        mockWriteAsStringAsync.mockResolvedValue(undefined);

        await downloadToLocalFile('https://example.com/photo.png', 'photo.png');

        expect(mockWriteAsStringAsync).toHaveBeenCalledWith(
            '/cache/photo.png',
            'aW1hZ2VkYXRh',
            {encoding: 'base64'},
        );
    });

    it('returns the target file path in cache directory', async () => {
        const blob = new Blob(['test']);
        mockFetchApiBlob.mockResolvedValue(blob);
        mockWriteAsStringAsync.mockResolvedValue(undefined);

        const result = await downloadToLocalFile('https://example.com/img.png', 'img.png');
        expect(result).toBe('/cache/img.png');
    });

    it('propagates fetch errors', async () => {
        mockFetchApiBlob.mockRejectedValue(new Error('Network error'));

        await expect(
            downloadToLocalFile('https://example.com/fail.png', 'fail.png')
        ).rejects.toThrow('Network error');
    });

    it('propagates file system write errors', async () => {
        const blob = new Blob(['test']);
        mockFetchApiBlob.mockResolvedValue(blob);
        mockWriteAsStringAsync.mockRejectedValue(new Error('Disk full'));

        await expect(
            downloadToLocalFile('https://example.com/img.png', 'img.png')
        ).rejects.toThrow('Disk full');
    });
});
