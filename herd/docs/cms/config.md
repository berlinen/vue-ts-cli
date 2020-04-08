# 装修系统的相关配置

装修系统中提供了一个所见即所得的站点配置环境，支持hbs组件装修和react组件装修，配置如下：

```javascript
designer: {
    enable: true, // default false, 如果配置成 false ，那么 designer 下其余的配置都是不需要的
    syncCache: 2,// 分布式环境下同步缓存的时间，单位秒。 default 2, 如果为 -1 表示永远不会同步，
    lockSiteScope: false, // 是否锁定站点级别的可编辑区域，避免编辑冲突
    enableAutoRelease: false, // 是否启用自动发布
    mysql: {  //装修数据存储数据库相关配置
      database: 'database_name',
      username: 'user',
      password: 'password',
      host: 'localhost',
      port: '3306',// default 3306
      pool: {  // connection pool
        max: 10,  //max connections
        min: 0,
        idle: 10000 //idle time(ms),that a connection can be idle before being released
      }
    },
    cmsUrl: 'system/cms', // 老版装修集成 cms，不需要配置
    siteManageUrl: 'siteManage', //访问站点管理的路径，默认为： /@siteManager
    siteManage: { // 新装修配置， 配置站点管理显示样式
        url: 'system/sites', // url 也可配置在这里
        logo: 'http://aaa.bbb.com/logo.png', // logo
        logoSize: { // logo 大小
        width: '200px',
        height: '48px'
      },
      resourcePrefix: 'xxx', // 资源前缀，如果需要区分新老装修权限点，可通过增加该项配置
      hideShopDomain: true, // 隐藏设置店铺域名，只对新装修有效
      title: 'i免税海外购', // document title
    },
    articleFormItems: [ // 定义文章所需要的额外信息
      {
        label: "链接", // 显示 label
        name: "url" // 存储key,你可以通过 article.data.url 取到相应的数据
      }, {
        label: "关键字",
        name: "keyword"
      },{
        label: "时间",
        name: "time",
        type: "date" //  日期组件
      },{
        label: "弹窗",
        name: "autoOpen",
        type: "checkbox" // 选择框组件
      }, {
        label: "时间范围",
        name: "timespan",
        type: "daterange" // 日期范围组件
      },
    ],
    attachUploadUrl: '...', // 文章管理上传附件 url,如果不配置，则不能上传附件
    loginUrl: 'http://xxx/login', // 默认为null, 如果PC端和移动端为两个web项目，则需要配置登录超时后的跳转路径
    mobileBaseUrl: 'http://localhost:4000',  //如果PC端和移动端为两个web项目，则需要配置在PC端站点管理中管理移动端站点的基准路径
    imageUploadUrl: 'http://5star-img.dithub.com/upload', //上传图片的路径，默认为：/api/user/files/upload
    designer_layouts: { //装修需要用到的 layouts
      editorLayout: "design.hbs",  //装修器layout
      templateLayout: 'template.hbs',  //默认模版管理的layout
      layouts: {
        "PC-DEFAULT": {
          type: "SITE", // 类型："SITE" || "SHOP"
          root: "/",  // 页面模版存放的路径，默认为root下面的 default_layout.hbs
          name: "默认 PC 端模版",
          pageLayouts:{ // 如果有页面需要定制布局，需要配置此项  需要在 body 上加 data-page-layouts="{{pageLayouts}}"
            "单容器布局": 'page_layout.hbs',  //  存放路径相对于root
            "多容器布局": 'mult_layout.hbs'
          }
          desc: "默认主题的 PC 端模版"
        },
        "PC-React": {
          type: "SITE",
          root: "/react/",
          appType: 'react', // 默认 hbs
          name: "React PC 端模版",
          desc: "默认的 React 模版"
        },
        "PC-SHOP": {
          type: "SHOP",
          root: "/",
          name: "默认 PC 端店铺模版",
          desc: "默认主题的 PC 端模版"
        },
        'M-DEFAULT': {
          type: "SITE",
          root: "/",
          app: "MOBILE",
          name: "默认移动端模版",
          desc: "默认移动端模版"
        },
        "M-SHOP": {
          type: "SHOP",
          app: "MOBILE",
          root: "/",
          name: "默认 MOBILE 端店铺模版",
          desc: "默认主题的 MOBILE 端模版"
        }
      }
    },
    pathReplace: [  // 装修渲染路径替换,可以根据条件决定渲染某个 path 所对应的装修页面
      {
        host: 'localhost:3000', // host 匹配
        replace: (ctx) => { // path replace function, param ctx from koa2
          if (ctx.path === '/') {
            return '/test';
          }
        },
      }
    ],
    shopId: 1, //装修店铺时供组件使用的店铺ID
    itemId: 5002 //装修详情页时供组件访问的商品ID
  },
```
