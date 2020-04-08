# 文章管理

站点管理中提供了一个简单的文章管理系统，用于管理文章的分类和内容。

### GET /api

获取文章分类列表

```console
$ curl http://host/api/design/article/categories
```

```js
[
  {
    id,
    name,
    parentId, //父分类
    articleCount, //文章数量
    updatedAt,
    createdAt
  },
  ...
]
```

获取文章分类树

```console
$ curl http://host/api/design/article/listCategory
```

```js
[
  {
    id,
    name,
    parentId, //父分类
    articleCount, //文章数量
    children:[
      {
        ...
      },
      ...
    ],
    updatedAt,
    createdAt
  },
  ...
]
```

获取分类
```console
$ curl http://host/api/design/article/category?id={id}
```

```js
{
  id,
  name,
  parentId, //父分类
  updatedAt,
  createdAt
}
```

获取分类子分类
```console
$ curl http://host/api/design/article/category/:id/children
```

```js
[
{
  id,
  name,
  parentId, //父分类
  updatedAt,
  createdAt
}
]
```

根据条件获取文章列表

```console
$ curl http://host/api/design/article?categoryId={categoryId}&ids={ids}
```

```js
[
  {
    id,
    categoryId,
    title,
    creator,
    status,
    createdAt,
    updatedAt
  },
  ...
]
```

获取多篇文章详情

- ids: 文章id集合，以 `,` 分隔

```console
$ curl http://host/api/design/article/multi?ids={ids}
```

```js
[{
  id,
  categoryId,
  title,
  creator,
  status,
  description,
  content,
  category,
  createdAt,
  updatedAt
}]
```

获取文章详情

```console
$ curl http://host/api/design/article/:id
```

```js
{
  id,
  categoryId,
  title,
  creator,
  status,
  description,
  content,
  createdAt,
  updatedAt
}
```

获取文章列表(按修改时间倒序排列)

- pageSize 每页的条数
- pageNo 页码
- searchKey 搜索关键字

```console
$ curl http://host/api/design/article/list?categoryId={categoryId}&pageNo={pageNo}&pageSize={pageSize}&searchKey={searchKey}
```

```js
{
  total: 100, //总的文章数量
  data:[{
    id,
    categoryId,
    title,
    creator,
    status,
    createdAt,
    updatedAt
  }]
}
```

获取文章子分类树及其下面的所有文章

```console
$ curl http://host/api/design/article/category/:categoryId/tree
```

```js
{
  id,
  name,
  parentId,
  children:
  [
    {
      id,
      name,
      parentId, // 父分类
      articles, // 文章列表，如果有子分类则没有这个属性
      children:[ // 子分类，如果是末级节点则没有这个属性
        {
          ...
        },
        ...
      ],
      updatedAt,
      createdAt
    },
  ]
}
```
