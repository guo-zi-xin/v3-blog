import { defineStore } from 'pinia';
import { getPosts } from '../api/blog';
import type { CategoryStat, Post } from '../types';

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: [] as Post[],
    loading: false,
    loaded: false,
    error: '',
  }),

  getters: {
    sortedPosts(state): Post[] {
      return [...state.posts].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    },

    categories(state): CategoryStat[] {
      const map = new Map<string, number>();
      for (const post of state.posts) {
        map.set(post.category, (map.get(post.category) ?? 0) + 1);
      }
      return [...map.entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
    },

    recentPosts(state): Post[] {
      return [...state.posts]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);
    },
  },

  actions: {
    async fetchPosts(force = false) {
      if ((this.loaded && !force) || this.loading) return;
      this.loading = true;
      this.error = '';
      try {
        const data = await getPosts();
        this.posts = data.list;
        this.loaded = true;
      } catch (err) {
        this.error = (err as Error).message;
      } finally {
        this.loading = false;
      }
    },
  },
});
