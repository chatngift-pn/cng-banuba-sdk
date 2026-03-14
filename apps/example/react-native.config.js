/**
 * react-native.config.js – CLI configuration for the example app
 * inside a yarn-workspaces monorepo.
 *
 * Explicit paths prevent the CLI from accidentally resolving into the
 * monorepo root and losing track of the ios/android source directories.
 */
const path = require('path');

const monorepoRoot = path.resolve(__dirname, '../..');

module.exports = {
  project: {
    ios: { sourceDir: './ios' },
    android: { sourceDir: './android' },
  },
  // The SDK is a pure-JS package; it has no native code to auto-link.
  dependencies: {},
};
