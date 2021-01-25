const getWorkspaces = require('get-yarn-workspaces');
const path = require('path');

const wrapper = () => (config, env, from) => {
  const babel = config.module.rules
    .find(rule => 'oneOf' in rule)
    .oneOf.find(rule => /babel-loader/.test(rule.loader));

  if (!Array.isArray(babel.include)) {
    babel.include = [babel.include];
  }

  const packages = getWorkspaces(from).map(directory =>
    path.resolve(directory),
  );
  babel.include = babel.include.concat(packages);
  return config;
};

module.exports = wrapper();
