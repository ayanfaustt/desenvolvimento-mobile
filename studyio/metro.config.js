const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    blacklistRE: defaultConfig.resolver && defaultConfig.resolver.blacklistRE
      ? defaultConfig.resolver.blacklistRE.concat([
          /react\/android/,
          // Adicione quaisquer outras expressões regulares para suprimir warnings aqui
        ])
      : [
          /react\/android/,
          // Adicione quaisquer outras expressões regulares para suprimir warnings aqui
        ],
  },
};
