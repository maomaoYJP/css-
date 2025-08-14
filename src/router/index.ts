import { createRouter, createWebHistory } from "vue-router";
import cssPracticeRoutes from "./css-practice";
import cssPracticeLayout from "@/components/layout/css-practice-layout.vue";

const routes = [
  {
    path: "/",
    component: cssPracticeLayout,
    children: [...cssPracticeRoutes],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
