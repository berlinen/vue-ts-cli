# 自定义扩展

通过 extension 配置项指定一个 js 文件来对 herd 进行扩展。标准结构为：

```js
module.exports = (ext) => {
  // do something use ext
};
```

其中 ext 包含如下内容：

- options: 配置文件加载后的内容，可读取 herd 配置文件或者将自定义配置写入并在这里获取
- router: koa-router 实例，在这里操作 router 以便实现自定义路由
- handlebars: Handlebars 实例，操作它以便实现任何可对 handlebars.js 进行的自定义动作
- registerService: function(k, v) ，调用此方法来注册自定义 service 。可以只在参数 k 中传入一个 Object 来定义多个服务，也可以按 k，v 多次调用
- useMiddleware: function(middleware) ，调用此方法来使用 middleware ，格式为 koa@v2 的middleware ，按调用顺序注册，herd 调用链末端调用
- useBeforeMiddleware: function(middleware) ，调用此方法来使用 middleware ，格式为 koa@v2 的middleware ，按调用顺序注册，herd 调用链起始端调用
- useAfterMiddleware: 等同于useMiddleware

## 设置调用 service 的超时时间

```js
// pampasfile.js
{
  invokers: {
    http: {
      agent: { keepAlive: true }, // 默认为开启，设置为 undefined 禁用，更多参数请参考：https://nodejs.org/api/http.html#http_new_agent_options
    }
    timeout: 2000, // 默认值为 1000 ms
    unwrap: boolean | (res) => {}  // 默认为 true ，也可以为一个 function 去支持自定义的 unwrapResponse
  }
}
```

## 手动调用 service (since 0.4.10)

在任何可获取到 koa context 的地方，都可以使用 `ctx.invokeService(serviceKey, params)` 来调用注册了的 service

## service cache (since 1.1.2-beta.29)

可以通过 `ctx.invokeService(serviceKey, params, {cache: true})` 缓存服务调用结果，默认缓存时间为 30s，或者通过环境变量 `INVOKER_CACHE_TIME` 来调整。

## 自定义路由

使用 koa-router 进行 routes 定义，详情请参考 https://github.com/alexmingoia/koa-router 。

一个简单的例子可能是这样的。

```js
module.exports = ({ router }) => {
  router.get('/custom-route/test', (ctx) => {
    ctx.response.body = 'Test success';
  });
  router.post('/api/login', (ctx) => {
    ctx.session.userId = 1;
    ctx.response.status = 200;
  });
  router.post('/api/logout', (ctx) => {
    ctx.session.userId = null;
    ctx.response.status = 200;
  });
  router.get('/csrf', (ctx) => {
    ctx.response.body = ctx.csrf;
  });
  // 注意，使用 async/await 的，在 node 原生支持之前，还需要 babel 进行编译
  router.get('/invokers/test', async (ctx) => {
    const result = await ctx.invokeService('getRandoms', { count: 3 });
    ctx.response.body = result;
  });
  console.log('custom route registered');
};
```

## 自定义middleware

```js
module.exports = ({ useBeforeMiddleware, useAfterMiddleware, useMiddleware }) => {
  useBeforeMiddleware(async (ctx, next)=>{ //在herd管道调用之前执行
    ...
  });
  useAfterMiddleware(async (ctx, next)=>{   //在herd管道调用之后执行,等同于 useMiddleware
    ...
  });
}
```

## 自定义 service

```js
module.exports = ({ registerService }) => {
  registerService({
    serviceKey(context) {
      // do something, and return a Promise
    }
  })
}
```

其中参数 context 是整个渲染上下文。

方法应该返回一个 promise ，或者使用 async/await 。

如果在 customServices 文件中存在和 services 中相同的 serviceKey ，则会覆盖 services 中的。

## koa 上下文和 herd 上下文中携带的特殊对象

koa 上下文中

- `state.currentUser`: 当前登录用户

herd 上下文，即 `ctx.herdContext` 中

- `__I18N__`: i18n 实例，开放了 t 方法进行翻译

## 影响渲染上下文

herd 会在上下文中放置一个 herdContext 作为整个渲染的上下文，其中会携带请求的 body 、query 等参数。开发者无论在 router 还是 middleware 中，都可以通过操作 herdContext 来自定义渲染上下文。

## 直接渲染页面

调用 ctx.render 方法即可。

```js
// params:
//   path: 渲染的 views 路径
//   context: 渲染上下文，可不传
await ctx.render('any/path/you/want', { param: value });
```

## add header to invoker http service and proxy

 可以通过在扩展点中增加 `ctx.herdContext.__INVOKER_HEADER__.auth = 'xxx'` 来扩展 `http invoker header` and `proxy`

 尽量保证 `__INVOKER_HEADER__` 只做添加和获取操作。

```js
// 自定义middleware
// 调用 service 时 header 会多带一个 auth
ctx.herdContext.__INVOKER_HEADER__.auth = 'xxx';
```
