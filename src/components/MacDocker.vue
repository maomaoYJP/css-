<template>
  <div
    class="w-full h-full p-2 pr-0 flex items-center justify-center"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <template v-for="card in cards" :key="card.id">
      <div
        class="w-full h-full flex"
        :ref="(el) => card.element = el as HTMLElement | null"
      >
        <div class="flex">
          <div
            :style="{
              height: `${card.scale * 100}%`,
              transform: `translateY(${(1 - card.scale) * 20}%)`,
            }"
            class="self-end cursor-pointer h-full aspect-square bg-red-100 flex items-center justify-center"
            style="transition: transform 0.15s ease-out, height 0.15s ease-out"
          >
            {{ card.id }}
          </div>
        </div>

        <div
          class="w-2"
          :style="{
            width: `${card.scale * 8}px`,
          }"
          style="transition: width 0.15s ease-out"
        ></div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const maxScale = 1.5;
const minScale = 1;
const scaleRange = 200; // 缩放范围

interface Card {
  id: number;
  title: string;
  scale: number;
  element: HTMLElement | null;
  centerX: number; // 缓存元素中心点X坐标
}

const cards = ref<Card[]>([
  { id: 1, title: "Card 1", scale: minScale, element: null, centerX: 0 },
  { id: 2, title: "Card 2", scale: minScale, element: null, centerX: 0 },
  { id: 3, title: "Card 3", scale: minScale, element: null, centerX: 0 },
  { id: 4, title: "Card 4", scale: minScale, element: null, centerX: 0 },
  { id: 5, title: "Card 5", scale: minScale, element: null, centerX: 0 },
]);

onMounted(() => {
  cards.value.forEach((card) => {
    if (card.element) {
      const rect = card.element.getBoundingClientRect();
      card.centerX = rect.left + rect.width / 2;
    }
  });
});

const handleMouseMove = (e: MouseEvent) => {
  const scaleCurve = getScaleCurve(e.clientX, scaleRange, minScale, maxScale);
  cards.value.forEach((card) => {
    const newScale = scaleCurve(card.centerX);
    // 只有当缩放值有明显变化时才更新，减少不必要的重渲染
    if (Math.abs(card.scale - newScale) > 0.01) {
      card.scale = newScale;
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
