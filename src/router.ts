import {
  type ParamValue,
  type RouteRecordInfo,
  createRouter,
  createWebHistory,
} from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { useUserStore } from '@/stores/user'

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// manual extension of route types
declare module 'vue-router/auto-routes' {
  export interface RouteNamedMap {
    'custom-dynamic-name': RouteRecordInfo<
      'custom-dynamic-name',
      '/added-during-runtime/[...path]',
      { path: ParamValue<true> },
      { path: ParamValue<false> }
    >
  }
}

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isAuthenticated = !!userStore.token

  // List of public routes (add more if needed)
  const publicPages = ['/login']
  const isPublic = publicPages.includes(to.path)

  if (!isPublic && !isAuthenticated) {
    // 🚷 Redirect to login if not authenticated
    next({ path: '/login' })
  }
  else {
    next()
  }
})
