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
            bottom: toast?.state.position.y + 'px',
            left: toast?.state.position.x + 'px',
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
import { ref, reactive, onUnmounted, onMounted } from "vue";

function useToast(container: HTMLElement) {
  // 响应式状态
  const state = reactive({
    speed: { x: 0, y: 0 },
    position: { x: 0, y: 0 },
    containerWidth: container.clientWidth,
  });
  const animationFrameId = ref<number | null>(null);

  // 初始化
  const init = () => {
    const { containerWidth } = state;
    state.position.x = Math.random() * (containerWidth - 40);
    state.position.y = -40;
    state.speed.y = Math.random() * 20 + 1;
    state.speed.x =
      state.position.x > containerWidth / 2
        ? -(Math.random() * 2 + 1)
        : Math.random() * 2 + 1;
  };

  // 动画逻辑
  const animate = () => {
    const { position, speed, containerWidth } = state;
    if (position.x < -40 || position.x > containerWidth || position.y < -40) {
      init();
      animationFrameId.value = requestAnimationFrame(animate);
      return;
    }
    position.x += speed.x;
    position.y += speed.y;
    speed.y -= 0.3;
    animationFrameId.value = requestAnimationFrame(animate);
  };

  // 启动/停止
  const start = () => {
    stop();
    animate();
  };
  const stop = () => {
    if (animationFrameId.value) {
      cancelAnimationFrame(animationFrameId.value);
      animationFrameId.value = null;
    }
  };

  return {
    state,
    init,
    start,
    stop,
  };
}

const container = ref<HTMLElement | null>(null);
const toast = ref<ReturnType<typeof useToast> | null>(null);
onMounted(() => {
  if (container.value) {
    toast.value = useToast(container.value);
    toast.value.init();
  }
});

const launch = () => {
  toast.value?.start();
};

onUnmounted(() => {
  toast.value?.stop();
});
</script>
