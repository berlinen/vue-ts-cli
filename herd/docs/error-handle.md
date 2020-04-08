{% raw %}
# 异常处理

## 异常页面

在出现异常 status 时显示指定页面。配置如下，对于特定的 http status 会匹配 codeViews 中的配置，未配置的则使用 defaultView 配置。

```javascript
errorHandle: { // default is undefined
  defaultView: '/error',
  codeViews: {
    404: 'redirect:/404',
    500: 'forward:/500,
  },
}
```

配置有三种形式：

- 直接写路径 `/error` 会去找前端工程中直接渲染的对应 hbs , 无法访问装修页面, 一般是 /views/error.hbs
- `forward:/error` 在页面 url 不变的情况下跳转到 /error 路径, 如果此路径有装修页面可以正确显示装修页面
- `redirect:/error` 页面和 url 都会跳转到 /error 路径, 装修页面也可正确显示

**注意：codeViews 配置只对 http status > 400 的生效，同时 401 因为在权限中配置了 loginRedirect ，也不会生效。**
{% endraw %}
