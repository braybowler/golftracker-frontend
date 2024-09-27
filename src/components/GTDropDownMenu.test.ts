import { describe, expect, test, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import GTDropDownMenu from '@/components/GTDropDownMenu.vue'
import { createTestingPinia } from '@pinia/testing'

describe('GTDropDownMenu', () => {
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
    const wrapper = shallowMount(GTDropDownMenu, defaultMountOptions)

    expect(wrapper.exists()).toBe(true)
  })

  test('Component initializes unexpanded', () => {
    const wrapper = shallowMount(GTDropDownMenu, defaultMountOptions)

    expect(wrapper.vm.isHamburgerMenuExpanded).toBe(false)
  })

  test('Component can be toggled to expand', async () => {
    const wrapper = shallowMount(GTDropDownMenu, defaultMountOptions)

    expect(wrapper.vm.isHamburgerMenuExpanded).toBe(false)

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.vm.isHamburgerMenuExpanded).toBe(true)
  })

  test('Component can be toggled back to unexpanded', async () => {
    const wrapper = shallowMount(GTDropDownMenu, defaultMountOptions)

    expect(wrapper.vm.isHamburgerMenuExpanded).toBe(false)

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.vm.isHamburgerMenuExpanded).toBe(true)

    await button.trigger('click')

    expect(wrapper.vm.isHamburgerMenuExpanded).toBe(false)
  })
})
