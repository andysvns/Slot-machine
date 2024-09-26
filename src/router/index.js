import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [

  {
    path: "/",
    name: "home",

    component: () => import("../view/HomePage.vue"),
  },
  {
    path: "/About",
    name: "about",
    component: () => import("../view/AboutPage.vue"),
  },
  {
    path: "/ourProduct",
    name: "ourproduct",
    component: () => import("../view/OurproductPage.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../view/ContactPage.vue"),
  },
  {
    path: "/adminlogin",
    name: "adminlogin",
    component: () => import("../view/AdminLogin.vue"),
  },
  {
    path: "/admin",
    name: "adminpage",
    component: () => import("../view/AdminPage.vue"),
    meta: { requiresAuth: true }
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')
  
  if (to.name === 'adminlogin' && isAuthenticated) {
    next({ name: 'admin' })
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'adminlogin' })
    } else {
      next()
    }
  } else {
    next()
  }
})


export default router;
