# Config file definition

使用 js 文件作为配置文件，优势是可编程（模块化、自由读取其它格式）。

如果想使用 yaml 等格式作为配置文件，可自行使用对应的 npm package 读取后导出。需要注意的是暂时不支持异步获取配置。

内容：

```javascript
const userComponents = require('./user-components');
const tradeComponents = require('./trade-components');

module.export = {
  root: __dirname, // default process.cwd()
  port: 8080, // default 8088,
  extension: 'lib/extension.js', // default null
  static: {
    root: '', // static directory root, base at root config
    prefix: '/', // default /
    maxage: 3600, // ms, default 0
  },
  csrf: {
    enable: true, // default true
    implemention: 'default|oneTimeToken', //default default
  },
  session: { // default as below
    store: 'cookie', // or redis, default is cookie
    prefix: 'afsession', // only work for redis store, the prefix of redis key
    cookieKey: 'msid',
    maxAge: 1000 * 60 * 30,
    user: { // 参考 get-login-user 文档
      enable: false, // default true
      idKey: 'userId',
      getService: 'getUserById',
      expire: 1000 * 60 * 5, // 默认 5 分钟，只在 process.env.NODE_ENV !== development 时起效
    }
  },
  handlebars: {
    views: 'views', // default views
    components: 'components', // default components
    injectWithError: false, // 当绑定的 service 返回 error response 时，是否在上下文中插入 error 信息
  },
  components: { // 纯 js 所以可以随意组合方式
    'user/login_box': {
      name: '登陆框',
      service: 'getUser'
    }
    ...userComponents,
    ...tradeComponents
  },
  services: {
    // 请参考 service.md
  },
  mappings: [
    // 请参考 api-mapping.md
  ],
  dubbo: {
    registry: 'some_zk_address',
    version: '2.5.4.1-SNAPSHOT'
  },
  redis: { // see https://www.npmjs.com/package/ioredis
    host: '127.0.0.1', // default undefined
    port: 6379, // default 6379
    db: 0, // default 0
  },
  i18n: {
    // 请参考 i18n.md
  },
  designer: {
    enable: true, // default false, 如果配置成 false ，那么 designer 下其余的配置都是不需要的
    mysql: {
      database: 'database_name',
      username: 'user',
      password: 'password',
      host: 'localhost',
      port: '3306',// default 3306
      pool: {  // connection pool
        max: 10,  //max connections
        min: 0,
        idle: 10000 //idle time(ms),that a connection can be idle before being released
      }
    },
  },
  proxy: {
    // 请参考 proxy.md
  },
  errorHandle: {
    // 请参考 error-handle.md
  },
  upload: { // upload 也是装修相关配置，无装修时不支持 upload
    // 请参考 upload.md
  },
  auth: {
    enable: true, // default false
    implemention: 'parana', // 权限的实现，现在只有一个 parana 的实现，详情请参考 rbac-auth.md
    strict: false, // 是否严格模式，为 true 则未匹配到的请求都失败，false 反之
    loginRedirect: '/login', // 未登陆时跳转登陆的地址
    childrenInclude: true, // 权限树的父节点是否自动包含子节点，为 false 时，持有父节点权限并不自动持有子节点权限
  },
};
```

## 对 herd 集成的 koa 中间件进一步配置

herd 基于 koa 实现，因此也集成了部分 koa 中间件。通过 `middlewareOpts` 可对部分中间件透传配置。

可透传配置的中间件有：
* koa-bodyparser
* koa-csrf
* koa-helmet

```javascript
module.export = {
  // some other configs
  middlewareOpts: {
    bodyParser: {
      // ...
    },
    csrf: {
      // ...
    },
    helmet: {
      // ...
    }
  }
}
```

对应的配置请参考各中间件自己的文档。
