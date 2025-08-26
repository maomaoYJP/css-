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
            bottom: toastInstance?.position.y + 'px',
            left: toastInstance?.position.x + 'px',
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

const container = ref<HTMLElement | null>(null);

class Toast {
  speed = reactive({ x: 0, y: 0 });
  position = reactive({ x: 0, y: 0 });

  private container: HTMLElement;
  private animationFrameId: number | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  init() {
    const containerWidth = this.container.clientWidth;
    this.position.x = Math.random() * (containerWidth - 40);
    this.position.y = -40;

    // 初始化速度
    this.speed.y = Math.random() * 20 + 1;
    if (this.position.x > containerWidth / 2) {
      this.speed.x = -(Math.random() * 2 + 1);
    } else {
      this.speed.x = Math.random() * 2 + 1;
    }
  }

  start() {
    this.stop();
    this.animate();
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private animate = () => {
    const containerWidth = this.container.clientWidth;

    // 位置到容器外
    if (
      this.position.x < -40 ||
      this.position.x > containerWidth ||
      this.position.y < -40
    ) {
      this.init();
      this.animationFrameId = requestAnimationFrame(this.animate);
      return;
    }
    // 更新位置
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // 更新速度
    this.speed.y -= 0.3; // 模拟重力

    this.animationFrameId = requestAnimationFrame(this.animate);
  };
}

const toastInstance = ref<Toast | null>(null);

onMounted(() => {
  if (container.value) {
    toastInstance.value = new Toast(container.value);
    toastInstance.value.init();
  }
});

const launch = () => {
  toastInstance.value?.start();
};

onUnmounted(() => {
  toastInstance.value?.stop();
});
</script>
