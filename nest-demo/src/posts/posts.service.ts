import { Injectable, NotFoundException } from '@nestjs/common';
import { Post as PrismaPost } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';

export interface PostItem {
  id: number;
  title: string;
  category: string;
  content: string;
  cover?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  private toPostItem(post: PrismaPost): PostItem {
    return {
      id: post.id,
      title: post.title,
      category: post.category,
      content: post.content,
      cover: post.cover ?? undefined,
      tags: this.parseTags(post.tags),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
  }

  private parseTags(raw: string): string[] {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as string[]) : [];
    } catch {
      return [];
    }
  }

  async findAll(page = 1) {
    const size = 10;
    const [total, list] = await this.prisma.$transaction([
      this.prisma.post.count(),
      this.prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * size,
        take: size,
      }),
    ]);

    return {
      list: list.map((post) => this.toPostItem(post)),
      page,
      total,
    };
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException(`id 为 ${id} 的帖子不存在`);
    }
    return this.toPostItem(post);
  }

  async create(dto: CreatePostDto) {
    const post = await this.prisma.post.create({
      data: {
        title: dto.title,
        category: dto.category ?? '随笔',
        content: dto.content ?? '',
        cover: dto.cover,
        tags: JSON.stringify(dto.tags ?? []),
      },
    });
    return this.toPostItem(post);
  }

  async update(id: number, dto: UpdatePostDto) {
    await this.findOne(id);

    const post = await this.prisma.post.update({
      where: { id },
      data: {
        title: dto.title,
        category: dto.category,
        content: dto.content,
        cover: dto.cover,
        tags: dto.tags ? JSON.stringify(dto.tags) : undefined,
      },
    });
    return this.toPostItem(post);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.post.delete({ where: { id } });
    return { id, deleted: true };
  }
}
