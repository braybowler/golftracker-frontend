import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import GolfBagsView from '@/views/GolfBagsView.vue'
import SettingsView from '@/views/SettingsView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
    { path: '/contact', component: ContactView },
    { path: '/dashboard', component: DashboardView },
    { path: '/golfbags', component: GolfBagsView },
    { path: '/login', component: LoginView },
    { path: '/profile', component: ProfileView },
    { path: '/register', component: RegisterView },
    { path: '/settings', component: SettingsView }
  ]
})

export default router
