# 静态资源托管

Herd 提供静态资源托管的能力，但目的是为了方便研发阶段。**Node 并不擅长处理静态资源，因此请谨慎用于生产环境，如果需要在生产环境使用，请在前面挂上 CDN 。**

## 配置

```js
static: {
  root: '', // 静态文件所在目录，会和上层的整体 root 拼接，因此不要使用 / 开头
  prefix: '/', // 静态文件请求的前置匹配路径，url 会通过 prefix 来判断是否为静态文件请求
  maxage: 3600, // 单位为 ms
}
```

Herd 会通过 `prefix` 选项识别静态文件请求，并将 `prefix` 从 url 中裁切掉，拼接上 `root` 后尝试寻找，如果未找到时会返回 404 。

## 在生产使用此特性

当挂在 CDN 后面时，`prefix` 一定要被显式设置成非 `/` 的值。

当 `prefix` 使用默认值或者被设置成 `/` 时，所有请求都会被识别为静态文件请求。在这个情况下，Herd 会将找不到资源的请求漏给后面的 middleware 。这在生产环境可能会导致一些问题，例如可能导致 CDN 缓存到不该缓存的 response (请求进入鉴权模块进而返回了一个 302)。

当设置 `prefix` 时，`root` 可能需要配合进行设置，举例如下：

```js
// 静态文件存在于项目根目录的 public/assets 目录下，前端通过 /assets 路径访问静态文件
static: {
  root: 'public/assets',
  prefix: '/assets',
}
```

1. 访问 /assets/scripts/app.js
2. 命中 prefix /assets
3. 裁切得到 /scripts/app.js
4. 拼上 root 得到 public/assets/scripts/app.js
5. 尝试读取文件
  1. 命中文件，返回文件内容
  2. 未命中，同时因为 prefix 设置了非 / 值，返回 404
