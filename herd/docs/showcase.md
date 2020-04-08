# showcase 运行指引

showcase 工程位于 http://git.terminus.io/outsourcing/pampas-showcase 的 herd 分支

- check out 代码并切换到 herd 分支
- 在本地 2181 端口启动一个 zk
- 在本地 6379 端口启动一个 redis
- 全局安装 herd `npm i -g @terminus/herd --registry http://registry.npm.terminus.io/`
- 在 showcase 工程的 showcase-front 目录下执行 `herd`
- 与 IDEA 中运行 showcase/service 中的 Application 或在项目根目录执行 `mvn package` 后 `java -jar service/target/pampas-showcase-service.jar` 以便准备好 dubbo 服务
- 打开浏览器输入 `http://localhost:8088/index` 访问
