import Index from "@/view/index/index.vue";
import MesmerizingDots from "@/view/css-practice/MesmerizingDots.vue";

export default [
  {
    path: "back",
    meta: { title: "返回" },
    redirect: "/",
  },
  {
    path: "",
    component: Index,
    meta: { title: "首页" },
  },
  {
    path: "MesmerizingDots",
    component: MesmerizingDots,
    meta: { title: "MesmerizingDots" },
  },
  {
    path: "InteractiveDotsGrid",
    component: () => import("@/view/css-practice/InteractiveDotsGrid.vue"),
    meta: { title: "Interactive Dots Grid" },
  },
  {
    path: "ToastCatcherGame",
    component: () => import("@/view/css-practice/ToastCatcherGame.vue"),
    meta: { title: "Toast Catcher Game" },
  },
];
