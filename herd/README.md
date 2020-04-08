# Herd runtime

Pampas runtime the node version. Powered by koa v2 and async/await.

## Features

- Server-side render handlebars
- Server-side render react
- Security
- Session manage
- With Pampas designer inside
- Load and run controllers in front-end project
- Call Dubbo/Custom service
- Map component/url to Dubbo/Custom service

## Requirements

- Node v7.0+

## Workflow

- `npm install`
- `npm test`

## Troubleshoots

- 如果你使用 vscode

  因为 vscode 现在对 async/await 等特性的支持并不好，建议关闭 vscode 的默认语法检查，使用工程内的 eslint 代替。

  关闭 vscode 默认语法检查：`"javascript.validate.enable": false` 。
