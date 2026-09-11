import type { Post, PostListResponse, PostPayload } from '../types';

export const AUTH_TOKEN_KEY = 'blog_admin_token';
const AUTH_NAME_KEY = 'blog_admin_name';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(path, { ...init, headers });

  if (res.status === 401) {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_NAME_KEY);
  }

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

export interface LoginResponse {
  token: string;
  username: string;
}

export function loginRequest(username: string, password: string) {
  return request<LoginResponse>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
}

export function getStoredUsername() {
  return localStorage.getItem(AUTH_NAME_KEY) ?? '';
}
