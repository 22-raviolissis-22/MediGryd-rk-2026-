const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);
const projectRoot = path.resolve(__dirname);

config.watchFolders = [projectRoot];
if (config.watcher) {
  config.watcher.healthCheck = { enabled: false };
}

module.exports = config;
