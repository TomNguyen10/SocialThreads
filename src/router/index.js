import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "news",
      component: () => import("../views/NewsView.vue"),
    },
    {
      path: "/reddit",
      name: "reddit",
      component: () => import("../views/RedditView.vue"),
    },
    {
      path: "/dadjoke",
      name: "dadjoke",
      component: () => import("../views/DadJokeView.vue"),
    },
    {
      path: "/facts",
      name: "facts",
      component: () => import("../components/Facts.vue"),
    },
    {
      path: "/history",
      name: "history",
      component: () => import("../components/History.vue"),
    },
    {
      path: "/trivia",
      name: "trivia",
      component: () => import("../views/TriviaView.vue"),
    },
    {
      path: "/chuck",
      name: "chuck",
      component: () => import("../components/Chuck.vue"),
    },
  ],
});

export default router;
