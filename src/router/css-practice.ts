import Index from "@/view/index/index.vue";
import MesmerizingDots from "@/view/css-practice/MesmerizingDots.vue";

export default [
  {
    path: "/",
    component: Index,
    meta: { title: "首页", show: false },
  },
  {
    path: "/MesmerizingDots",
    component: MesmerizingDots,
    meta: { title: "MesmerizingDots" },
  },
];
