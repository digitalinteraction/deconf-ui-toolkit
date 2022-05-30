const devPresets = ['@vue/cli-plugin-babel/preset'];
const buildPresets = [
  ['@babel/preset-env', { modules: false }],
  '@babel/preset-typescript',
];
module.exports = {
  presets: process.env.NODE_ENV === 'development' ? devPresets : buildPresets,
};
