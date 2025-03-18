import { mount } from '@vue/test-utils'
import PlantCard from '../../src/components/PlantCard.vue'
import { describe, test, expect, vi } from 'vitest'

vi.mock('vue-router', () => ({
  RouterLink: { template: '<div><slot/></div>' }
}))

describe('PlantCard', () => {
  test('Affiche le nom et la description de la plante', () => {
    const plant = { id: 1, name: 'Monstera', description: 'Plante tropicale' }
    const wrapper = mount(PlantCard, { props: { plant } })

    expect(wrapper.text()).toContain('Monstera')
    expect(wrapper.text()).toContain('Plante tropicale')
  })
})
