export interface Post {
  id: number;
  title: string;
  category: string;
  content: string;
  cover?: string;
  tags?: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface PostPayload {
  title: string;
  category: string;
  content: string;
  cover?: string;
  tags?: string[];
}

export interface PostListResponse {
  list: Post[];
  page: number;
  total: number;
}

export interface CategoryStat {
  name: string;
  count: number;
}
