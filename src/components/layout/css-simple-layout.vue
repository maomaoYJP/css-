<template>
  <!-- 左右布局，左边目录，右边内容区 -->
  <div class="h-screen w-full flex">
    <div class="w-50 border-r border-r-gray-200 flex flex-col items-center p-2">
      <div class="pb-2 text-2xl">目录</div>
      <!-- 目录项 -->
      <div class="w-full overflow-y-auto scrollbar-hide">
        <li
          v-for="(route, index) in routes"
          :key="index"
          class="text-center list-none px-3 py-2 rounded-md text-m text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
        >
          {{ route.meta.title }}
        </li>
      </div>
    </div>

    <div class="flex-1 p-2">1</div>
  </div>
</template>

<script setup lang="ts">
import routes from "@/router/css-simple";
console.log(routes);
</script>
