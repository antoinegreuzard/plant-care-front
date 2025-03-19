export interface Plant {
  id: number
  name: string
  plant_type: string
  description?: string
  image?: string
  lastWatered?: string
  last_watering?: string
}

export interface Photo {
  id: number
  image_url: string
  uploaded_at: string
}
