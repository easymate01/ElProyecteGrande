const { createProxyMiddleware } = require("http-proxy-middleware");

const context = ["/User"];

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    target: "https://localhost:7035",
    secure: false,
  });

  app.use(appProxy);
};
