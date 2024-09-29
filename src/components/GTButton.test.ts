import { describe, expect, test, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { shallowMount } from '@vue/test-utils'
import GTButton from '@/components/GTButton.vue'

describe('GTButton', () => {
  const slotContent = 'Default'

  const defaultMountOptions = {
    slots: {
      default: slotContent
    },
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn
        })
      ]
    }
  }

  test('Component can render', () => {
    const wrapper = shallowMount(GTButton, defaultMountOptions)

    expect(wrapper.exists()).toBe(true)
  })

  test('slot content is rendered as button text', () => {
    const wrapper = shallowMount(GTButton, defaultMountOptions)

    expect(wrapper.find('button').text()).toContain(slotContent)
  })
})