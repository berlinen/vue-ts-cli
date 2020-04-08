# Proxy

herd 可以将收到的 http 请求直接转发到目标地址。配置如下：

```js
proxy: {
  agent: { keepAlive: true }, // 默认开启，设置为false禁用，更多参数请参考：https://nodejs.org/api/http.html#http_new_agent_options
  enable: true, // default is false
  match: '/api/.+', // a regex string, required if enable set to true and not have router. whole path matched, also can be an array of strings
  to: 'http://some.domain:8080', // required too if not have router
}
```

or

```js
proxy:{
  enable:true,
  router:[ // a array, required if enable set to true and not have match,to. whole path will route when first matched in array.
    {
      match:'/api/.+',
      to: 'http://some.domain:8080'
    }, {
      match:'/api2/.+',
      to: 'http://some.domain:9000'
    },{
      match: (ctx) => {
        if(ctx.method === 'POST'){
          ...
          return true;
        }
        return false;
      },
      to: 'http://some.domain:9921'
    }
  ]
}
```

所有被 match 配置的正则匹配到（注意是全匹配，也就是 herd 会在前后加上 ^ 和 $ 来匹配）的请求，都会被直接转发到 to 配置开头的地址。
