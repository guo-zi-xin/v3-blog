import type { Post, PostListResponse, PostPayload } from '../types';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, init);
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

function jsonInit(method: string, payload: PostPayload): RequestInit {
  return {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };
}

export function createPost(payload: PostPayload) {
  return request<Post>('/posts', jsonInit('POST', payload));
}

export function updatePost(id: number, payload: PostPayload) {
  return request<Post>(`/posts/${id}`, jsonInit('PATCH', payload));
}

export function deletePost(id: number) {
  return request<{ id: number; deleted: boolean }>(`/posts/${id}`, {
    method: 'DELETE',
  });
}
