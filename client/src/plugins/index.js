const reqPlugin = require.context(
  './', // Use current directory as base
  true, // Scan recursively into directories
  /\.\/.*\/index$/ // only load modules matching regex (folder indexes end in `/index` ie. ./clock/index)
);

export default reqPlugin.keys().map((path) => {
  return reqPlugin(path).default;
});
