<template>
  <div class="w-full h-full flex relative">
    <div class="flex-1 overflow-hidden">
      <router-view v-slot="{ Component }">
        <transition name="slide">
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
    </div>

    <MacDocker :routeData="cssPracticeRoutes" />
  </div>
</template>

<script setup lang="ts">
import cssPracticeRoutes from "@/router/css-practice";
import MacDocker from "@/components/MacDocker.vue";
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
