{% raw %}
# Step by Step

本文档描述使用端点的 handlebars 技术栈结合 herd 与 shepherd 开发一个简单页面的场景。

shepherd 文档请参考此处：<http://docs.terminus.io/shepherd/> 。

如果已经完成安装，可跳过安装环境这一节。示例中的代码可在这里获取：<http://git.terminus.io/herd/herd-showcase-handlebars> 。

## 安装环境

- 安装 `node: v7.0.0+`

- 设置访问 terminus 的 npm registry

  ```sh
  npm config set registry http://registry.npm.terminus.io/
  ```

- 安装 `herd package`

  ```sh
  npm i -g @terminus/herd
  ```

- 安装 `shepherd package`

  ```sh
  npm i -g @terminus/shepherd
  ```
  **shepherd 是 terminus 一个前端的打包工具**

## 开始你的项目

- 创建项目

  ```sh
  cd workspace
  mkdir herd-showcase-handlebars && cd herd-showcase-handlebars
  mkdir app server
  touch Pampasfile.js
  touch shepherd.js
  ```

- 初始化

  ```sh
  npm init
  # 按照提示一步一步来
  name: (herd-showcase-handlebars)
  version: (1.0.0) 0.1.0
  description: herd demo
  entry point: (index.js) index.js
  test command:
  git repository:
  keywords: herd demo
  author: your name
  license: (ISC)
  ```

- 配置 herd

  ```js
  // Pampasfile.js

  module.exports = {
    root: process.cwd(),
    port: 8081,
    designer: {
      enable: false,
    },
    static: {
      root: 'public',
      prefix: '/',
    },
    templete: 'handlebars',
    handlebars: {
      components: 'public/components',
      views: 'public/views',
    },
    session: {
      store: 'cookie',
      cookieDomain: 'localhost:8081',
      prefix: 'sessionId',
      maxAge: 1000 * 60 * 30,
    },
    middlewareOpts: {
      bodyParser: {
        formLimit: '1mb',
      },
    },
  }
  ```

- 第一个页面

  创建文件 `app/views/helloworld.hbs`

  ```hbs
  <h1>hello world!</h1>
  ```

- 项目打包配置

  ```js
  // shepherd.js

  const fs = require('fs-extra')

  process.settings = {
    paths: {
      app: 'app',
      public: 'public',
    },
    bases: [
      'app/*/',
      'public/',
    ],
  }

  module.exports = (shepherd) => {
    const { copy } = shepherd.chains

    const copyResource = (src, dest) => {
      return shepherd.src(src)
        .then(copy(dest))
        .then(shepherd.dest())
    }

    shepherd.task('clean', () => {
      return Promise.resolve(
        fs.emptyDirSync(process.settings.paths.public)
      )
    })
    const srcPath = {
      viewPath: 'app/views/**/*.hbs',
      componentsPath: 'app/components/**/*',
    }
    shepherd.task('views', () => {
      return copyResource(srcPath.viewPath, 'public/views')
    })

    shepherd.task('components', () => {
      return copyResource(srcPath.componentsPath, 'public/components')
    })

    shepherd.task('default', ['clean'], () => {
      shepherd.watch(srcPath.viewPath, ['views'])
      shepherd.watch(srcPath.componentsPath, ['components'])
    })
  }
  ```

  ```sh
  npm i -save-dev fs-extra
  shepherd
  ```

- 启动项目

  新开一个终端

  ```sh
  herd
  ```

  在浏览器中输入地址: `http://localhost:8081/helloworld`

  ![](http://terminus-designer.oss-cn-hangzhou.aliyuncs.com/2017/02/27/477c0456-0e8a-4726-a075-8b1858bdaafd.png)

## 使用组件

- 菜单组件

  创建文件 `app/components/menu/view.hbs`

  ```hbs
  {{#component "menu"}}
    <div>
      {{#each MENUS}}
        <a href="index?scope={{this}}">{{this}}</a>
      {{/each}}
    </div>
  {{/component}}
  ```

- 列表组件

  创建文件 `app/components/list/view.hbs`

  ```hbs
  {{#component "list"}}
    <table border="1" aaa={{json this}}>
      <tr>
        <th>id</th>
        <th>key</th>
        <th>value</th>
        <th>description</th>
        <th>scope</th>
        <th>createdAt</th>
        <th>updatedAt</th>
      </tr>
      {{#each _DATA_}}
        <tr>
          <td>{{this.id}}</td>
          <td>{{this.key}}</td>
          <td>{{this.value}}</td>
          <td>{{this.description}}</td>
          <td>{{this.scope}}</td>
          <td>{{this.createdAt}}</td>
          <td>{{this.updatedAt}}</td>
        </tr>
      {{/each}}
    </table>
  {{/component}}
  ```

- 配置 `mock server` and `components`

  ```js
  // 接 Pampasfile.js

  ...
  components: {
    menu: {
      category: 'COMMON',
      name: '菜单',
    },
    list: {
      category: 'COMMON',
      name: '列表',
      service: 'getList',
    },
  },
  mock: {
    enable: true,
    dataFile: 'mock-file.js',
  },
  ```

  ```js
  // mock-file.js

  const data = []

  for (let i = 0; i < 10; i++) {
    data.push({
      id: i,
      key: `key${i}`,
      value: `value${i}`,
      description: `description${i}`,
      scope: ['car', 'house', 'phone'][i % 3],
      createdAt: `2009-1-${i}`,
      updatedAt: `2013-${i}-9`,
    })
  }

  module.exports = {
    services: {
      getList(context) {
        const { scope } = context
        if (!scope) return data
        const result = []
        data.forEach((d) => {
          if (d.scope === scope) {
            result.push(d)
          }
        })
        return result
      },
    },
    routes: {},
  }
  ```

- 添加页面

  创建文件 `app/views/index.hbs`

  ```hbs
  <!DOCTYPE html>
  <html lang="zh-CN">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>terminus</title>
    </head>
    <body>
      {{#inject 'menu'}}
        { "MENUS": ["car", "house", "phone"] }
      {{/inject}}
      {{inject 'list'}}
    </body>
  </html>
  ```

  在浏览器中打开地址: http://localhost:8081/index

![](http://terminus-designer.oss-cn-hangzhou.aliyuncs.com/2017/02/27/43e8df8c-50e1-4fec-bdf7-7d28d42213bd.png)
{% endraw %}
