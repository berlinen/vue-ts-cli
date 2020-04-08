## 如何自定义handlebars组件

### 概述
一个组件包含6个文件:
- view.hbs 组件的html结构
- view.js(可选) 渲染html成动态组件
- view.scss(可选) 组件的样式
- config.js(可选) 组件可配置的属性，供装修系统使用
- vendor_ext.js(可选) 组件的依赖
- config.scss(可选) 组件在装修模式下的样式


### view.hbs
component helper:组件的容器，参数:容器的className

```handlebars
       {{#component "js-comp eve-comp"}}
          <div>.......</div>
       {{/component}}
```

### view.js
this.$el：当前容器的jquery对象

```js
      module.exports = function() {
         const $el = this.$el;
         ......组件的初始化动作
      ｝
```

### view.scss

```scss
      .eve-comp{
          ......
       }
```

### config.js

#### Propery的定义大部分和以前类似，有以下几点改动

*用reduce方法替换了set方法*

```js
         function reduce(config,value,[updateProperties={}]){
              //config 当前配置
              //value 当前属性的值
              // updateProperties 需要更新的其他属性
              ......  //计算新的config
              return new config || Promise<config>;
          }
```

Propery Methods:(新增)
- removeStyle(config,name) 移除组件容器样式值
- combinStyle(config,value,name) 合并组件容器样式值
- removeClass(config,［...classes]) 移除组件容器ClassName
- addClass(config,[...classes])添加组件容器ClassName

#### definedProperty(config,options,[Propery]) 自定义属性

- config 当前config对象
- options 需要重写的属性或方法
- Propery 继承属性

#### PropertyBr 换行属性

```js
this.registerConfigProperty('ext', new PropertyBr());
```

#### registerConfigProperty(name,[...Proerties]) 注册组件

例如： this：当前config对象

```js
    import {definedProperty, PropertyBr} from 'eevee/config/properties';
    module.exports = function() {
       this.baseInfo.name = '文字组件'; //组件的名称
       this.baseInfo.description = '一段用于显示的文字'; //组件的描述
       this.configs.ext = {  //扩展组件的config文件
          name: '组件设置'
       };
       const alignProperty = definedProperty(this, {
         name: 'align',
         label: '对齐',
         description: '文字的对齐方式',
         type: 'radio', // 支持 datetime text textarea radio checkbox select button
         useData: true,
         reRender: false,
         options: { // radio 配置
           left: '左对齐',
            center: '居中对齐',
            right: '右对齐'
         },
         'default': 'left',
         reduce: function(config, val) {
            let $editor = this.$target.find('.text-content');
            $editor.css('text-align', val);
            if (val === this['default']) {
               delete config[this.name];
               return config;
            }
            return this._reduce(config, val);
         }
      });
      return this.registerConfigProperty('ext', alignProperty, new PropertyBr());
    }
```

#### ImageProperty 图片属性

```js
 const srcProperty = definedProperty(this, {
    name: 'src',
    label: '图片地址',
    description: '图片地址',
    options: {
      "url": `<i class="fa fa-picture-o"></i>&nbsp;选择或上传图片`
    },
    useData: true,
    reduce: function(config, val) {
      return this.getImage().then((url) => {
        if (url && url != '') {
          return _.assign(config, {
            src: url
          });
        }
        Essage.show({
          message: '图片组件不能将图片设置为空',
          status: 'warning'
        }, 2000);
      }, () => { });
    }
  }, ImageProperty);
  ```

  #### definedDialogProperty 定义dialog属性

  ```js
  const modalProperty = definedDialogProperty(this, {
    name: 'modal',
    label: '弹窗',
    description: '弹窗',
    reRender: true,
    useData: true,
    formFields: [
      {
        name: 'myradio',
        label: '单选框',
        type: 'radio', // radio box
        options: [
          {label: '启用', value: '1', default: true},
          {label: '不启用<br/>', value: '0'},
          {label: 'unknow', value: '-1'},
          {label: 'xxxxxx', value: '-2'}
        ],
      },
      {
        name: 'myinput',
        label: '名称',
        type: 'text'  // text input
      },
      {
        name: 'myimage',
        label: '图片',
        type: 'image' // 图片上传
      },
      {
        type: 'blank'  // 空行
      }
    ]
  });

  // formFields 也可以为一个function
  formFields: () => {
      return [
        {
            name: 'myradio',
            label: '单选框',
            type: 'radio', // radio box
            options: [
            {label: '启用', value: '1', default: true},
            {label: '不启用<br/>', value: '0'},
            {label: 'unknow', value: '-1'},
            {label: 'xxxxxx', value: '-2'}
            ],
        },
        {
            name: 'myinput',
            label: '名称',
            type: 'text'  // text input
        },
        {
            name: 'myimage',
            label: '图片',
            type: 'image' // 图片上传
        },
        {
            type: 'blank'  // 空行
        }
      ];
  }
  ```
