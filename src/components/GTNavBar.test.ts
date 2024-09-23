import { beforeEach, describe, expect, test, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { shallowMount } from '@vue/test-utils'
import GTNavBar from '@/components/GTNavBar.vue'

vi.mock('@/stores/auth/auth', async () => {
  const actual = await vi.importActual('@/stores/auth/auth')
  const mockIsAuthed = vi.fn()

  return {
    ...actual,
    useAuth: ()=> {
      return {isAuthed: mockIsAuthed}
    }
  }
})

describe('GTNavBar', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('Component can render', () => {
    const wrapper = shallowMount(GTNavBar)

    expect(wrapper.exists()).toBe(true)
  })

  test('Component renders the guest view if the user is not authenticated', () => {
    const wrapper = shallowMount(GTNavBar)
    expect(wrapper.vm.auth.isAuthed).toBeFalsy

    expect(wrapper.html()).toContain('<g-t-nav-link-stub url="/" class="hover:text-white"></g-t-nav-link-stub>')
  })

  test('Component renders the user view if the user is authenticated', async () => {
    const wrapper = shallowMount(GTNavBar)
    expect(wrapper.vm.auth.isAuthed).toBeTruthy

    expect(wrapper.html()).toContain('<g-t-drop-down-menu-stub></g-t-drop-down-menu-stub>')
  })
})