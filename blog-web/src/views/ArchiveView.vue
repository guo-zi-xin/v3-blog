<script setup lang="ts">
import { computed, onMounted } from 'vue';
import RightSidebar from '../components/RightSidebar.vue';
import { useBlogStore } from '../stores/blog';

const store = useBlogStore();

onMounted(() => {
  store.fetchPosts();
});

const groups = computed(() => {
  const map = new Map<string, typeof store.posts>();
  for (const post of store.sortedPosts) {
    const d = new Date(post.createdAt);
    const key = `${d.getFullYear()}年${d.getMonth() + 1}月`;
    const list = map.get(key) ?? [];
    list.push(post);
    map.set(key, list);
  }
  return [...map.entries()];
});

function dayOf(iso: string) {
  return new Date(iso).getDate();
}
</script>

<template>
  <div class="container layout-grid archive-page">
    <section class="archive card">
      <h2 class="section-title">文章归档</h2>

      <div v-if="store.loading" class="empty-tip">归档加载中…</div>
      <div v-else-if="store.error" class="error-tip">{{ store.error }}</div>

      <div v-else-if="groups.length" class="timeline">
        <div v-for="[month, list] in groups" :key="month" class="month-group">
          <div class="month-head">{{ month }} · {{ list.length }} 篇</div>
          <RouterLink
            v-for="post in list"
            :key="post.id"
            :to="{ name: 'article', params: { id: post.id } }"
            class="timeline-item"
          >
            <span class="dot" />
            <span class="day">{{ dayOf(post.createdAt) }}日</span>
            <span class="title">{{ post.title }}</span>
            <span class="category">{{ post.category }}</span>
          </RouterLink>
        </div>
      </div>

      <div v-else class="empty-tip">还没有文章可归档</div>
    </section>

    <RightSidebar />
  </div>
</template>

<style scoped>
.archive {
  padding: 30px 34px;
  min-width: 0;
}

.timeline {
  padding-left: 8px;
}

.month-group {
  margin-bottom: 26px;
}

.month-head {
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 8px;
}

.timeline-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 0 9px 24px;
  color: var(--text);
  border-bottom: 1px dashed var(--line);
}

.timeline-item:hover .title {
  color: var(--primary);
}

.dot {
  position: absolute;
  left: 0;
  top: 50%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary);
  transform: translateY(-50%);
}

.day {
  width: 44px;
  flex: none;
  color: var(--muted);
  font-size: 13px;
}

.title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.category {
  flex: none;
  padding: 1px 10px;
  border-radius: 999px;
  color: var(--primary);
  background: #eef2ff;
  font-size: 12px;
}
</style>
