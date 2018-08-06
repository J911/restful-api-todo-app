import VueRouter from 'vue-router'
import Home from '../spa/home.vue'

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      title: 'Todo',
    }
  }
]

const router = new VueRouter({
  scrollBehavior() {
    return {x: 0, y: 0};
  },
  mode: 'history',
  routes
})

router.beforeEach(function (to, from, next) {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  return next();
});

export default router
