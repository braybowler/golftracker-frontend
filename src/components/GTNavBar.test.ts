import { describe, expect, test, vi } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import GTNavBar from '@/components/GTNavBar.vue'
import { createTestingPinia } from '@pinia/testing'
import { useAuth } from '@/stores/auth/auth'


describe('GTNavBar', () => {

  test('Component can render', () => {
    const wrapper = shallowMount(GTNavBar, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            auth: {
              isAuthed: true
            }
          }
        })]
      }
    })

    expect(wrapper.exists()).toBe(true)
  })

  test('Component renders the guest view if the user is not authenticated', () => {
    const pinia = createTestingPinia({
      createSpy: vi.fn
    })
    const auth = useAuth(pinia)
    auth.isAuthed = false
    const wrapper = shallowMount(GTNavBar)

    expect(wrapper.html()).toContain('<g-t-nav-link-stub url="/" class="hover:text-white"></g-t-nav-link-stub>')
  })

  test('Component renders the user view if the user is authenticated', async () => {
    const wrapper = shallowMount(GTNavBar, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              auth: { isAuthed: false }
            },
            createSpy: vi.fn
          })
        ]
      }
    })

    const auth = useAuth()
    console.log(auth.isAuthed)
    auth.isAuthed = true
    console.log(auth.isAuthed)

    expect(wrapper.html()).toContain('<g-t-drop-down-menu-stub></g-t-drop-down-menu-stub>')
  })
})