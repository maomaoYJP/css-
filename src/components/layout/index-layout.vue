<template>
  <div class="w-screen h-screen flex justify-center items-center gap-10">
    <router-link
      v-for="route in parentRoutes"
      :key="route.path"
      :to="route.path"
      class="block"
    >
      <div
        class="flex items-center justify-center min-w-60 min-h-30 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-transparent hover:border-gray-100"
      >
        <div class="text-lg font-semibold text-gray-800">
          {{ route.meta?.title }}
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { routes } from "@/router";

const parentRoutes = routes.filter(
  (route) => route.children && route.children.length > 0
);
</script>
