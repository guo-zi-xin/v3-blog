<template>
  <footer class="app-footer">
    <div class="container">
      <p>© {{ new Date().getFullYear() }} 我的胃来食的生活志 · 用代码记录生活</p>
      <p class="powered">Vue3 + NestJS · 由热爱驱动</p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  border-top: 1px solid var(--line);
  background: #fff;
  color: var(--muted);
  text-align: center;
  padding: 22px 0;
  font-size: 13px;
}

.app-footer p {
  margin: 0 0 4px;
}
</style>
