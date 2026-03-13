// Learn more https://docs.expo.io/guides/customizing-metro
const {getDefaultConfig} = require('expo/metro-config');
const {wrapWithReanimatedMetroConfig} = require('react-native-reanimated/metro-config');
const {withNativeWind} = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.unstable_enablePackageExports = false;

module.exports = withNativeWind(wrapWithReanimatedMetroConfig(config), { input: './global.css', inlineRem: 16 });
