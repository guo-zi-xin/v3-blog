<template>
  <div class="container not-found card">
    <p class="code">404</p>
    <h1>页面迷路了</h1>
    <p>你要找的内容不存在，或者已经被移动。</p>
    <RouterLink :to="{ name: 'home' }" class="btn">回到首页</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  margin-top: 80px;
  margin-bottom: 80px;
  padding: 70px 20px;
  text-align: center;
}

.code {
  font-size: 72px;
  margin: 0;
  font-weight: 800;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.btn {
  display: inline-block;
  padding: 10px 26px;
  margin-top: 12px;
  border-radius: 999px;
  color: #fff;
  background: var(--primary);
}
</style>
