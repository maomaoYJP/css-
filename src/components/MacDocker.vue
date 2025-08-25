<template>
  <div class="max-w-4/5 h-40 absolute bottom-4 left-1/2 -translate-x-1/2">
    <div
      class="absolute h-20 w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-200"
    ></div>
    <div
      class="h-full flex items-center overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div
        class="h-20 p-2 pr-0 flex items-center"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
      >
        <template v-for="card in cards" :key="card.id">
          <div
            class="w-full h-full flex"
            :ref="(el) => card.element = el as HTMLElement | null"
          >
            <router-link :to="card.path" class="flex">
              <div
                :style="{
                  height: `${card.scale * 100}%`,
                  transform: `translateY(${(1 - card.scale) * 20}%)`,
                }"
                :title="card.title"
                class="p-2 whitespace-nowrap overflow-hidden self-end cursor-pointer h-full aspect-square bg-red-100 flex items-center justify-center"
                style="
                  transition: transform 0.15s ease-out, height 0.15s ease-out;
                "
              >
                {{ card.title }}
              </div>
            </router-link>

            <div
              class="w-2 z-1"
              :style="{
                width: `${card.scale * 8}px`,
              }"
              style="transition: width 0.15s ease-out"
            ></div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

interface RouteItem {
  path: string; // 路由路径
  meta?: {
    title?: string; // 路由标题
    show?: boolean; // 是否显示在Docker中
  };
}

const props = defineProps<{
  routeData: RouteItem[];
}>();

const maxScale = 1.5;
const minScale = 1;
const scaleRange = 200; // 缩放范围

interface Card {
  id: number;
  title: string;
  path: string;
  scale: number;
  element: HTMLElement | null;
  centerX: number; // 缓存元素中心点X坐标
}

const cards = ref<Card[]>([]);

// routeData映射到cards
cards.value.push(
  ...props.routeData.map((route, index) => ({
    id: index + 1,
    title: route.meta?.title || `Card ${index + 1}`,
    scale: minScale,
    element: null,
    centerX: 0,
    path: route.path,
  }))
);

onMounted(() => {
  updateCenterPositions();
});

const updateCenterPositions = () => {
  cards.value.forEach((card) => {
    if (card.element) {
      const rect = card.element.getBoundingClientRect();
      card.centerX = rect.left + rect.width / 2;
    }
  });
};

const handleMouseMove = (e: MouseEvent) => {
  const scaleCurve = getScaleCurve(e.clientX, scaleRange, minScale, maxScale);
  cards.value.forEach((card) => {
    const newScale = scaleCurve(card.centerX);
    // 只有当缩放值有明显变化时才更新，减少不必要的重渲染
    if (Math.abs(card.scale - newScale) > 0.05) {
      card.scale = newScale;
      updateCenterPositions();
    }
  });
};

/**
 * 获取缩放曲线函数
 * @param pointX 鼠标x坐标
 * @param range 缩放范围
 * @param minScale 最小缩放比例
 * @param maxScale 最大缩放比例
 * @return 一个函数，传入一个x坐标，返回该坐标对应的缩放比例
 */
const getScaleCurve = (
  pointX: number,
  range: number,
  minScale: number,
  maxScale: number
) => {
  return (x: number) => {
    const distance = Math.abs(x - pointX);
    if (distance > range) {
      return minScale;
    }
    // 使用更平滑的缓动函数
    const normalizedDistance = distance / range;
    const scale =
      minScale + (maxScale - minScale) * (1 - Math.pow(normalizedDistance, 2));
    return scale;
  };
};

const handleMouseLeave = () => {
  cards.value.forEach((card) => {
    card.scale = minScale;
  });
};
</script>
