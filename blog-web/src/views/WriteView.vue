<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { createPost, deletePost, updatePost } from '../api/blog';
import { useBlogStore } from '../stores/blog';
import type { Post, PostPayload } from '../types';

const store = useBlogStore();

const editingId = ref<number | null>(null);
const saving = ref(false);
const uploading = ref(false);
const errorMsg = ref('');
const successMsg = ref('');
const fileInput = ref<HTMLInputElement | null>(null);

const form = ref({
  title: '',
  category: '随笔',
  content: '',
  cover: '',
  tagsText: '',
});

const isEditing = computed(() => editingId.value !== null);

onMounted(() => {
  store.fetchPosts();
});

function resetForm() {
  editingId.value = null;
  form.value = { title: '', category: '随笔', content: '', cover: '', tagsText: '' };
  if (fileInput.value) fileInput.value.value = '';
}

function startEdit(post: Post) {
  editingId.value = post.id;
  form.value = {
    title: post.title,
    category: post.category,
    content: post.content,
    cover: post.cover ?? '',
    tagsText: (post.tags ?? []).join(', '),
  };
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function parseTags(text: string): string[] {
  return text
    .split(/[,，]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
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
    successMsg.value = '封面已上传';
  } catch (err) {
    errorMsg.value = `上传失败：${(err as Error).message}`;
  } finally {
    uploading.value = false;
  }
}

async function save() {
  if (!form.value.title.trim()) {
    errorMsg.value = '标题不能为空';
    successMsg.value = '';
    return;
  }

  const payload: PostPayload = {
    title: form.value.title.trim(),
    category: form.value.category,
    content: form.value.content,
    cover: form.value.cover || undefined,
    tags: parseTags(form.value.tagsText),
  };

  saving.value = true;
  errorMsg.value = '';
  try {
    if (editingId.value !== null) {
      await updatePost(editingId.value, payload);
      successMsg.value = '笔记已更新';
    } else {
      await createPost(payload);
      successMsg.value = '笔记已发布';
    }
    const wasEditing = isEditing.value;
    resetForm();
    await store.fetchPosts(true);
    if (!wasEditing) successMsg.value = '笔记已发布';
  } catch (err) {
    errorMsg.value = `保存失败：${(err as Error).message}`;
  } finally {
    saving.value = false;
  }
}

async function removeNote(post: Post) {
  if (!window.confirm(`确定删除《${post.title}》吗？`)) return;

  errorMsg.value = '';
  try {
    await deletePost(post.id);
    if (editingId.value === post.id) resetForm();
    await store.fetchPosts(true);
    successMsg.value = '笔记已删除';
  } catch (err) {
    errorMsg.value = `删除失败：${(err as Error).message}`;
  }
}
</script>

<template>
  <div class="container write-page">
    <div class="notice">
      ⚠️ 这是本地写笔记页，暂未加登录校验，上线前必须加权限（否则任何人都能改文章）。
    </div>

    <div v-if="errorMsg" class="banner error">{{ errorMsg }}</div>
    <div v-if="successMsg" class="banner success">{{ successMsg }}</div>

    <div class="write-layout">
      <section class="card editor">
        <h2 class="section-title">{{ isEditing ? '编辑笔记' : '写一篇新笔记' }}</h2>

        <label>
          标题
          <input v-model="form.title" placeholder="标题" />
        </label>

        <div class="row">
          <label>
            分类
            <select v-model="form.category">
              <option>随笔</option>
              <option>生活</option>
              <option>旅行</option>
              <option>技术</option>
            </select>
          </label>
          <label>
            标签（逗号分隔）
            <input v-model="form.tagsText" placeholder="生活, 记录" />
          </label>
        </div>

        <label>
          封面
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            :disabled="uploading"
            @change="uploadCover"
          />
        </label>
        <div v-if="form.cover" class="cover-preview">
          <img :src="form.cover" alt="封面预览" />
          <button type="button" class="link-btn" @click="form.cover = ''">移除封面</button>
        </div>

        <label>
          正文
          <textarea v-model="form.content" rows="14" placeholder="记录点什么…" />
        </label>

        <div class="actions">
          <button type="button" class="primary" :disabled="saving || uploading" @click="save">
            {{ saving ? '保存中…' : isEditing ? '保存修改' : '发布笔记' }}
          </button>
          <button v-if="isEditing" type="button" class="ghost" @click="resetForm">
            取消编辑
          </button>
        </div>
      </section>

      <section class="card list">
        <h2 class="section-title">已有笔记（{{ store.posts.length }}）</h2>

        <p v-if="store.loading" class="muted">加载中…</p>
        <p v-else-if="!store.posts.length" class="muted">还没有笔记</p>

        <ul v-else>
          <li v-for="post in store.sortedPosts" :key="post.id">
            <div class="info">
              <span class="title">{{ post.title }}</span>
              <span class="meta">{{ post.category }} · {{ new Date(post.createdAt).toLocaleDateString('zh-CN') }}</span>
            </div>
            <div class="ops">
              <button type="button" class="link-btn" @click="startEdit(post)">编辑</button>
              <button type="button" class="link-btn danger" @click="removeNote(post)">删除</button>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.write-page {
  padding: 26px 0 70px;
}

.notice {
  margin-bottom: 16px;
  padding: 10px 14px;
  border: 1px solid #ffe2b8;
  border-radius: 10px;
  background: #fff8ec;
  color: #9a6700;
  font-size: 13px;
}

.banner {
  padding: 10px 14px;
  border-radius: 8px;
  margin-bottom: 14px;
}

.banner.error {
  background: #fdecea;
  color: #b42318;
}

.banner.success {
  background: #e7f6ec;
  color: #067647;
}

.write-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 20px;
  align-items: start;
}

.editor,
.list {
  padding: 22px 24px;
}

.editor {
  display: grid;
  gap: 14px;
}

.row {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 14px;
}

label {
  display: grid;
  gap: 6px;
  font-size: 14px;
  color: #374151;
}

input,
select,
textarea {
  padding: 9px 11px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font: inherit;
  background: #fff;
}

textarea {
  resize: vertical;
  line-height: 1.8;
}

.cover-preview img {
  max-width: 240px;
  border-radius: 10px;
  display: block;
  margin-bottom: 6px;
}

.actions {
  display: flex;
  gap: 12px;
}

button.primary {
  padding: 10px 26px;
  border: 0;
  border-radius: 8px;
  background: var(--primary);
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

button.primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button.ghost {
  padding: 10px 20px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
}

.list ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 4px;
  border-bottom: 1px dashed var(--line);
}

.info {
  min-width: 0;
}

.title {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.meta {
  color: var(--muted);
  font-size: 12px;
}

.ops {
  flex: none;
  display: flex;
  gap: 8px;
}

.link-btn {
  border: 0;
  background: transparent;
  color: var(--primary);
  cursor: pointer;
  font-size: 13px;
  padding: 2px 4px;
}

.link-btn.danger {
  color: #d92d20;
}

.muted {
  color: var(--muted);
}

@media (max-width: 900px) {
  .write-layout {
    grid-template-columns: 1fr;
  }
}
</style>
