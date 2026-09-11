<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    transparent?: boolean;
  }>(),
  { transparent: false },
);

const navItems = [
  { label: '首页', to: { name: 'home' } },
  { label: '归档', to: { name: 'archives' } },
  { label: '写笔记', to: { name: 'write' } },
];

const scrolled = ref(false);

function handleScroll() {
  scrolled.value = window.scrollY > 8;
}

const rootClass = computed(() => ({
  overlay: props.transparent,
  solid: scrolled.value,
}));

onMounted(() => {
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header class="app-header" :class="rootClass">
    <div class="container header-inner">
      <RouterLink to="/" class="logo">
        <img class="logo-badge" src="/avatar.jpg" alt="我的胃来食" />
        <span class="logo-text">我的胃来食的生活志</span>
      </RouterLink>

      <nav class="nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          class="nav-link"
          active-class="active"
          :exact-active-class="item.to?.name === 'home' ? 'active' : ''"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(231, 234, 242, 0.8);
  transition: background 0.25s, border-color 0.25s, box-shadow 0.25s;
}

.app-header.solid {
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 4px 18px rgba(31, 45, 91, 0.05);
}

.app-header.overlay {
  background: transparent;
  border-bottom-color: transparent;
}

.app-header.overlay:not(.solid) .logo-text,
.app-header.overlay:not(.solid) .nav-link {
  color: #fff;
}

.app-header.overlay:not(.solid) .nav-link:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.18);
}

.app-header.overlay:not(.solid) .nav-link.active {
  color: #fff;
  background: rgba(255, 255, 255, 0.24);
}

.header-inner {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 18px;
}

.logo-badge {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  background: var(--gradient);
  object-fit: cover;
}

.nav {
  display: flex;
  gap: 6px;
}

.nav-link {
  padding: 8px 16px;
  border-radius: 999px;
  color: var(--muted);
  transition: all 0.2s;
}

.nav-link:hover {
  color: var(--primary);
  background: #eef2ff;
}

.nav-link.active {
  color: var(--primary);
  background: #e8eefd;
  font-weight: 600;
}
</style>
