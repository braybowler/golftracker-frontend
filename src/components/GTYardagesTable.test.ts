import { describe, expect, test, vi } from 'vitest'
import { flushPromises, shallowMount } from '@vue/test-utils'
import GTYardagesTable from '@/components/GTYardagesTable.vue'
import { createTestingPinia } from '@pinia/testing'

const mockGolfClubsResponse = [
  {
    id: 1,
    type: 'golf_clubs',
    user_id: 1,
    sort_index: 0,
    make: 'Ping',
    model: 'Anser',
    club_category: 'Putter',
    club_type: 'Blade',
    carry_distance: 0,
    total_distance: 0,
    loft: 0,
    created_at: '2024-09-24T13:07:51.000000Z',
    updated_at: '2024-09-24T13:07:51.000000Z'
  },
  {
    id: 2,
    type: 'golf_clubs',
    user_id: 1,
    sort_index: 4,
    make: 'Titleist',
    model: 'MB',
    club_category: 'Wedge',
    club_type: 'PW',
    carry_distance: 120,
    total_distance: 120,
    loft: 46,
    created_at: '2024-09-24T13:08:14.000000Z',
    updated_at: '2024-09-25T15:28:53.000000Z'
  },
  {
    id: 3,
    type: 'golf_clubs',
    user_id: 1,
    sort_index: 7,
    make: 'Titleist',
    model: 'MB',
    club_category: 'Iron',
    club_type: '7i',
    carry_distance: 165,
    total_distance: 165,
    loft: 34,
    created_at: '2024-09-24T13:08:37.000000Z',
    updated_at: '2024-09-25T15:28:53.000000Z'
  },
  {
    id: 4,
    type: 'golf_clubs',
    user_id: 1,
    sort_index: 27,
    make: 'Ping',
    model: 'G410 LST',
    club_category: 'Wood',
    club_type: '1w',
    carry_distance: 270,
    total_distance: 290,
    loft: 7,
    created_at: '2024-09-25T12:53:05.000000Z',
    updated_at: '2024-09-25T15:28:53.000000Z'
  },
  {
    id: 5,
    type: 'golf_clubs',
    user_id: 1,
    sort_index: 3,
    make: 'Vokey',
    model: 'SM10',
    club_category: 'Wedge',
    club_type: 'GW',
    carry_distance: 110,
    total_distance: 110,
    loft: 50,
    created_at: '2024-09-25T13:31:13.000000Z',
    updated_at: '2024-09-25T15:28:53.000000Z'
  },
  {
    id: 6,
    type: 'golf_clubs',
    user_id: 1,
    sort_index: 5,
    make: 'Titleist',
    model: 'MB',
    club_category: 'Iron',
    club_type: '9i',
    carry_distance: 135,
    total_distance: 135,
    loft: 42,
    created_at: '2024-09-25T13:32:40.000000Z',
    updated_at: '2024-09-25T15:28:53.000000Z'
  },
  {
    id: 7,
    type: 'golf_clubs',
    user_id: 1,
    sort_index: 6,
    make: 'Titleist',
    model: 'MB',
    club_category: 'Iron',
    club_type: '8i',
    carry_distance: 155,
    total_distance: 155,
    loft: 38,
    created_at: '2024-09-25T13:33:39.000000Z',
    updated_at: '2024-09-25T15:28:53.000000Z'
  },
  {
    id: 8,
    type: 'golf_clubs',
    user_id: 1,
    sort_index: 8,
    make: 'Titleist',
    model: 'CB',
    club_category: 'Iron',
    club_type: '6i',
    carry_distance: 180,
    total_distance: 180,
    loft: 30,
    created_at: '2024-09-25T13:34:38.000000Z',
    updated_at: '2024-09-25T15:28:53.000000Z'
  },
  {
    id: 9,
    type: 'golf_clubs',
    user_id: 1,
    sort_index: 9,
    make: 'Titleist',
    model: 'CB',
    club_category: 'Iron',
    club_type: '5i',
    carry_distance: 195,
    total_distance: 195,
    loft: 26,
    created_at: '2024-09-25T13:35:03.000000Z',
    updated_at: '2024-09-25T15:28:53.000000Z'
  },
  {
    id: 10,
    type: 'golf_clubs',
    user_id: 1,
    sort_index: 10,
    make: 'Titleist',
    model: 'CB',
    club_category: 'Iron',
    club_type: '4i',
    carry_distance: 205,
    total_distance: 205,
    loft: 22,
    created_at: '2024-09-25T13:36:08.000000Z',
    updated_at: '2024-09-25T15:28:53.000000Z'
  },
  {
    id: 11,
    type: 'golf_clubs',
    user_id: 1,
    sort_index: 12,
    make: 'Titleist',
    model: 'U500',
    club_category: 'Iron',
    club_type: '2i',
    carry_distance: 235,
    total_distance: 245,
    loft: 16,
    created_at: '2024-09-25T13:36:38.000000Z',
    updated_at: '2024-09-25T15:28:53.000000Z'
  },
  {
    id: 12,
    type: 'golf_clubs',
    user_id: 1,
    sort_index: 25,
    make: 'Callaway',
    model: 'Mavrik',
    club_category: 'Wood',
    club_type: '3w',
    carry_distance: 245,
    total_distance: 255,
    loft: 15,
    created_at: '2024-09-25T13:37:07.000000Z',
    updated_at: '2024-09-25T15:28:53.000000Z'
  }
]

vi.mock('@/composables/useAxios', () => ({
  useAxios: () => ({
    requestMethodSelector: vi.fn().mockResolvedValue(mockGolfClubsResponse)
  })
}))

describe('GTYardagesTable', () => {
  const defaultMountOptions = {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn
        })
      ]
    }
  }

  test('Component renders', () => {
    const wrapper = shallowMount(GTYardagesTable, defaultMountOptions)

    expect(wrapper.exists()).toBe(true)
  })

  describe('Table data', () => {
    test('Table mounts with data', async () => {
      const wrapper = shallowMount(GTYardagesTable, defaultMountOptions)
      await flushPromises()

      expect(wrapper.vm.golfClubs.length).toBeGreaterThan(0)
    })

    test('Table sorts golf clubs on mount', async () => {
      const wrapper = shallowMount(GTYardagesTable, defaultMountOptions)
      await flushPromises()

      expect(wrapper.vm.golfClubs.length).toBeGreaterThan(0)
      expect(wrapper.vm.sortedGolfClubs.length).toBeGreaterThan(0)
      expect(wrapper.vm.sortedGolfClubs[0]).toEqual({
        id: 1,
        type: 'golf_clubs',
        user_id: 1,
        sort_index: 0,
        make: 'Ping',
        model: 'Anser',
        club_category: 'Putter',
        club_type: 'Blade',
        carry_distance: 0,
        total_distance: 0,
        loft: 0,
        created_at: '2024-09-24T13:07:51.000000Z',
        updated_at: '2024-09-24T13:07:51.000000Z'
      })
      expect(wrapper.vm.sortedGolfClubs[11]).toEqual({
        id: 4,
        type: 'golf_clubs',
        user_id: 1,
        sort_index: 27,
        make: 'Ping',
        model: 'G410 LST',
        club_category: 'Wood',
        club_type: '1w',
        carry_distance: 270,
        total_distance: 290,
        loft: 7,
        created_at: '2024-09-25T12:53:05.000000Z',
        updated_at: '2024-09-25T15:28:53.000000Z'
      })
    })
  })

  describe('Edit mode', () => {
    test('Component mounts in read mode', () => {
      const wrapper = shallowMount(GTYardagesTable, defaultMountOptions)

      expect(wrapper.vm.isInEditMode).toBe(false)
    })

    test('Component can enter edit mode', async () => {
      const wrapper = shallowMount(GTYardagesTable, defaultMountOptions)

      const button = wrapper.find('g-t-button-stub')
      await button.trigger('click')

      expect(wrapper.vm.isInEditMode).toBe(true)
    })

    test('Component can exit edit mode', async () => {
      const wrapper = shallowMount(GTYardagesTable, defaultMountOptions)

      const button = wrapper.find('g-t-button-stub')

      await button.trigger('click')
      expect(wrapper.vm.isInEditMode).toBe(true)

      await button.trigger('click')
      expect(wrapper.vm.isInEditMode).toBe(false)
    })

    test.todo('Component makes an update request when exiting edit mode', async () => {
      const wrapper = shallowMount(GTYardagesTable, defaultMountOptions)

      const button = wrapper.find('g-t-button-stub')

      await button.trigger('click')
      await button.trigger('click')

      // expect that requestMethodSelector got called with update logic.
    })
  })
})
