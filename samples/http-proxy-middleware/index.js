/**
 * Module dependencies
 */
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

/**
 * Configure proxy middleware
 */
const mpProxy = createProxyMiddleware({
  target: "https://mp.weixin.qq.com/",
  changeOrigin: true,
  logLevel: "debug",
});

const app = express()

/**
 * Add the proxy to express
 */
app.use("/mp", mpProxy);
app.listen(3000)

console.log("[DEMO] Server: listening on port 3000");
console.log("[DEMO] Opening: http://localhost:3000/mp");

// 直接打开 http://localhost:3000/mp 即可访问到 mp
// require("open")("http://localhost:3000/mp");