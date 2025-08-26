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
      <div ref="container" class="flex-1 bg-[#7DC8CF] mt-2 relative">
        <div
          :style="{
            bottom: toast.position.y + 'px',
            left: toast.position.x + 'px',
          }"
          class="absolute h-10 w-10 bg-[#FEBB63]"
        ></div>
      </div>
      <div
        class="h-10 w-full bg-[#FDC571] rounded-b-xl flex items-center justify-center"
      >
        <button @click="launch">发射</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue";

const container = ref<HTMLElement | null>(null);
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

let animationFrameId: number | null = null;

// 清理动画 - 防止内存泄漏
const cancelAnimation = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};

const launch = () => {
  cancelAnimation();
  initToast();
  moveToast();
};

const initToast = () => {
  if (!container.value) return;
  const containerWidth = container.value.clientWidth;
  toast.value.position.x = Math.random() * (containerWidth - 40);
  toast.value.position.y = -40;

  // 初始化速度
  toast.value.speed.y = Math.random() * 20 + 1;
  if (toast.value.position.x > containerWidth / 2) {
    toast.value.speed.x = -(Math.random() * 2 + 1);
  } else {
    toast.value.speed.x = Math.random() * 2 + 1;
  }
};

const moveToast = () => {
  if (!container.value) return;
  const containerWidth = container.value.clientWidth;

  //   使用requestAnimationFrame实现动画
  const step = () => {
    // 位置到容器外
    if (
      toast.value.position.x < -40 ||
      toast.value.position.x > containerWidth ||
      toast.value.position.y < -40
    ) {
      initToast();
      requestAnimationFrame(step);
      return;
    }
    // 更新位置
    toast.value.position.x += toast.value.speed.x;
    toast.value.position.y += toast.value.speed.y;

    // 更新速度
    toast.value.speed.y -= 0.3; // 模拟重力

    requestAnimationFrame(step);
  };

  animationFrameId = requestAnimationFrame(step);
};

onUnmounted(() => {
  cancelAnimation();
});
</script>
