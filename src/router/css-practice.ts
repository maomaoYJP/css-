import Test from "@/view/css-practice/test.vue";
import Index from "@/view/index/index.vue";

export default [
  {
    path: "/",
    component: Index,
    meta: { title: "首页", show: false },
  },
  {
    path: "/test",
    component: Test,
    meta: { title: "测试" },
  },
];
