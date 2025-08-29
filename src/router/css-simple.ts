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
  {
    path: "multi-row-or-column",
    component: () => import("@/view/css-simple/multi-row-or-column.vue"),
    meta: { title: "多行或多列等分布局" },
  },
  {
    path: "row-col-center",
    component: () => import("@/view/css-simple/row-col-center.vue"),
    meta: { title: "水平垂直居中" },
  },
  {
    path: "holy-grail-layout",
    component: () => import("@/view/css-simple/holy-grail-layout.vue"),
    meta: { title: "圣杯布局" },
  },
];
