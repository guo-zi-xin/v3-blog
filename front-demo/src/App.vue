<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Post {
  id: number;
  title: string;
  category: string;
  content: string;
  cover?: string;
  createdAt: string;
}

const posts = ref<Post[]>([]);
const loading = ref(false);
const errorMsg = ref('');
const successMsg = ref('');

const selected = ref<Post | null>(null);
const uploading = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

const form = ref({
  title: '',
  category: '随笔',
  content: '',
  cover: '',
});

function showError(message: string) {
  errorMsg.value = message;
  successMsg.value = '';
}

function showSuccess(message: string) {
  successMsg.value = message;
  errorMsg.value = '';
}

async function loadPosts() {
  loading.value = true;
  errorMsg.value = '';
  try {
    const res = await fetch('/posts');
    if (!res.ok) throw new Error(`接口返回 ${res.status}`);
    const data = await res.json();
    posts.value = data.list;
    selected.value = posts.value[0] ?? null;
  } catch (err) {
    showError(`加载文章失败，请确认 nest-demo 后端已启动：${(err as Error).message}`);
  } finally {
    loading.value = false;
  }
}

function openPost(post: Post) {
  selected.value = post;
}

async function uploadCover(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  const body = new FormData();
  body.append('file', file);

  uploading.value = true;
  errorMsg.value = '';
  try {
    const res = await fetch('/upload', { method: 'POST', body });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message ?? '上传失败');
    form.value.cover = data.url;
    showSuccess('封面上传成功，记得提交文章才会保存');
  } catch (err) {
    showError(`上传失败：${(err as Error).message}`);
  } finally {
    uploading.value = false;
    if (fileInput.value) fileInput.value.value = '';
  }
}

async function createPost() {
  if (!form.value.title.trim()) {
    showError('标题不能为空');
    return;
  }

  errorMsg.value = '';
  try {
    const res = await fetch('/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message ?? '发布失败');

    posts.value.unshift(data);
    selected.value = data;
    form.value = { title: '', category: '随笔', content: '', cover: '' };
    showSuccess(`文章「${data.title}」发布成功`);
  } catch (err) {
    showError(`发布失败：${(err as Error).message}`);
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('zh-CN');
}

onMounted(loadPosts);
</script>

<template>
  <div class="page">
    <header>
      <h1>我的生活博客</h1>
      <p class="sub">Vue3 前端 demo —— 数据来自本机 NestJS 后端</p>
    </header>

    <div v-if="errorMsg" class="banner error">{{ errorMsg }}</div>
    <div v-if="successMsg" class="banner success">{{ successMsg }}</div>

    <div class="columns">
      <section class="panel">
        <h2>文章列表</h2>
        <p v-if="loading">加载中…</p>
        <ul v-else class="post-list">
          <li
            v-for="post in posts"
            :key="post.id"
            :class="{ active: selected?.id === post.id }"
            @click="openPost(post)"
          >
            <span class="tag">{{ post.category }}</span>
            {{ post.title }}
          </li>
        </ul>
        <p v-if="!loading && posts.length === 0" class="empty">还没有文章</p>
      </section>

      <section v-if="selected" class="panel">
        <h2>{{ selected.title }}</h2>
        <p class="meta">{{ selected.category }} · {{ formatDate(selected.createdAt) }}</p>
        <img
          v-if="selected.cover"
          :src="selected.cover"
          class="cover"
          alt="文章封面"
        />
        <p class="content">{{ selected.content }}</p>
      </section>
    </div>

    <section class="panel write">
      <h2>写一篇新的随笔</h2>
      <form @submit.prevent="createPost">
        <label>
          标题
          <input v-model="form.title" placeholder="今天想记录什么？" />
        </label>

        <label>
          分类
          <select v-model="form.category">
            <option>随笔</option>
            <option>生活</option>
            <option>旅行</option>
          </select>
        </label>

        <label>
          封面
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            :disabled="uploading"
            @change="uploadCover"
          />
          <img v-if="form.cover" :src="form.cover" class="cover small" alt="新封面预览" />
        </label>

        <label>
          内容
          <textarea v-model="form.content" rows="4" placeholder="写点什么…" />
        </label>

        <button type="submit" :disabled="loading || uploading">发布</button>
      </form>
    </section>
  </div>
</template>

<style>
* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: #f5f6f8;
  color: #24292f;
}

.page { max-width: 1080px; margin: 0 auto; padding: 24px 16px 60px; }
header { margin-bottom: 20px; }
h1 { margin: 0; font-size: 28px; }
.sub { margin: 6px 0 0; color: #6b7280; }

.banner { padding: 10px 14px; border-radius: 8px; margin-bottom: 14px; }
.banner.error { background: #fdecea; color: #b42318; }
.banner.success { background: #e7f6ec; color: #067647; }

.columns { display: grid; grid-template-columns: 280px 1fr; gap: 16px; margin-bottom: 16px; }

.panel {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 18px;
}
.panel h2 { margin: 0 0 12px; font-size: 18px; }

.post-list { list-style: none; margin: 0; padding: 0; }
.post-list li {
  padding: 10px 8px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  gap: 8px;
  align-items: baseline;
}
.post-list li:hover { background: #f3f4f6; }
.post-list li.active { background: #e0f2fe; }
.tag {
  flex: none;
  font-size: 12px;
  background: #eef2ff;
  color: #4338ca;
  border-radius: 999px;
  padding: 2px 8px;
}
.meta { color: #6b7280; font-size: 13px; }
.cover { width: 100%; max-height: 260px; object-fit: cover; border-radius: 8px; }
.cover.small { max-height: 120px; margin-top: 8px; }
.content { white-space: pre-wrap; line-height: 1.8; }
.empty { color: #9ca3af; }

.write form { display: grid; gap: 12px; }
label { display: grid; gap: 6px; font-size: 14px; color: #374151; }
input, select, textarea {
  padding: 8px 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font: inherit;
}
button {
  justify-self: start;
  padding: 8px 22px;
  border: 0;
  border-radius: 6px;
  background: #2563eb;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}
button:hover { background: #1d4ed8; }
button:disabled { opacity: 0.6; cursor: not-allowed; }

@media (max-width: 800px) {
  .columns { grid-template-columns: 1fr; }
}
</style>
