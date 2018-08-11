import VueRouter from 'vue-router'
import HomeComponent from '../spa/home-component.vue'
import SignInComponent from '../spa/auth/sign-in-component.vue'

const routes = [
  {
    path: '/',
    component: HomeComponent,
    meta: {
      title: 'Todo'
    }
  },
  {
    path: '/auth/sign-in',
    component: SignInComponent,
    meta: {
      title: 'Sign In - Todo'
    }
  }
]

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  mode: 'history',
  routes
})

router.beforeEach(function (to, from, next) {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  return next()
})

export default router
