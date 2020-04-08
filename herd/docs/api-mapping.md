# API mapping

将一个配置好的 service 直接映射为一个 http api 。一般配置如下：

```js
mappings: [
  {
    methods: ['GET', 'POST'], // 如果只有一个，可以不写数组直接写字符串
    pattern: '/api/shops/{shopId}', // {} 中的被视为 path variable ，会被匹配出来后传递给 service
    service: 'someService', // 被 mapping 的 service
  }
]
```
