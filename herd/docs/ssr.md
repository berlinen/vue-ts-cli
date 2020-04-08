## 使用 React SSR

herd 的 react server render 配置如下:

```js
{
  ssr: {
    enable: true,
    dir: 'app', // 默认模板工程的根目录，可以手动设定根目录，此目录也是 nextjs 生成 pages文件的目录
    cache: { // 静态路由的缓存配置
      pages: [
        { path: '/' },
        { path: '/index', params: { key1: 'a' } }
      ]
      expire: 3600000 // 默认缓存时间
    }
    routes: [ // 服务端动态路由自定义配置
      {
        page: 'detail',
        route: '/detail/:id',
      },
      {
        page: 'activity',
        route: '/activity/:path',
        cache: true
      }
    ]
  }
}
```

使用 nextJs 完成相关的服务端渲染和路由工作，详情请参考 https://github.com/zeit/next.js/ 。

herd 默认是关闭 SSR ，如果需要开启，请配置 `ssr: { enable: true }`。

