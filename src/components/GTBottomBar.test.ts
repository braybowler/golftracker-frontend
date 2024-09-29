import { describe, expect, test, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import GTBottomBar from '@/components/GTBottomBar.vue'
import { createTestingPinia } from '@pinia/testing'
import GTNavLink from '@/components/GTNavLink.vue'

describe('GTBottomBar', () => {
  const defaultMountOptions = {
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            auth: {
              user: {}
            }
          },
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
    const authenticatedMountOptions = {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              auth: {
                user: {
                  name: 'Test User'
                }
              }
            },
            createSpy: vi.fn
          })
        ]
      }
    }
    const wrapper = shallowMount(GTBottomBar, authenticatedMountOptions)

    expect(wrapper.findComponent(GTNavLink).exists()).toBe(true)
  })

  test('Component does not render when there is not an authorized user', () => {
    const wrapper = shallowMount(GTBottomBar, defaultMountOptions)

    expect(wrapper.findComponent(GTNavLink).exists()).toBe(false)
  })
})
