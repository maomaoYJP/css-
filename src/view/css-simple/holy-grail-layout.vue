<template>
  <div class="w-full h-full flex flex-col gap-4">
    <div class="w-full h-1/3 flex">
      <div class="flex-grow-0 flex-shrink-0 basis-50 bg-amber-100"></div>
      <div class="flex-grow-1 flex-shrink-0 basis-50 bg-blue-200"></div>
      <div class="flex-grow-0 flex-shrink-0 basis-50 bg-amber-100"></div>
    </div>
    <div class="h-1/3 min-w-[600px] relative px-[200px]">
      <div class="float-left w-full h-full relative bg-amber-100"></div>
      <div
        class="float-left w-[200px] -ml-[100%] -left-[200px] h-full relative bg-blue-200"
      ></div>
      <div
        class="float-left w-50 -ml-[200px] -right-[200px] h-full relative bg-blue-200"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
