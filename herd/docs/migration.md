# 从 Java Pampas 迁移

## Config

不再使用 yml 格式作为配置文件，而是使用 js 文件。具体配置内容请参考 config-file.md 、service.md 、api-mapping.md 等几个文件。

对于旧有配置，可以选择稍加改动后在配置文件中使用 nodejs 的 yml 库读取。

## i18n

i18n 依然采用 yml 格式作为配置文件，主要的几点不同：

- 默认 bundle 从 message 变成 translation
- 语言信息全部用短横线(-)连接，而不是下划线 `zh_CN -> zh-CN`
- 文本中占位符从单花括号包裹变成使用双花括号包裹 `Text {0} -> Text {{0}}`
- 不再支持使用 true 作为 value，作为替代可以使用 null 代替
