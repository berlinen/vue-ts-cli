# Service config

服务配置说明。

## Dubbo service 配置

因为服务端是强类型的，所以需要声明类型信息；以及为了自动匹配上下文中的参数，需要声明参数名字（注意此处参数名称并非 Java 接口上的参数名称，而是在前端请求/渲染上下文中的参数名称）。

```js
serviceKey: {
  type: 'dubbo', // 默认就是 dubbo ，因此可以省略
  uri: 'some.domain.package.Interface:method', // 接口类和方法名，注意是 uri 不是 url
  version: '1.0.0', // 注意！此参数为可选，除非服务提供端指明了版本，否则请不要在这里指定版本
  params: [ // 一个数组，与方法上的参数顺序同序
    { type: 'Long', name: 'id' }, // 数组元素为 type 和 name 组成的 object
    { type: 'String', name: 'nick' },
    'email: String' // 也可以写成字符串形式，name: type ，中间空格可选
  ]
}
```

其中 params 中的 type 可选值为：

- Boolean: 'java.lang.Boolean',
- boolean: 'boolean',
- Integer: 'java.lang.Integer',
- int: 'int',
- short: 'short',
- Short: 'java.lang.Short',
- byte: 'byte',
- Byte: 'java.lang.Byte',
- long: 'long',
- Long: 'java.lang.Long',
- double: 'double',
- Double: 'java.lang.Double',
- float: 'float',
- Float: 'java.lang.Float',
- String: 'java.lang.String',
- char: 'char',
- chars: 'char[]',
- Character: 'java.lang.Character',
- List: 'java.util.List',
- Set: 'java.util.Set',
- Iterator: 'java.util.Iterator',
- Enumeration: 'java.util.Enumeration',
- HashMap: 'java.util.HashMap',
- Map: 'java.util.Map',
- Dictionary: 'java.util.Dictionary'
- some.package.Class (任意类型)

## Http service 配置

**http 调用请参考 extension.md ，使用 registerService 编写自定义服务来实现。**

```js
serviceKey: {
  type: 'http', // required
  method: 'POST', // 指定 http method, 如果为非 GET 请求， query 会作为 request body 以 form data 发出
  url: 'http://some.domain/path/to/api/{pathVariable}', // http:// 可以省略，使用 {paramName} 来占位, 你也可以给 url 上的参数设置默认值: http://some.domain/path/to/api/{pathVariable:123}
  query: [
    'param', // query 参数，与下面这种方式的区别就是默认 param 和 target 一样
    'param: target', // query 参数，以及对应的上下文中的参数，使用 param 作为 query name，使用上下文中的 target 作为值（可以理解为 param=context[target]）
    {
      name: 'param3', // quey 参数
      target: "target1", // 可选参数, 如果没有这个参数默认值为 name
      default: "defaultValue", // 默认值 (可以理解为 param=context[target] || defaultValue)
    },
  ],
}
```
