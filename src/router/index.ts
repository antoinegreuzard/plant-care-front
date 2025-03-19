import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PlantDetailView from '@/views/PlantDetailView.vue'
import AddPlantView from '@/views/AddPlantView.vue'
import LoginView from '@/views/LoginView.vue'
import PlantPhotoGallery from '@/components/PlantPhotoGallery.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/plant/:id',
      name: 'plant-detail',
      component: PlantDetailView,
      meta: { requiresAuth: true },
    },
    {
      path: '/add-plant',
      name: 'add-plant',
      component: AddPlantView,
      meta: { requiresAuth: true },
    },
    {
      path: '/plant/:id/photos',
      name: 'plant-photos',
      component: PlantPhotoGallery,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('jwt')) {
    next('/login')
  } else {
    next()
  }
})

export default router
