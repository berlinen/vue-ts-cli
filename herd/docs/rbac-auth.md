{% raw %}
## rbac 的默认权限实现

权限系统由三层模型组成，从大到小分别是 role -> resource -> request 。role 即 rbac 的 角色；可包含 n 个 resource ；resource 是 request 的集合；request 的则是对 url 的定义，单个 request 由方法和正则表达式组成。

其中 role 分为两种：直接由配置定义的静态角色；基于资源树进行生成的动态角色。

三层权限在配置文件中进行配置，配置格式中包含三部分内容：resource 资源列表；静态角色；动态角色资源树。

```js
module.exports = {
  // 资源可包含请求
  auth: {
    strict: false, // 当设置为 false 时，未配置的 request 将对所有登录用户放行
    resources: {
      add_user: {
        requests: [
          - 'POST: /api/users',
          - 'PUT: /api/users/.+'
        ]
      }
    },
    // 静态角色，角色可以包含 resource 或 request
    roles: {
      GLOBAL: {
        // 特殊角色，其实就是白名单
      },
      LOGIN: {
        // 特殊角色，所有登录用户都拥有此角色
      },
      admin: {
        resources: [
          - 'add_user',
        ]
      }
    },
    // 动态角色定义所用的权限树，同样可以包含 resource 和 request
    trees: {
      seller: {
        items: {
          name: '商品管理'
          children: {
            create: {
              name: '发布商品',
              resources: [
                - 'create_items'
              ]
            },
            update: {
              name: '编辑商品',
              resources: [
                - 'edit_items'
              ]
            }
          }
        }
      }
    }
  }
};
```

因为动态角色只能存储在后端，因此需要后端提供一个接口来获取某个用户的动态权限。约定如下：

```java
RoleContent getRolesByUserId(Long userId);

public class RoleContent {
    private List<StaticRole> roles;
    private List<DynamicRole> dynamicRoles;

    @Data
    public static class StaticRole {
        private String base; // role 本身，比如 SELLER
        private Multimap<String, String> context; // role 内容，暂时无用
    }

    @Data
    public static class DynamicRole {
        private String base; // trees 中的单个 tree
        private Multimap<String, String> context; // 暂时无用
        private List<String> treeNodeSelection; // 在这个 tree 中选中的节点 key
    }
}
```

此接口在权限配置文件中进行配置:

```js
module.exports = {
  auth: {
    //...
    service: 'getRolesByUserId'
    //...
  }
}
```

如果不配置此接口，herd 就认为不需要动态角色校验，当请求在 `roles.GLOBAL` 和 `roles.LOGIN` 中都未匹配，则直接 Forbidden 。

herd 提供了 `ctx.clearAuthCache(userId)` 用来清除用户权限信息

### 未登录跳转

可通过 `auth.loginRedirect` 配置，来指定未登录访问非白名单页面时跳转到的登陆页。

当此配置指定并且非 ajax 请求时，会通过 301 跳转。

### 模板内使用

提供两个 handlebars helpers

- hasRole `{{#hasRole "ADMIN,SELLER"}}1{{else}}2{{/hasRole}}`

  判断当前用户是否有对应的静态角色

- withPerm `{{#withPerm "item_edit, item_publish"}}1{{else}}2{{/withPerm}}`

  判断当前用户是否有对应的资源点
{% endraw %}
