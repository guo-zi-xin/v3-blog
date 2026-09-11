import { createRouter, createWebHashHistory } from 'vue-router';
import BlogLayout from '../layouts/BlogLayout.vue';

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: BlogLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: 'article/:id',
          name: 'article',
          component: () => import('../views/ArticleView.vue'),
        },
        {
          path: 'archives',
          name: 'archives',
          component: () => import('../views/ArchiveView.vue'),
        },
        {
          path: 'category/:name',
          name: 'category',
          component: () => import('../views/CategoryView.vue'),
        },
        {
          path: 'write',
          name: 'write',
          component: () => import('../views/WriteView.vue'),
        },
        {
          path: '404',
          name: 'not-found',
          component: () => import('../views/NotFoundView.vue'),
        },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: { name: 'not-found' } },
  ],
});

export default router;
