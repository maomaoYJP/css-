<template>
  <div class="h-full w-full">
    <div
      class="w-100 h-100 mt-20 mx-auto p-4 flex flex-wrap gap-6 items-center"
      @mousemove="handleMouseMove"
      @mouseleave="() => dots.forEach((dot) => (dot.scale = 1))"
    >
      <div
        :style="{ transform: `scale(${dot.scale})` }"
        class="w-10 h-10 bg-red-300 rounded-full"
        v-for="dot in dots"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const dots = reactive(
  Array.from({ length: 30 }, (_, i) => {
    return {
      id: i,
      scale: 1,
    };
  })
);

const handleMouseMove = (event: MouseEvent) => {
  const container = event.currentTarget as HTMLElement;
  const rect = container.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  dots.forEach((dot) => {
    const dotElement = container.children[dot.id] as HTMLElement;
    const dotRect = dotElement.getBoundingClientRect();
    const dotX = dotRect.left + dotRect.width / 2 - rect.left;
    const dotY = dotRect.top + dotRect.height / 2 - rect.top;

    const distance = Math.hypot(mouseX - dotX, mouseY - dotY);
    const maxDistance = 200; // Maximum distance for scaling effect
    const minScale = 1;
    const maxScale = 1.5;

    if (distance < maxDistance) {
      const scale = maxScale - (distance / maxDistance) * (maxScale - minScale);
      dot.scale = Math.min(maxScale, Math.max(minScale, scale));
    } else {
      dot.scale = minScale;
    }
  });
};
</script>
