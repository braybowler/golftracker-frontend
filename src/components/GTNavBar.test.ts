import { beforeEach, describe, expect, test, vi } from 'vitest'
import { flushPromises, mount, shallowMount } from '@vue/test-utils'
import GTNavBar from '@/components/GTNavBar.vue'
import GTNavLink from '@/components/GTNavLink.vue'
import GTDropDownMenu from '@/components/GTDropDownMenu.vue'
import { createPinia, setActivePinia } from 'pinia'
import router from '@/router'
import { useAuth } from '@/stores/auth/auth'
import { nextTick } from 'vue'

const defaultMountOptions = {
  global: {
    plugins: [
      router
    ]
  }
}

const apiMocks = vi.hoisted(() => ({
  loginUser: vi.fn().mockImplementation(() => ({
    data: { data: userFactory() }
  })),
  getCSRFToken: vi.fn().mockResolvedValue()
}))

vi.mock("@/stores/auth/api", () => ({
  loginUser: apiMocks.loginUser,
  getCSRFToken: apiMocks.getCSRFToken,
}))


const userFactory = () => {
  return {
    name: 'Test User',
    email: 'test@test.com',
    password: 'password'
  }
}

describe('GTNavBar', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('Component can render', () => {
    const wrapper = mount(GTNavBar, defaultMountOptions)

    expect(wrapper.exists()).toBe(true)
  })

  test('Component renders the guest view if the user is not authenticated', () => {
    const wrapper = mount(GTNavBar, defaultMountOptions)

    expect(wrapper.findComponent(GTNavLink).exists()).toBe(true)
    expect(wrapper.findComponent(GTDropDownMenu).exists()).toBe(false)
  })

  test('Component renders the user view if the user is authenticated', async () => {
    const wrapper = shallowMount(GTNavBar, defaultMountOptions)

    /**
     * Simulates the action the user needed to take to login to the the application
     */
    const auth = useAuth()
    await auth.login("test", "test@test.com")
    await flushPromises()
    await nextTick()

    expect(wrapper.findComponent(GTNavLink).exists()).toBeFalsy()
    expect(wrapper.findComponent(GTDropDownMenu).exists()).toBeTruthy()
  })
})
