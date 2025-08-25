<template>
  <div class="w-full h-full flex justify-center">
    <div class="w-100 h-120 bg-[#67442B] mt-20 flex flex-col rounded-xl p-2">
      <div class="h-15 w-full bg-[#976F4A] rounded-t-xl flex items-center p-2">
        <div
          class="h-full w-full bg-[#67442B] rounded-xl flex justify-between items-center px-2 text-[#FFE2B4]"
        >
          <span>000001</span>
          <span>X1</span>
        </div>
      </div>
      <div class="flex-1 bg-[#7DC8CF] mt-2 relative">
        <div
          :style="{ bottom: toast.position.y, left: toast.position.x }"
          class="absolute h-10 w-10 bg-[#FEBB63]"
        ></div>
      </div>
      <div class="h-10 w-full bg-[#FDC571] rounded-b-xl"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const toast = ref({
  speed: {
    x: 2,
    y: 2,
  },
  position: {
    x: 0,
    y: 0,
  },
});
</script>
