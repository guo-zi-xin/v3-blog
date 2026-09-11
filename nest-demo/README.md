# nest-demo

NestJS 后端：帖子增删改查 + 文件上传，数据持久化在本地 SQLite。

## 运行

```bash
npm install

# 首次运行
npm run db:push
npm run db:seed

npm run start:dev
```

接口：

- `GET /posts`、`GET /posts/:id` 读取帖子
- `POST /posts` 新增，`PATCH /posts/:id` 修改，`DELETE /posts/:id` 删除
- `POST /upload` 上传文件（multipart 字段名 `file`，5MB 以内）

启动后访问 <http://localhost:3000>，上传的文件会保存到 `uploads/` 目录，
并通过 `http://localhost:3000/uploads/xxx.png` 访问。

数据库文件在 `prisma/dev.db`，已被 .gitignore 排除；重启服务数据不会丢失。

## 上传示例

```bash
curl -F "file=@你的图片路径" http://localhost:3000/upload
```
