import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/day7/TabsPage.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tasks'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tasks'
      },
      {
        path: 'tasks',
        component: () => import('../views/day7/TasksPage.vue')
      },
      {
        path: 'tasks/:id',
        component: () => import('../views/day7/TaskDetailPage.vue')
      },
      {
        path: 'completed',
        component: () => import('../views/day7/CompletedPage.vue')
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router