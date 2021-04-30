import Vue from "vue";
import VueRouter from "vue-router";
import Lista from "../views/EventList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Lista",
    component: Lista,
  },
  { path: "/event-crear", name: "event-crear", component: () => import("../views/EventCreate.vue")},
  { path: "/event-show/:id", name: "event-show", component: () => import("../views/EventShow.vue"), props: true},
  //{ path: "*", name: "event-show", component: () => import("../views/NotFoundComponent.vue")}

];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
