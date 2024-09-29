import { describe, expect, test, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import GTNavBar from '@/components/GTNavBar.vue'
import { createTestingPinia } from '@pinia/testing'
import GTNavLink from '@/components/GTNavLink.vue'
import GTDropDownMenu from '@/components/GTDropDownMenu.vue'

describe('GTNavBar', () => {
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
    const wrapper = shallowMount(GTNavBar, defaultMountOptions)

    expect(wrapper.exists()).toBe(true)
  })

  test('Component renders the guest view if the user is not authenticated', () => {
    const wrapper = shallowMount(GTNavBar, defaultMountOptions)

    expect(wrapper.findComponent(GTNavLink).exists()).toBe(true)
    expect(wrapper.findComponent(GTDropDownMenu).exists()).toBe(false)
  })

  test('Component renders the user view if the user is authenticated', async () => {
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

    const wrapper = shallowMount(GTNavBar, authenticatedMountOptions)

    expect(wrapper.findComponent(GTNavLink).exists()).toBe(false)
    expect(wrapper.findComponent(GTDropDownMenu).exists()).toBe(true)
  })
})
