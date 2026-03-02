jest.mock('@/hooks/useTheme', () => ({
    __esModule: true,
    default: () => ({
        text: '#ECEDEE',
        background: '#151718',
        primary: '#f28b28',
        primarySurface: '#2a1f10',
        scheme: 'dark',
    }),
}));
