const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');
const exclusionList = require('metro-config/src/defaults/exclusionList');

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
 * blockList: prevents Metro from processing node_modules inside
 *   workspace packages (their own devDependencies such as jest), which
 *   could shadow or conflict with the versions used by the app.
 * extraNodeModules: maps bare-specifier imports so that code inside the
 *   SDK package resolves react / react-native from the same single copy
 *   used by the example app, avoiding "Invalid hook call" and
 *   "not registered" errors.
 */
const config = {
  watchFolders: [monorepoRoot],
  resolver: {
    // Prevent Metro from walking up the directory tree beyond the
    // explicit nodeModulesPaths below.  Without this flag Metro may
    // discover a different react-native version installed in a parent
    // directory or globally, which causes the "React Native version
    // mismatch" runtime crash.
    disableHierarchicalLookup: true,
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(monorepoRoot, 'node_modules'),
    ],
    blockList: exclusionList([
      // Exclude SDK's own node_modules (jest devDeps) from Metro
      new RegExp(
        path.resolve(sdkPath, 'node_modules').replace(/[/\\]/g, '[/\\\\]') +
          '[/\\\\].*',
      ),
    ]),
    extraNodeModules: {
      'cng-editor-sdk': sdkPath,
      // Ensure a single copy of react & react-native across the monorepo
      react: path.resolve(monorepoRoot, 'node_modules', 'react'),
      'react-native': path.resolve(
        monorepoRoot,
        'node_modules',
        'react-native',
      ),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
