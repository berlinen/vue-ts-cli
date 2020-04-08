# mock 数据

herd 现在支持为 service 和 proxy 提供 mock 数据，并且支持 mock 配置的热加载。

对于 service 而言，未命中的 mock 项则会尝试调用真实 service 。

同样的对于 proxy mock ，如果经过 proxy 的请求未命中 mock 项，会进一步代理到真实 proxy 接口尝试获取数据。

因此我们可以将 mock 夹在应用于真实数据之间，在开发的任意阶段使用任意数量的 mock 项。

## 配置

主要涉及到以下配置:

```javascript
// 在 Pampasfile.js 中配置
{
  mock: {
    enable: true, // 默认 false，可以写表达式
    dataFile: 'some-file-name.js', // 相对于配置项里 root 的路径
    proxyMatch: ['/api/.+', '/api1/.+'], // 正则表达式，匹配的代理 url 会进 mock 逻辑
  }
}

// Pampasfile.js 中指定的 mock.dataFile 中的配置: some-file-name.js
module.exports = {  // log inner mock server. example: log('some logging');
  services: {
    someServiceKey: { // 设置为值/对象则会直接返回
      result: 1,
    },
    someServiceKey2(context) => { // 或者设置为方法，会被调用
      return { result: context.result };
    },
  },
  routes: { // 经过 proxy 的请求，在这里被匹配的话就会触发 mock
    '[GET]/api/shops/:shopId': {
        a: 1
    },
    '[GET]/api/items/:itemId': (ctx) => {
      return { itemId: ctx.params.itemId };
    },
  },
};
```
