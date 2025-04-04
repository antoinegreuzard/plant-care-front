export interface Plant {
  id: number
  name: string
  variety?: string | null
  plant_type: string
  description?: string | null
  purchase_date?: string | null
  location?: string | null
  watering_frequency: number
  fertilizing_frequency: number
  repotting_frequency: number
  pruning_frequency: number
  last_watering?: string | null
  last_fertilizing?: string | null
  last_repotting?: string | null
  last_pruning?: string | null
  sunlight_level: 'low' | 'medium' | 'high'
  temperature?: number | null
  humidity_level: 'low' | 'medium' | 'high'
  created_at: string
  next_watering?: string | null
  next_fertilizing?: string | null
  next_repotting?: string | null
  next_pruning?: string | null
  advice?: string[]
  image?: string
}

export interface Photo {
  id: number
  image: string
  caption?: string | null
  uploaded_at: string
  plant: number
}
