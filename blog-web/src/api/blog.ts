import type { Post, PostListResponse } from '../types';

async function request<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) {
    let message = `接口返回 ${res.status}`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {
      // 忽略非 JSON 错误体
    }
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}

export function getPosts(page = 1) {
  return request<PostListResponse>(`/posts?page=${page}`);
}

export function getPost(id: number | string) {
  return request<Post>(`/posts/${id}`);
}
