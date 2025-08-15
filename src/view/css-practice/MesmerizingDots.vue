<template>
  <div
    class="w-full h-full bg-blue-200 flex flex-wrap items-center justify-center"
  >
    <div
      v-for="(_, index) in dots"
      class="flex flex-col items-center w-[100px] h-[100px]"
    >
      <div
        :style="{ animationDelay: `${index * 100}ms` }"
        class="w-[20px] h-[20px] rounded-full bg-white animate-bounce-dots"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const dots = new Array(10).fill(0);
</script>
<style scoped>
@keyframes bounceDots {
  0% {
    transform: translateY(0);
    box-shadow: 0px 0px 1px #000;
  }
  50% {
    transform: translateY(-50px);
    box-shadow: 0px 100px 10px #000;
  }
  100% {
    transform: translateY(0);
    box-shadow: 0px 0px 1px #000;
  }
}

.animate-bounce-dots {
  animation: bounceDots 3s infinite;
}
</style>
