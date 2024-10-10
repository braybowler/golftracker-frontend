import { describe, expect, test, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { mount, RouterLinkStub, shallowMount } from '@vue/test-utils'
import GTNavButton from '@/components/GTNavButton.vue'
describe('GTNavButton', () => {
  const url = '/url'
  const slotContent = 'Default'

  const defaultMountOptions = {
    props: {
      url: url
    },
    slots: {
      default: slotContent
    },
    global: {
      stubs: {
        RouterLink: RouterLinkStub
      },
      plugins: [
        createTestingPinia({
          createSpy: vi.fn
        })
      ]
    }
  }

  test('Component can render', () => {
    const wrapper = shallowMount(GTNavButton, defaultMountOptions)

    expect(wrapper.exists()).toBe(true)
  })

  test('props.url is passed down to the the RouterLink', () => {
    const wrapper = mount(GTNavButton, defaultMountOptions)

    expect(wrapper.findComponent(RouterLinkStub).props('to')).toBe(url)
  })

  test('slot content is rendered as RouterLink text', () => {
    const wrapper = mount(GTNavButton, defaultMountOptions)

    expect(wrapper.text()).toContain(slotContent)
  })
})
