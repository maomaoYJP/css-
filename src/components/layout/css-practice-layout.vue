<template>
  <div class="w-full h-full flex relative">
    <div class="flex-1 overflow-hidden">
      <router-view v-slot="{ Component }">
        <transition :name="transitionName">
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
    </div>

    <MacDocker :routeData="cssPracticeRoutes" @changeRoute="handChangeRoute" />
  </div>
</template>

<script setup lang="ts">
import cssPracticeRoutes from "@/router/css-practice";
import MacDocker from "@/components/MacDocker.vue";
import { ref } from "vue";

const transitionName = ref("slide-right");

let previousPath = "";

const handChangeRoute = (path: string) => {
  const preIndex = cssPracticeRoutes.findIndex(
    (route) => route.path === previousPath
  );
  const newIndex = cssPracticeRoutes.findIndex((route) => route.path === path);
  if (preIndex < newIndex) {
    transitionName.value = "slide-right";
  } else {
    transitionName.value = "slide-left";
  }
  if (path !== previousPath) {
    previousPath = path;
  }
};
</script>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}
.slide-right-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-right-leave-to {
  position: absolute;
  transform: translateX(-100%);
  opacity: 0;
}

.slide-left-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-left-leave-to {
  position: absolute;
  transform: translateX(100%);
  opacity: 0;
}

.slide-right-enter-to,
.slide-right-leave-from,
.slide-left-enter-to,
.slide-left-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
