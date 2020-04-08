## 使用 CSRF Token

herd 默认开启 CSRF check ，使用 koa 的 CSRF middleware 完成相关工作，详情请参考 https://github.com/koajs/csrf 。

如果需要关闭，请配置 `csrf: { enable: false }`。

CSRF middleware 本身可以通过 Pampasfile.js 进行相关配置：`{ middlewareOpts: { csrf: {...} } }`

如果某些请求需要忽略 csrf check ， 请配置:
```js
{
  middlewareOpts: {
    csrf: {
      ignoreHeader: { platform: /ios|android/ }, // 根据 header ignore check
      ignorePath: /\/api\/pay/ // 根据 path ignore check
    },
  }
}
```

简单来说，可以通过 `ctx.csrf` 生成并获取一个 token ；并通过在 PUT 和 POST 请求的 `query._csrf`, `body._csrf` , `header['x-csrf-token']`, `header['x-xsrf-token']` 的任意位置携带 token 来验证。

也可以调用 `ctx.assertCSRF()` 进行手动验证。
