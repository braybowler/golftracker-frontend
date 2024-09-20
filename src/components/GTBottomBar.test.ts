import { beforeEach, describe, expect, type Mock, test, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import GTBottomBar from '@/components/GTBottomBar.vue'
import { createPinia, setActivePinia } from 'pinia'

vi.mock('@/stores/auth/auth', async () => {
  const actual = await vi.importActual('@/stores/auth/auth')
  const mockIsAuthed = vi.fn()
    .mockImplementationOnce(() => { return true })
    .mockImplementationOnce(() => { return false })

  return {
    ...actual,
    useAuth: ()=> {
      return {isAuthed: mockIsAuthed}
    }
  }
})

describe('GTBottomBar', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('Component can render', () => {
    const wrapper = shallowMount(GTBottomBar)

    expect(wrapper.exists()).toBe(true)
  })

  test('Component does render when there is an authorized user', () => {
    const wrapper = shallowMount(GTBottomBar)

    expect(wrapper.html()).toContain('<nav class="bg-primary w-screen">')
  })

  test('Component does not render when there is not an authorized user', () => {
    const wrapper = shallowMount(GTBottomBar)

    expect(wrapper.html()).toContain('')
  })
})