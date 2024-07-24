import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import IndexBagsView from "@/views/GolfBags/IndexBagsView.vue";
import ShowBagsView from "@/views/GolfBags/ShowBagsView.vue";
import IndexClubsView from "@/views/GolfClubs/IndexClubsView.vue";
import ShowClubsView from "@/views/GolfClubs/ShowClubsView.vue";
import SettingsView from '@/views/SettingsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import { useAuth } from '@/stores/auth/auth'

const publicRoutes = ['Home', 'About', 'Contact', 'Register', 'Login']

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView
    },
    {
      path: '/contact',
      name: 'Contact',
      component: ContactView
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView
    },
    {
      path: '/golfbags',
      name: 'IndexGolfBags',
      component: IndexBagsView
    },
    {
      path: '/golfbags/:id',
      name: 'ShowGolfBags',
      component: ShowBagsView
    },
    {
      path: '/golfclubs',
      name: 'IndexGolfClubs',
      component: IndexClubsView
    },
    {
      path: '/golfclubs/:id',
      name: 'ShowGolfClubs',
      component: ShowClubsView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsView
    }
  ]
})

router.beforeEach(async (to) => {
  const auth = useAuth()

  if (!auth.isAuthed && !publicRoutes.includes(to.name as string)) {
    return { name: 'Login' }
  }
})

export default router
