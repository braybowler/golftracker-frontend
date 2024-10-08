import { describe, expect, test, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import GTSideBar from '@/components/GTSideBar.vue'
import { createTestingPinia } from '@pinia/testing'

describe('GTSideBar', () => {
  const defaultMountOptions = {
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

  test('Component only renders when a user is authed', () => {
    const wrapper = shallowMount(GTSideBar, defaultMountOptions)

    expect(wrapper.exists()).toBe(true)
  })

  test('Component does not render when a user is not authed', () => {
    const unauthedMountOptions = {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              auth: {
              }
            },
            createSpy: vi.fn
          })
        ]
      }
    }
    const wrapper = shallowMount(GTSideBar, unauthedMountOptions)

    expect(wrapper.exists()).toBe(true)
  })

  test('Component initializes expanded', () => {
    const wrapper = shallowMount(GTSideBar, defaultMountOptions)

    expect(wrapper.vm.isExpanded).toBe(true)
  })

  test('Component can be toggled to unexpand', async () => {
    const wrapper = shallowMount(GTSideBar, defaultMountOptions)

    expect(wrapper.vm.isExpanded).toBe(true)

    const button = wrapper.find('button')

    await button.trigger('click')

    expect(wrapper.vm.isExpanded).toBe(false)
  })

  test('Component can be toggled back to expanded', async () => {
    const wrapper = shallowMount(GTSideBar, defaultMountOptions)

    expect(wrapper.vm.isExpanded).toBe(true)

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.vm.isExpanded).toBe(false)

    await button.trigger('click')

    expect(wrapper.vm.isExpanded).toBe(true)
  })
})