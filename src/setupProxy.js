const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://dev-meshveliani-apis.pantheonsite.io/jsonapi/node/tsitateli_api",
      changeOrigin: true,
    })
  );
};
