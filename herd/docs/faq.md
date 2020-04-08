# FAQ

- Q: 如何正确获取请求的来源地址，我要通过 IP 判断归属地

  A: 使用 `x-forward-for` 这个 header 。

- Q: 如何在给给每个请求加上唯一 ID

  A: 在 `nginx ( >1.11.0 )` 中增加 `proxy_set_header x-request-id $request_id`。

- Q: 如何集成 `CMS`

  A: 老版装修集成了 `CMS`,不需要单独配置，以下配置仅针对新版装修:

  ```js
    // Pampasfile.js
    {
      designer: {
        enable: false,
        cmsUrl: 'system/cms', //cms 访问地址
      }
    }
  ```

  ```js
    // server/index.js
    const CMS = require('@terminus/cms')
    const cms = CMS(options.designer)
    await cms.init()
    useMiddleware(cms.routes())
  ```

- Q: POST 或 PUT 请求返回 413 payload too large

  A: 一般来说是因为 body 太大了，超过了 koa-bodyparser 的默认限制。在配置文件中对 koa-bodyparser 进行配置即可。

  ```js
  // Pampasfile.js
  module.exports = {
    middlewareOpts: {
      bodyParser: {
        formLimit: '1gb',
        jsonLimit: '1gb',
        textLimit: '1gb'
      }
    }
  }
  ```

  具体配置项请参考 koa-bodyparser 的文档，对不同的 contentType 需要配置不同的 limit 选项。
