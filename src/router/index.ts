import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import IndexBagsView from '@/views/GolfBags/IndexBagsView.vue'
import ShowBagsView from '@/views/GolfBags/ShowBagsView.vue'
import CreateBagsView from '@/views/GolfBags/CreateBagsView.vue'
import IndexClubsView from '@/views/GolfClubs/IndexClubsView.vue'
import ShowClubsView from '@/views/GolfClubs/ShowClubsView.vue'
import CreateClubsView from '@/views/GolfClubs/CreateClubsView.vue'
import IndexBallsView from '@/views/GolfBalls/IndexBallsView.vue'
import ShowBallsView from '@/views/GolfBalls/ShowBallsView.vue'
import CreateBallsView from '@/views/GolfBalls/CreateBallsView.vue'
import SettingsView from '@/views/SettingsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import { useAuth } from '@/stores/auth/auth'
import CreatePracticeSessionsView from '@/views/PracticeSessions/CreatePracticeSessionsView.vue'
import ShowPracticeSessionsView from '@/views/PracticeSessions/ShowPracticeSessionsView.vue'
import IndexPracticeSessionsView from '@/views/PracticeSessions/IndexPracticeSessionsView.vue'
import ShowYardagesTableView from '@/views/ShowYardagesTableView.vue'

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
      path: '/golfbags/create',
      name: 'CreateGolfBags',
      component: CreateBagsView
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
      path: '/golfclubs/create',
      name: 'CreateGolfClubs',
      component: CreateClubsView
    },
    {
      path: '/golfballs',
      name: 'IndexGolfBalls',
      component: IndexBallsView
    },
    {
      path: '/golfballs/:id',
      name: 'ShowGolfBalls',
      component: ShowBallsView
    },
    {
      path: '/golfballs/create',
      name: 'CreateGolfBalls',
      component: CreateBallsView
    },
    {
      path: '/practicesessions',
      name: 'IndexPracticeSessions',
      component: IndexPracticeSessionsView
    },
    {
      path: '/practicesessions/:id',
      name: 'ShowPracticeSessions',
      component: ShowPracticeSessionsView
    },
    {
      path: '/practicesessions/create',
      name: 'CreatePracticeSessions',
      component: CreatePracticeSessionsView
    },
    {
      path: '/yardages',
      name: 'ShowYardagesTable',
      component: ShowYardagesTableView
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

  if (publicRoutes.includes(to.name as string)) {
    return
  }

  if (!auth.isAuthed) {
    await auth.tryAuthOnce()
  }

  if (!auth.isAuthed && !publicRoutes.includes(to.name as string)) {
    return { name: 'Login' }
  }
})

export default router
