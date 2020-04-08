# 性能优化建议

- 使用 pm2 这类工具多进程运行 herd

- 将静态资源交由 nginx 处理（也包括像 i18n resources 这样的文件，herd 对静态资源的处理更多是方便开发）

- 设置环境变量 `NODE_ENV=production` ，herd 会基于此减少日志并开启更多的 cache

- 关闭不需要的特性，例如 i18n 、designer 、develop
