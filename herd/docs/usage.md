# Usage

## 环境需要

- node: v7.0.0+（如果使用 node v6.0.0+ ，请安装 herd 的 0.3.x 版本）
- npm installed with node

## 安装与依赖

首先需要设置访问 terminus 的 npm registry 。

```shell
npm config set registry http://registry.npm.terminus.io/
```

接着安装 pm2 和 herd 。

```shell
npm i -g pm2 @terminus/herd
```

## 使用

开发环境下直接使用 herd 即可。

```shell
# 加载执行目录下的 Pampasfile.js
herd
# 指定配置文件
herd path/to/Pampasfile.js
```

使用 pm2 多核运行。

```shell
# 4 实例运行，加载当前目录下的 Pampasfile.js（注意传入 --harmony 参数来支持 async/await）
pm2 start herd -i 4 --node-args="--harmony"
# 有几核跑几个实例，加载指定位置的配置文件
pm2 start herd -i 0 --node-args="--harmony" --path/to/Pampasfile.js
```


使用 nodemon 热加载

```javascript
// 所在项目的 package.json
{
  "scripts": {
    "hotload": "nodemon  --exec 'herd Pampasfile.js' --watch lib/server --watch 'Pampasfile*.js'"
    ...
  },
  "devDependencies": {
    "nodemon": "^1.11.0",
    ...
  },
  ...
}

```
```shell
# run
npm run hotload
```


## Debug

点击 `vscode` 左侧 `debug tab` 新增 `debug` 配置如下:

```json
{
  // 使用 IntelliSense 了解相关属性。
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "cwd": "${workspaceFolder}",
      "program": ".../node_modules/@terminus/herd/bin/herd.js" // 换成你自己herd所在目录
    }
  ]
}
```
