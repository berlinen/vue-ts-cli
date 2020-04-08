# Invoke filter

可以为所有的 invoker 添加一个 filter ，实现一些自定义功能。配置入口在 `options.invokeFilter`

```json
{
  invokeFilter: 'invoke-filter.js' // 或者直接在这里写 function 也可以
}
```

示例：

```js
// serviceKey: 被调用的 service 的key
// service: serviceKey 对应的 service 配置
// context: 参数上下文
// invoke: 原始调用，默认用原始 service 和 context 调用，也可以传入 service 和 context
//   例如：invoke(); 或者 invoke(changedService, changedContext)
module.exports = async ({ serviceKey, service, context, invoke }) => {
  if (serviceKey === 'needCache') {
    if (cache[serviceKey] == null) {
      cache[serviceKey] = await invoke();
    }
    return cache[serviceKey];
  }
  return invoke();
}
```
