const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const extraIgnores = [
  /\/\.git\/.*/,
  /\/\.expo\/.*/,
  /\/dist\/.*/,
];

const previous = config.resolver.blockList;
config.resolver.blockList = previous
  ? [previous, ...extraIgnores].flat()
  : extraIgnores;

config.watchFolders = [__dirname];
if (config.watcher) {
  config.watcher.healthCheck = { enabled: false };
}

module.exports = config;
