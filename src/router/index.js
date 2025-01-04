import ShoppingListDetailView from '@/views/ShoppingListDetailView.vue'
import ShoppingListView from '@/views/ShoppingListView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ShoppingListView',
      component: ShoppingListView,
    },
    {
      path: '/detail/:id',
      name: 'ShoppingListDetailView',
      component: ShoppingListDetailView,
    },
  ],
})

export default router
