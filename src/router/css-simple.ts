import Index from "@/view/index/index.vue";

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
];
