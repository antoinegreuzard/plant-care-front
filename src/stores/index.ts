import { defineStore } from 'pinia'

export const usePlantStore = defineStore('plantStore', {
  state: () => ({
    plants: [] as Array<{ id: number; name: string }>,
  }),
  actions: {
    addPlant(name: string) {
      this.plants.push({ id: this.plants.length + 1, name })
    },
  },
})
