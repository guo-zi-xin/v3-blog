import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';

export interface PostItem {
  id: number;
  title: string;
  category: string;
  content: string;
  cover?: string;
  tags?: string[];
  createdAt: string;
}

@Injectable()
export class PostsService {
  private posts: PostItem[] = [
    {
      id: 1,
      title: '欢迎来到我的博客',
      category: '随笔',
      content:
        '这里会记录我的生活碎片和技术思考。\n\n关于代码、旅行、读过的书，还有那些突然想明白的小事，都会慢慢放在这里。\n\n希望这个角落能一直写下去。',
      tags: ['博客', '开始'],
      createdAt: '2026-09-01T10:00:00.000Z',
    },
    {
      id: 2,
      title: '骑行环滇池，风吹过的周末',
      category: '旅行',
      content:
        '周六早上六点半出门，环滇池一圈大概 130 公里。\n\n前半程还有力气拍照，后半程全靠"再骑十公里就吃饭"撑着。日落的时候正好到捞渔河，湖面被染成金色，那一刻觉得一切都值了。\n\n下次想试试分两天慢慢骑。',
      tags: ['云南', '骑行'],
      createdAt: '2026-08-22T13:30:00.000Z',
    },
    {
      id: 3,
      title: '重读《纳瓦尔宝典》，关于"把自己产品化"',
      category: '生活',
      content:
        '书里有一句话最近总在脑子里转：把自己产品化。\n\n产品化意味着要找到自己能做、别人难复制、且有复利的事情。对我来说，写博客本身可能就是这样一件事。\n\n坚持公开写作，短期看不到回报，长期会积累出某种不可替代性。',
      tags: ['读书', '思考'],
      createdAt: '2026-08-10T09:20:00.000Z',
    },
    {
      id: 4,
      title: 'NestJS 初体验：从写 Express 到写"结构"',
      category: '技术',
      content:
        '用 NestJS 写第一个接口时，最大的感受是：你不用再决定代码放哪里了。\n\nModule、Controller、Service 把职责分好，装饰器把路由和校验写清楚，剩下的只是填业务代码。\n\n对习惯 Vue3 的前端来说，全栈用同一门 TypeScript 语言，心智负担小了很多。',
      tags: ['NestJS', '全栈'],
      createdAt: '2026-07-28T15:45:00.000Z',
    },
  ];

  findAll(page: number) {
    const size = 10;
    const start = (page - 1) * size;
    return {
      list: this.posts.slice(start, start + size),
      page,
      total: this.posts.length,
    };
  }

  findOne(id: number) {
    const post = this.posts.find((item) => item.id === id);
    if (!post) {
      throw new NotFoundException(`id 为 ${id} 的文章不存在`);
    }
    return post;
  }

  create(dto: CreatePostDto) {
    const post: PostItem = {
      id: this.posts.length + 1,
      title: dto.title,
      category: dto.category ?? '随笔',
      content: dto.content ?? '',
      cover: dto.cover,
      createdAt: new Date().toISOString(),
    };
    this.posts.unshift(post);
    return post;
  }
}
