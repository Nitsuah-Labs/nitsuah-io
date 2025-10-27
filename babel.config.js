module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "next/babel",
        {
          "preset-react": {
            "runtime": "automatic"
          }
        }
      ]
    ]
  };
};
