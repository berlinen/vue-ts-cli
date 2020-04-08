# 获取当前登录用户

和登录用户相关的配置项如下：

```js
session: {
  user: {
    enable: true, // 默认为true,使用默认的current-user中间件，在ctx中塞入用户信息
    idKey: 'userId', // 在 session 中存储用户 id 的 key
    getService: 'getUserById', // 使用 userId 为参数去获取用户的 service ，在 services 中配置
    expire: 1000 * 60 * 5, // 当 process.env.NODE_ENV !== development 时，当前用户会按照用户 id 被 cache ，默认过期时间 5 分钟
  }
}
```

如果 herd 能通过 ctx.session[idKey] 获取到一个合法的 userId ，则会尝试通过 getService 配置的服务获取一个用户。

herd 可以通过 ctx.session.maxAge 和 ctx.session.maxAge = xxx 获取和设置当前session的过期时间。

接下来开发者便可以在服务调用上下文和 handlebars 渲染上下文中使用 `_USER_` 引用这个用户；或在 koa 中使用 ctx.state.currentUser 。

为了方便调用服务，同时还提供 `_USER_ID_` 这个上下文变量。

getService 约定格式如下

herd 提供了 `ctx.clearUserCache(userId)` 用来清除用户缓存

```java
User getUserById(Long userId);
// or
Response<User> getUserById(Long userId);

class Response<T> {
  boolean success;
  T result;
  String error;
}
```
