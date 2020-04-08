# Handlebars 使用指南

## Promised handlebars

npm package promised-handlebars 提供了 Handlebars 的异步支持（通过允许 helper 返回 Promise），但是写的时候需要注意一个问题。

> 当 helper 内会显式调用 Handlebars 进行渲染时，如果 helper 本身有异步动作，则对渲染的调用也需要异步，否则同步使用。

举例：

```js
// 可以使用 async/await (使用 babel 的 transform-async-to-generator)
Handlebars.registerHelper('asyncHelper', async function () {
  const template = Handlebars.compile('<div>{{inject "eevee/text"}}</div>');
  await somePromise();
  const result = await template({}); // 要对模板的渲染动作 await
  return new Handlebars.SafeString(result);
});

Handlebars.registerHelper('asyncHelper', function () {
  const template = Handlebars.compile('<div>{{inject "eevee/text"}}</div>');
  return somePromise()
    .then(() => template({})) // 通过 then 来获取模板渲染结果
    .then(r => new Handlebars.SafeString(r));
});
```

```js
Handlebars.registerHelper('asyncHelper', function () {
  const template = Handlebars.compile('<div>{{inject "eevee/text"}}</div>');
  const result = template({}); // 没有那个异步 promise 时，直接同步调用即可
  return new Handlebars.SafeString(result);
});
```

## 动态 Partials

herd override 了 Handlebars.VM.resolvePartial 方法，当原始方法返回 undefined 时，herd 会尝试去本地磁盘**同步**获取文件并 compile 后 cache 起来（详细请参考 cache 策略）。

partial 前缀为 `component:` 的，获取路径为 `path.resolve(options.root, options.handlebars.components)`，无前缀则从 `path.resolve(options.root, options.handlebars.views)` 获取。
