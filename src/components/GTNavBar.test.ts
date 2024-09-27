import { describe, expect, test, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import GTNavBar from '@/components/GTNavBar.vue'
import { createTestingPinia } from '@pinia/testing'
import GTNavLink from '@/components/GTNavLink.vue'
import GTDropDownMenu from '@/components/GTDropDownMenu.vue'
import { useAuth } from '@/stores/auth/auth'

describe('GTNavBar', () => {
  const defaultMountOptions = {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn
        })
      ]
    }
  }

  test('Component can render', () => {
    const wrapper = shallowMount(GTNavBar, defaultMountOptions)

    expect(wrapper.exists()).toBe(true)
  })

  test('Component renders the guest view if the user is not authenticated', () => {
    const auth = useAuth()
    auth.isAuthed = false

    const wrapper = shallowMount(GTNavBar, defaultMountOptions)

    expect(wrapper.findComponent(GTNavLink).exists()).toBe(true)
    expect(wrapper.findComponent(GTDropDownMenu).exists()).toBe(false)
  })

  test('Component renders the user view if the user is authenticated', async () => {
    const auth = useAuth()
    auth.isAuthed = true

    const wrapper = shallowMount(GTNavBar, defaultMountOptions)

    expect(wrapper.findComponent(GTNavLink).exists()).toBe(false)
    expect(wrapper.findComponent(GTDropDownMenu).exists()).toBe(true)
  })
})
