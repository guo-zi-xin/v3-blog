# 我的胃来食的生活志

个人生活博客全栈项目，参考 vue3-blog（mrzym99/vue3-blog）的页面形式实现。

## 目录

| 目录 | 说明 | 技术栈 |
| --- | --- | --- |
| `blog-web` | 博客前台 | Vue 3 + Vite + TypeScript + Vue Router + Pinia |
| `nest-demo` | 后端服务 | NestJS + TypeScript + Prisma + SQLite（帖子增删改、文件上传） |
| `front-demo` | 早期联调演示前端 | Vue 3 + Vite（保留参考） |

## 本地运行

先启动后端：

```bash
cd nest-demo
npm install

# 首次运行：建表 + 写入示例帖子（之后不需要重复执行）
npm run db:push
npm run db:seed

npm run start:dev
```

再启动前台：

```bash
cd blog-web
npm install
npm run dev
```

打开 <http://localhost:5173> 即可浏览，`/#/write` 是简易写笔记页面；
上传的图片保存在 `nest-demo/uploads/`。

## 更新笔记

帖子保存在本地 SQLite 数据库 `nest-demo/prisma/dev.db`（已在 .gitignore 中排除），
重启服务不会丢失。日常更新有两种方式：

1. 打开 <http://localhost:5173/#/write>，在页面上新增、编辑、删除笔记；
2. 直接调用接口：`POST /posts` 新增，`PATCH /posts/:id` 修改，`DELETE /posts/:id` 删除。

注意：写笔记页面当前没有登录校验，仅适合本地使用；上线前必须补上后台鉴权。

## 说明

数据库当前使用 SQLite（免费、零配置）；后续上线可切换到 PostgreSQL，Prisma 代码基本不用改。
