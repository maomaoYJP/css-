import { createRouter, createWebHistory } from "vue-router";
import cssPracticeRoutes from "./css-practice";
import CssSimpleRoutes from "./css-simple";
import cssPracticeLayout from "@/components/layout/css-practice-layout.vue";
import IndexLayout from "@/components/layout/index-layout.vue";
import CssSimpleLayout from "@/components/layout/css-simple-layout.vue";

export const routes = [
  {
    path: "/",
    component: IndexLayout,
  },
  {
    path: "/css-practice",
    component: cssPracticeLayout,
    children: [...cssPracticeRoutes],
    meta: { title: "CSS练习" },
  },
  {
    path: "/css-simple",
    component: CssSimpleLayout,
    children: [...CssSimpleRoutes],
    meta: { title: "CSS简单练习" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
