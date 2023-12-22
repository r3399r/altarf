import { createRouter, createWebHistory } from 'vue-router';
import TarotView from '../views/TarotView.vue';
import TarotDetailView from '../views/TarotDetailView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tarot',
      name: 'tarot',
      component: TarotView,
    },
    {
      path: '/tarot/:id',
      name: 'tarot-detail',
      component: TarotDetailView,
    },
    {
      path: '/daily',
      name: 'daily',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DailyView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/tarot',
    },
  ],
});

export default router;
