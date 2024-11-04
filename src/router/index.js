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
    path: "/ourProduct",
    name: "ourproduct",
    component: () => import("../view/OurproductPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
