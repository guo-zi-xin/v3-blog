<script setup lang="ts">
import { computed } from 'vue';
import type { Post } from '../types';

const props = defineProps<{ post: Post }>();

const excerpt = computed(() => {
  const plain = props.post.content.replace(/[\r\n]+/g, ' ').trim();
  return plain.length > 140 ? `${plain.slice(0, 140)}…` : plain;
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
</script>

<template>
  <RouterLink
    :to="{ name: 'article', params: { id: post.id } }"
    class="article-card card"
  >
    <div class="meta">
      <span class="category">{{ post.category }}</span>
      <span class="date">{{ formatDate(post.createdAt) }}</span>
    </div>

    <h3 class="title">{{ post.title }}</h3>
    <p class="excerpt">{{ excerpt }}</p>

    <div v-if="post.cover" class="cover-wrap">
      <img :src="post.cover" :alt="post.title" loading="lazy" />
    </div>

    <div v-if="post.tags?.length" class="tags">
      <span v-for="tag in post.tags" :key="tag" class="tag"># {{ tag }}</span>
    </div>

    <span class="read-more">阅读全文 →</span>
  </RouterLink>
</template>

<style scoped>
.article-card {
  display: block;
  padding: 22px 24px;
  margin-bottom: 18px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.article-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-hover);
}

.meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.category {
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  color: var(--primary);
  background: #eef2ff;
}

.date {
  color: var(--muted);
  font-size: 13px;
}

.title {
  margin: 0 0 8px;
  font-size: 20px;
  color: var(--text);
}

.article-card:hover .title {
  color: var(--primary);
}

.excerpt {
  margin: 0 0 12px;
  color: var(--muted);
  font-size: 14px;
}

.cover-wrap {
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
  max-height: 220px;
}

.cover-wrap img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.tag {
  font-size: 12px;
  color: var(--muted);
}

.read-more {
  font-size: 14px;
  color: var(--primary);
  font-weight: 500;
}
</style>
