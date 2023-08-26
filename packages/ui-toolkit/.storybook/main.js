import { dirname, join } from "path";
module.exports = {
  "stories": [
    "../stories/*.stories.@(js|jsx|ts|tsx)"
  ],

  "addons": [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials")
  ],

  docs: {
    autodocs: true
  },

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  core: {
    builder: '@storybook/builder-vite', // 👈 The builder enabled here.
  },
}

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
