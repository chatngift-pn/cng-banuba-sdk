const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const sdkPath = path.resolve(__dirname, '../../packages/cng-editor-sdk');

/**
 * Metro configuration – wires the SDK workspace package so that
 * metro can resolve it without a separate publish step.
 */
const config = {
  watchFolders: [sdkPath],
  resolver: {
    extraNodeModules: {
      'cng-editor-sdk': sdkPath,
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
