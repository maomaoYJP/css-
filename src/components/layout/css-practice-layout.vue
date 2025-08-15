<template>
  <div class="w-full h-full flex">
    <div
      class="relative w-[60px] min-h-screen overflow-auto transition-all duration-300 hover:w-[200px] bg-gray-100 group"
    >
      <div class="absolute inset-0 flex flex-col">
        <!-- 左侧内容 -->
        <div
          class="h-[80px] flex items-center justify-center whitespace-nowrap text-center text-lg font-bold py-2 border-b border-gray-300"
          @click="router.push('/')"
        >
          目录
        </div>
        <ul class="flex-1 overflow-y-auto overflow-x-hidden">
          <router-link
            v-for="route in cssPracticeRoutesFiltered"
            :to="route.path"
            class="h-[60px] flex items-center justify-center whitespace-nowrap text-sm py-2 px-4 hover:bg-gray-200 cursor-pointer opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >{{ route.meta?.title || "未命名" }}</router-link
          >
        </ul>
      </div>
    </div>
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import cssPracticeRoutes from "@/router/css-practice";
import { useRouter } from "vue-router";
const router = useRouter();

const cssPracticeRoutesFiltered = cssPracticeRoutes.filter(
  (route) => route.meta?.show !== false
);
</script>
