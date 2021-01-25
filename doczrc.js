export default {
  typescript: true,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  filterComponents: files =>
    files.filter(filepath => /[w-]*.(js|jsx|ts|tsx)$/.test(filepath)),
};
