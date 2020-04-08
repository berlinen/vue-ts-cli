# Change log

## 1.1.3

- 增加 http agent 参数， proxy 和 invoker 可以复用连接, 大幅提高性能
- 修复 curl proxy post 请求超过 1024 会导致 herd 挂掉的问题

## 1.1.2-beta.33

- 修复 `__INVOKER_HEADER__` 无法覆盖的问题

## 1.1.2-beta.31

- `proxy` 支持 `ws`

## 1.1.2-beta.29

- `@terminus/render-handlebars-helpers` 支持 `cache` 参数

## 1.1.2-beta.29

- `invoker service` 新增 `cache` 参数

## 1.1.2-beta.26

- 日志输出调整为标准输出

## 1.1.2-beta.25

- 日志输出调整为非production环境

## 1.1.2-beta.23

- 新增 ssr 功能，默认 `ssr: { enable: false }`
- 扩展 herd 命令工具，可以创建新的ssr项目，自动接入新版装修工程，一键启动

## 1.0.2-beta.21

- `invokers` 支持 `unwrap` 自定义

## 1.0.2-beta.20

- 修复`herd`命令行指定`Pampasfile-*`的bug

## 1.0.2-beta.19

- `mock` 增加文件是否修改校验
- `invokers` 增加 `timeout` 选项，可以对接口设置超时时间
- `ioredis` 升级至 `3.1.x`, 解决 `dice` 下连接不稳定的问题
- 生产环境下 `handlebars helper inject` 不再报出具体错误
- `csrf` 增加配置 `ignorePath` 支持根据 `path` 忽略 `csrf check`
- `csrf` 增加配置 `ignoreHeader` 支持根据 `header` 忽略 `csrf check`
- `extension` 增加对异步代码的支持
- 现在当 `options.session.cookieDomain` 留空时，herd 会尝试从当前 hostname 中推断出一级 domain ；同时增加一个配置 `options.session.disableCurrentDomain` 来失效这个行为从而保留写入当前 host 的行为
- 增加 `ctx.session.refreshToken()` 方法，会重新生成 cookie 中的 token（msid=?），只在 redis 实现下生效，cookie 实现下调用会得到一个 warning log
- 升级 @terminus/render-handlebars-helpers 以修复一个可能存在的 XSS 漏洞
- 增加 `invokeFilter` 配置，可以自行通过 filter 做一些诸如 cache invoke 结果等的事情
- 修复当使用 pm2 cluster 模式运行 herd 时，无法正确获取到 bind port 导致报错的问题
- 升级 herd-core 到 0.3.12 ，通过 options.middlewareOpts.helmet 开放 helmet 的配置
- 修复 proxy 原始请求 user-agent 为空时报错导致 herd 整个挂掉的问题
- 修复当 views 为文件夹下的 index 时，无法正确找到的问题
- 修复 proxy 文件上传时额外带了表单字段时报错的问题
- 增加 `ctx.session.disable()` 方法，在当次请求中 disable 掉默认的 session 实现，包括持久化 session 和写 cookie ，只在 redis 实现下生效，cookie 实现下调用会得到一个 warning log

## 1.0.1

- 修复 proxy 文件上传时报错的问题
- 优化 session 使用 cookie 模式时对 cookie 内容的加解密方式

## 1.0.0

- 修复 redis 不能可选的问题（即便 session 设置为 cookie 时，也会尝试连接 redis 而导致失败）

## 0.4.16

- 现在 proxy 会传递原始的 user-agent 到被 proxy 的接口，以便后端正确的获取设备类型

- 升级了 koa 和相关的 koa middlewares

- 支持解析 text/plain 类型的 requestBody ，修复 body 为 text 时 proxy 会挂掉的问题

- 为 handlerbars 增加一个新选项 `options.handlebars.injectWithError` ，默认为 false

  当设置为 true 时，不再输出一个含错误信息的透明 span ，而是将错误和错误文本以 `_ERROR_` 和 `_ERROR_MESSAGE_` 为 key 注入渲染上下文中。

## 0.4.15

- 修复当代理请求的 body 为空数组 `[]` 或空对象 `{}` 时，请求会阻塞的问题

## 0.4.14

- 升级了 `LoadingCache@1.0.1`, 支持通过 redis 一致性失效缓存，当在配置文件中配置了 redis 就会自动生效
- http sevice 配置参数时现在支持默认值，请参考 docs/service.md

## 0.4.13

- 增加 `ctx.clearUserCache` `ctx.clearAuthCache` 方法，清除用户和权限缓存信息

## 0.4.12

- 现在可以使用环境变量 `HERD_LOG_LEVEL` 配置日志级别，可配级别有 `debug, info, notice, warning, error, critical, alert, emergency`
- 在 `NODE_ENV == development` 时，现在 morgan 会为所有访问打印进出两条 info 日志

## 0.4.11

- herd 在代理请求时会将 `ctx.herdContext.__INVOKER_HEADER__` 塞入到 `proxy header` 中

## 0.4.10

- 在上下文中注入 invokeService 方法以简化对 invokers.call 的调用，推荐总是使用此方法来调用后端服务

  `ctx.invokeService` 会将后端需要的一些信息自动注入到调用上下文中，而不再需要使用者显式 merge

## 0.4.9

- 升级 invokers ，现在在 development 时会打印出 http-invoker 每一次调用的耗时
- 增强 proxy ，对于失败的代理请求（status < 200 || status >= 400）会打印出 warning 日志

## 0.4.6

- `develop support` 新增 `/:path?_debug` 查看页面组件渲染上下文

## 0.4.5

- 升级 NodeJS 依赖到 7.6.0 及以上，不再需要 --harmony 这个 flag 来启用 async/await

## 0.4.4

- 可以通过在扩展点中增加 `ctx.herdContext.__INVOKER_HEADER__.auth = 'xxx'` 来扩展 `http invoker header`

## 0.4.3

- 调整了 i18n 中间件的加载顺序，放置在 errorHandler 之后第一个，以便发生任何错误时都可在错误页面正确显示 i18n 信息

## 0.4.2

- 通过 `header['x-request-id']` 可以唯一标识每个请求

## 0.4.1

- 现在当前用户可以按 userId 被 cache 了，不再每次去后端请求

  当 `process.env.NODE_ENV !== 'development'` 时，当前用户会默认被 cache 5 分钟

## 0.4.0

- 升级依赖的 Node 版本到 >=7.0.0 ，不再使用 babel 翻译不必要的部分（特别是 async/await）

  借此可以获得可观的性能提升

- 现在配置 `session.user.getService` 在被调用时，如果 service 是 http 类型，会携带 cookie

## 0.3.26

- 简化 mock 功能的配置，使其更简单

## 0.3.25

- 上传支持腾讯云
- 修复了 designer 在某些情况数据库初始化失败的问题

## 0.3.24

- 修复了一个 i18n 并发请求时可能错误判断用户语言的问题

- 升级了 handlebars.js 到 4.0.6 ，需要注意此版本 handlebars.js

  修复了一个上下文深度的问题。在某些场景下，不再需要额外的 `../`
去访问数据了

## 0.3.20

- 新增 mock 数据 api
- herd 支持设置 session 的过期时间了
- designer 中的页面能够指定 layout 了

## 0.3.19

- invokers http service 可以调用 http post 请求了
- 支持文件上传接口配置
- herd proxy http 支持 function filter

## 0.3.18

- designer 现在支持文章管理

## 0.3.17

- 现在可以通过 `extension.useBeforeMiddleware()` 来在中间件栈前面添加自定义中间件
- 现在所有代理的 http 请求和 service 的 http 调用都会带上 `x-forward-for` header 以便后端正确判断请求来源

## 0.3.14

- 修改了静态资源的相关配置，以便支持后续更多的配置项

  废弃 `statics` 和 `staticPrefix` 配置项，使用 `static: { root, prefix }` 代替，同时增加了 `static: { maxage }` 配置，单位为毫秒。旧的配置项现在仍然可以使用，但会 WARNING 提醒。

## 0.3.12

- 在 herdContext 中增加变量 `_ENV_` ，值为 `process.env.NODE_ENV`
- proxy 代理现在支持代理到多个后端
- 为 csrf 增加一个 one time token 的实现

## 0.3.9

- 升级 promised-handlebars ，修复组件重复的问题
- i18n 支持 json 格式作为资源文件

## 0.3.0

- 增加 parana 的权限实现
- 增加前端 i18n 支持
- 添加一些开发支持的 api
- 支持错误处理，可捕捉异常或读取 response.status ，并跳转或显示对应页面
- 支持代理不匹配的请求到后端
- 支持配置 http get service
- 添加扩展点，供前端扩展开发使用
- 更多更清晰的日志输出，更科学的日志分级
- 为日志添加颜色（如果支持）
- 性能调优
- 修复大量问题
- 添加大量单元测试与文档

## 0.2.7

- 添加 @terminus/designer-manage ，主要是装修相关管理功能，比如站点管理

## 0.2.6

- 修复 i18n 使用 yml 作为资源文件时，不支持重复的 key 的问题；添加 i18n 读取资源文件出错时的日志

## 0.2.5

- 增加后端渲染 i18n 的支持，详细请参考 docs/i18n.md

## 0.2.4

- 升级 herd-core ，修复其中使用的 loading-cache 的一个 bug

## 0.2.3

- 改变发现并注册 partial 的方式

  废弃 `options` 中的 `handlebars.preloadLayout` 和 `handlebars.layouts` 两个选项。

  现在 herd 会自动从磁盘中尝试获取 name 对应的 partial 。

## 0.2.2

- 升级 @terminus/render-handlebars-helpers 尝试修复一个 read from undefined 的错误

## 0.2.1

- 配置文件中增加 `shepherd.enable` 选项，默认为 true ，可设置为 false 关闭 shepherd 的调用

## 0.2.0

- 将配置文件中的 `router` 、`customService` 这两个外部扩展点合并成一个 `extension` 扩展点，并且增加了对 handlebars 扩展自定义的入口。详情请参考 docs/extension.md

## 0.1.15

- 在调用上下文和渲染上下文中额外放置一个 `_USER_ID_` ，值为当前登录用户的 id
- 现在可以配置 `handlebars.layouts` 以便指定要加载的 partials ，详情请参考 docs/handlebars-tips.md
- 自定义 routes 现在可以获取 herd 的 options ，详情请参考 docs/custom-routes.md

## 0.1.14

- 默认读取配置文件名称从 `PampasFile.js` 修改为 `Pampasfile.js`
