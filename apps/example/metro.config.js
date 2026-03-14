const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');
const sdkPath = path.resolve(monorepoRoot, 'packages/cng-editor-sdk');

/**
 * Metro configuration – wires the SDK workspace package so that
 * metro can resolve it without a separate publish step.
 *
 * watchFolders: lets Metro see files outside apps/example (the SDK
 *   source and the workspace root where hoisted node_modules live).
 * nodeModulesPaths: controls the order Metro searches for packages;
 *   listing the project-level node_modules first ensures the correct
 *   react-native version (0.73.4) is always picked up, even if a
 *   different copy is hoisted to the workspace root.
 */
const config = {
  watchFolders: [monorepoRoot],
  resolver: {
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(monorepoRoot, 'node_modules'),
    ],
    extraNodeModules: {
      'cng-editor-sdk': sdkPath,
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
