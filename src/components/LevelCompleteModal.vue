<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  stars: {
    type: Number,
    default: 0
  },
  wpm: {
    type: Number,
    default: 0
  },
  accuracy: {
    type: Number,
    default: 0
  },
  time: {
    type: Number,
    default: 0
  },
  isNewRecord: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['retry', 'next'])

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  if (mins > 0) {
    return `${mins}分${secs}秒`
  }
  return `${secs}秒`
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-overlay">
      <div class="modal-content">
        <!-- 星星动画 -->
        <div class="stars-display">
          <div
            v-for="i in 5"
            :key="i"
            class="star"
            :class="{ 'star-filled': i <= stars }"
            :style="{ animationDelay: (i * 0.15) + 's' }"
          >
            ★
          </div>
        </div>

        <h2 class="modal-title">
          {{ stars > 0 ? '恭喜过关！' : '再接再厉！' }}
        </h2>

        <!-- 统计数据 -->
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-value">{{ wpm }}</span>
            <span class="stat-label">WPM</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ accuracy }}%</span>
            <span class="stat-label">准确率</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ formatTime(time) }}</span>
            <span class="stat-label">用时</span>
          </div>
        </div>

        <!-- 新纪录提示 -->
        <div v-if="isNewRecord" class="new-record">
          🎉 新纪录！
        </div>

        <!-- 操作按钮 -->
        <div class="modal-actions">
          <button class="btn btn-secondary" @click="$emit('retry')">
            再试一次
          </button>
          <button
            v-if="stars >= 1"
            class="btn btn-primary"
            @click="$emit('next')"
          >
            下一关
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 32px;
  min-width: 360px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.dark .modal-content {
  background: #1f2937;
  color: white;
}

.stars-display {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
}

.star {
  font-size: 40px;
  color: #d1d5db;
  animation: starPop 0.5s ease backwards;
}

.star-filled {
  color: #fbbf24;
  text-shadow: 0 0 10px #fbbf24;
}

@keyframes starPop {
  0% {
    transform: scale(0) rotate(-180deg);
    opacity: 0;
  }
  100% {
    transform: scale(1) rotate(0);
    opacity: 1;
  }
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #111827;
}

.dark .modal-title {
  color: #f9fafb;
}

.stats-grid {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #3b82f6;
}

.dark .stat-value {
  color: #60a5fa;
}

.stat-label {
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
}

.dark .stat-label {
  color: #9ca3af;
}

.new-record {
  font-size: 18px;
  font-weight: 600;
  color: #f59e0b;
  margin-bottom: 20px;
  animation: bounce 0.5s ease infinite alternate;
}

@keyframes bounce {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-5px);
  }
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.btn-secondary {
  background: #e5e7eb;
  color: #374151;
}

.dark .btn-secondary {
  background: #374151;
  color: #f3f4f6;
}

.btn-secondary:hover {
  background: #d1d5db;
  transform: translateY(-2px);
}

.dark .btn-secondary:hover {
  background: #4b5563;
}

/* Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9);
}
</style>