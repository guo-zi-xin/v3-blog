# nest-demo

最小 NestJS demo，演示两类语法：

- 文章接口：`GET /posts`、`GET /posts/:id`、`POST /posts`
- 文件上传：`POST /upload`（multipart 字段名 `file`，5MB 以内）

## 运行

```bash
npm install
npm run start:dev
```

启动后访问 <http://localhost:3000>，上传的文件会保存到 `uploads/` 目录，
并通过 `http://localhost:3000/uploads/xxx.png` 访问。

## 上传示例

```bash
curl -F "file=@你的图片路径" http://localhost:3000/upload
```
