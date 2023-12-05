import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/dadjoke",
      name: "dadjoke",
      component: () => import("../views/DadJokeview.vue"),
    },
    {
      path: "/football",
      name: "football",
      component: () => import("../views/FootballView.vue"),
    },
    {
      path: "/anime",
      name: "anime",
      component: () => import("../views/AnimeView.vue"),
    },
    {
      path: "/trivia",
      name: "trivia",
      component: () => import("../views/TriviaView.vue"),
    },
  ],
});

export default router;
