import { beforeEach, describe, expect, test } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { shallowMount } from '@vue/test-utils'
import GTDropDownMenu from '@/components/GTDropDownMenu.vue'

describe('GTBottomBar', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('Component can render', () => {
    const wrapper = shallowMount(GTDropDownMenu)

    expect(wrapper.exists()).toBe(true)
  })

  test('Component initializes unexpanded', () => {
    const wrapper = shallowMount(GTDropDownMenu)

    expect(wrapper.vm.isHamburgerMenuExpanded).toBe(false)
  })

  test('Component can be toggled to expand', async () => {
    const wrapper = shallowMount(GTDropDownMenu)

    expect(wrapper.vm.isHamburgerMenuExpanded).toBe(false)

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.vm.isHamburgerMenuExpanded).toBe(true)
  })

  test('Component can be toggled back to unexpanded', async () => {
    const wrapper = shallowMount(GTDropDownMenu)

    expect(wrapper.vm.isHamburgerMenuExpanded).toBe(false)

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.vm.isHamburgerMenuExpanded).toBe(true)

    await button.trigger('click')

    expect(wrapper.vm.isHamburgerMenuExpanded).toBe(false)
  })
})