module.exports = function (api) {
    const isTest = api.env('test');
    api.cache.using(() => isTest);
    return {
        presets: [
            ['babel-preset-expo', isTest ? {} : { jsxImportSource: 'nativewind' }],
            ...(isTest ? [] : ['nativewind/babel']),
        ],
        plugins: [
            '@babel/plugin-transform-export-namespace-from',
            'react-native-reanimated/plugin',
        ]
    };
};
