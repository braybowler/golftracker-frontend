import { describe, expect, test, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import GTBottomBar from '@/components/GTBottomBar.vue'
import { createTestingPinia } from '@pinia/testing'
import GTNavLink from '@/components/GTNavLink.vue'
import { useAuth } from '@/stores/auth/auth'

describe('GTBottomBar', () => {
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
    const wrapper = shallowMount(GTBottomBar, defaultMountOptions)

    expect(wrapper.exists()).toBe(true)
  })

  test('Component does render when there is an authorized user', () => {
    const auth = useAuth()
    auth.isAuthed = true
    const wrapper = shallowMount(GTBottomBar, defaultMountOptions)

    expect(wrapper.findComponent(GTNavLink).exists()).toBe(true)
  })

  test('Component does not render when there is not an authorized user', () => {
    const auth = useAuth()
    auth.isAuthed = false
    const wrapper = shallowMount(GTBottomBar, defaultMountOptions)

    expect(wrapper.findComponent(GTNavLink).exists()).toBe(false)
  })
})
