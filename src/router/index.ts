import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlantDetailView from '../views/PlantDetailView.vue'
import AddPlantView from '../views/AddPlantView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/plant/:id',
      name: 'plant-detail',
      component: PlantDetailView
    },
    {
      path: '/add-plant',
      name: 'add-plant',
      component: AddPlantView
    }
  ]
})

export default router
