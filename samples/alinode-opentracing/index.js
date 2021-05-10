"use strict";
const express = require("express");
const app = express();
const opentracing = require("@alicloud/opentracing");
const tracer = new opentracing.Tracer("测试链路");
// 本示例要结合阿里开发的监控平台进行使用

// 模拟耗时的异步操作
function delay(time, req) {
  let child = tracer.startSpan("子模块 1: 随机并发延迟", {
    childOf: req.parentSpan,
  });
  child.setTag("timeout", time);
  child.log({ state: "timer1" });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
      child.finish(req);
    }, time);
  });
}

// 在所有中间件之前，开启一个根 span，记录下 hostname、method、url，以及收到 end 事件后的
app.use(function (req, res, next) {
  req.parentSpan = tracer.startSpan("根模块");
  req.parentSpan.setTag(opentracing.Tags.PEER_HOSTNAME, req.hostname);
  req.parentSpan.setTag(opentracing.Tags.HTTP_METHOD, req.method.toUpperCase());
  req.parentSpan.setTag(opentracing.Tags.HTTP_URL, req.url);
  next();
  res.once("finish", () => {
    req.parentSpan.setTag(opentracing.Tags.HTTP_STATUS_CODE, res.statusCode);
    req.parentSpan.finish(req);
  });
});

// 模拟并发的耗时异步操作
app.use(function (req, res, next) {
  Promise.all([
    delay(Math.random() * 10 * 1000, req),
    delay(Math.random() * 10 * 1000, req),
  ]).then(() => next());
});

// 继续模拟一个顺序的 3s 耗时异步操作
app.use(function (req, res, next) {
  let child = tracer.startSpan("子模块 2: 延迟 3s", {
    childOf: req.parentSpan,
  });
  child.setTag("timeout", "3s");
  child.log({ state: "timer2" });
  // 3s call
  setTimeout(() => {
    child.finish(req);
    next();
  }, 3000);
});

// 响应页面
app.get("*", function (req, res) {
  res.send("Hello Node.js Performance Platform!");
});

app.listen(3000);


