const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  devServer: {
    port: 8081,
    proxy: {
      "/api/v1": {
        target: "http://127.0.0.1:8082",
        changeOrigin: true,
        logLevel: "debug",
      },
    },
  },
};
