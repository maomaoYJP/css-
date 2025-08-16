<template>
  <div class="w-full h-full flex relative">
    <div class="flex-1 overflow-hidden">
      <transition name="slide">
        <router-view :key="$route.fullPath" />
      </transition>
    </div>
    <div
      class="bg-blue-100 h-20 max-w-4/5 absolute bottom-4 left-1/2 -translate-x-1/2 z-2"
    >
      <MacDocker />
    </div>
  </div>
</template>

<script setup lang="ts">
import cssPracticeRoutes from "@/router/css-practice";
import MacDocker from "@/components/macDocker.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const cssPracticeRoutesFiltered = cssPracticeRoutes.filter(
  (route) => route.meta?.show !== false
);
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}
.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-to {
  position: absolute;
  transform: translateX(-100%);
  opacity: 0;
}
</style>
