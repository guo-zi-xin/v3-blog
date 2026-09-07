# 我的胃来食的生活志

个人生活博客全栈项目

## 目录

| 目录 | 说明 | 技术栈 |
| --- | --- | --- |
| `blog-web` | 博客前台 | Vue 3 + Vite + TypeScript + Vue Router + Pinia |
| `nest-demo` | 后端服务 demo | NestJS + TypeScript（文章接口、文件上传） |
| `front-demo` | 早期联调演示前端 | Vue 3 + Vite（保留参考） |

## 本地运行

先启动后端：

```bash
cd nest-demo
npm install
npm run start:dev
```

再启动前台：

```bash
cd blog-web
npm install
npm run dev
```

打开 <http://localhost:5173> 即可浏览；上传文件保存在 `nest-demo/uploads/`。

## 说明

当前数据保存在后端内存中，重启会恢复为示例文章；后续将接入 PostgreSQL + Prisma 持久化。
