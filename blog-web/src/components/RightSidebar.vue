<script setup lang="ts">
import { onMounted } from 'vue';
import { useBlogStore } from '../stores/blog';

const store = useBlogStore();

onMounted(() => {
  store.fetchPosts();
});
</script>

<template>
  <aside class="sidebar">
    <div class="side-card about card">
      <img class="avatar" src="/avatar.jpg" alt="我的胃来食" />
      <h3>我的胃来食</h3>
      <p class="sign">前端工程师 · 生活记录者</p>
      <p class="intro">记录技术成长，也收藏沿途的生活碎片。</p>
    </div>

    <div class="side-card card">
      <h4>快速导航</h4>
      <RouterLink :to="{ name: 'home' }" class="quick-link">🏠 首页文章</RouterLink>
      <RouterLink :to="{ name: 'archives' }" class="quick-link">📅 时间归档</RouterLink>
    </div>

    <div class="side-card card">
      <h4>文章分类</h4>
      <template v-if="store.categories.length">
        <RouterLink
          v-for="cat in store.categories"
          :key="cat.name"
          :to="{ name: 'category', params: { name: cat.name } }"
          class="cat-row"
        >
          <span>{{ cat.name }}</span>
          <em>{{ cat.count }}</em>
        </RouterLink>
      </template>
      <p v-else class="side-empty">暂无分类</p>
    </div>

    <div class="side-card card">
      <h4>最新文章</h4>
      <template v-if="store.recentPosts.length">
        <RouterLink
          v-for="post in store.recentPosts"
          :key="post.id"
          :to="{ name: 'article', params: { id: post.id } }"
          class="recent-link"
        >
          {{ post.title }}
        </RouterLink>
      </template>
      <p v-else class="side-empty">暂无文章</p>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  display: grid;
  gap: 18px;
  position: sticky;
  top: 84px;
}

.side-card {
  padding: 18px;
}

.side-card h3,
.side-card h4 {
  margin: 0 0 10px;
}

.side-card h4 {
  font-size: 15px;
  color: var(--text);
}

.about {
  text-align: center;
}

.avatar {
  width: 68px;
  height: 68px;
  margin: 0 auto 10px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  object-fit: cover;
  color: #fff;
  font-size: 28px;
  background: var(--gradient);
  box-shadow: 0 6px 16px rgba(79, 124, 255, 0.35);
}

.sign {
  color: var(--primary);
  font-size: 13px;
  font-weight: 500;
}

.intro {
  color: var(--muted);
  font-size: 13px;
  margin: 0;
}

.quick-link,
.recent-link {
  display: block;
  padding: 8px 4px;
  color: var(--muted);
  font-size: 14px;
  border-bottom: 1px dashed var(--line);
  transition: color 0.2s, padding-left 0.2s;
}

.quick-link:last-child,
.recent-link:last-child {
  border-bottom: 0;
}

.quick-link:hover,
.recent-link:hover {
  color: var(--primary);
  padding-left: 10px;
}

.cat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 2px;
  color: var(--text);
  font-size: 14px;
}

.cat-row em {
  min-width: 26px;
  text-align: center;
  font-style: normal;
  color: var(--primary);
  background: #eef2ff;
  border-radius: 999px;
  font-size: 12px;
  padding: 1px 6px;
}

.side-empty {
  color: var(--muted);
  font-size: 13px;
  margin: 0;
}

@media (max-width: 900px) {
  .sidebar {
    position: static;
    order: 2;
  }
}
</style>
