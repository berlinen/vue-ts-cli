# Upload

herd 的上传接口配置如下:

阿里 oss

```js
{
  upload: {
    enable: true,
    points:[
      { // 具体配置可以参考: https://github.com/dzy321/file-upload
        url: '/api/upload',
        mimetypes:['image/png', 'image/bmp'], // default null
        exts: ['jpg','png'], // mimetypes exts 选一个配置就可以了
        provider: 'oss',
        accessKeyId: "key",
        accessKeySecret: "secret",
        bucket: "terminus-designer",
        storeDir: "doc", // 可选存储文件夹
        region: "oss-cn-hangzhou",
        attachment: true, // 附件模式，下载时会显示原文件名
        filename: (file) => `${new Date().getTime()}-${file.filename}`, // 可选，可以对存储的文件名进行配置
        targetHost: "xxx.oss-cn-hangzhou.aliyuncs.com", // default null, 文件的访问地址host,该项配置只对装修上传图片接口有效
        targetProtocol: "http" // default null , 文件的访问地址协议
      }
    ]
  }
}
```

腾讯 cos

```js
  upload: {
    enable: true,
    points:[
      { // 具体配置可以参考: https://github.com/dzy321/file-upload
        url: '/api/upload',
        mimetypes:['image/png', 'image/bmp'], // default null
        provider: "cos",
        bucket: "b2b",
        appId: "xxx",
        secretID: "xxx",
        secretKey: "xx",
        region: "gz"
        targetHost: "{bucket}-{appId}.file.myqcloud.com/", // default null, 文件的访问地址host,该项配置只对装修上传图片接口有效
        targetProtocol: "http" // default null , 文件的访问地址协议
      }
    ]
  }
}
```

华为 obs
```js
  upload: {
    enable: true,
    points:[
      { // 具体配置可以参考: https://github.com/dzy321/file-upload
        url: '/api/upload',
        provider: "obs",
        bucket: "****",
        accessKeyId: "****",
        accessKeySecret: "****",
        server: "obs.myhwclouds.com",
        targetHost: "obs.myhwclouds.com", // default null, 文件的访问地址host,该项配置只对装修上传图片接口有效
        targetProtocol: "http" // default null , 文件的访问地址协议
      }
    ]
  }
}
```

微软 azure

```js
  upload: {
    enable: true,
    points:[
      { // 具体配置可以参考: https://github.com/dzy321/file-upload
        url: '/api/upload',
        provider: "azure",
        container: "xxxx",
        account: "xxxx",
        connectionString: "xxxx",
        targetHost: "{account}.blob.core.chinacloudapi.cn", // default null, 文件的访问地址host,该项配置只对装修上传图片接口有效
        targetProtocol: "http" // default null , 文件的访问地址协议
      }
    ]
  }
}
```

文件系统

```js
upload:{
  enable: true,
  points:[
    {
      url: '/api/upload',
      provider: "local",
      folder: "public",
      urlPath: "images"
    }
  ]
}
```

aws

```js
upload:{
  enable: true,
  points:[
    {
      url: '/api/upload',
      provider: "aws",
      endpoint: "http://localhost:801",
      bucket: "****",
      accessKeyId: "****",
      secretAccessKey: "****",
      s3ForcePathStyle: true, // minio support
      signatureVersion: 'v4' // minio support
    }
  ]
}
```

上传返回结果:

```js
{
  '文件1.jpg': '//xxx.aliyuncs.com/ds4h3f5w6kd.jpg'
}
```
