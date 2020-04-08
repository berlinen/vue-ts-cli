{% raw %}
# Cache 策略

所有 cache 都遵循同样的标准：当 NODE_ENV 未设置或 === 'development' 时，不进行 cache（只 cache 1ms）；否则则 cache 5 分钟。

目前被 cache 的有：

- 组件的 view.hbs 编译后结果
- 从磁盘动态获取的 partial 编译后结果，就是 `{{> path/to/partial}}`
- 当前用户的权限数据
{% endraw %}
