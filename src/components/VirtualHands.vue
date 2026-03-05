<script setup>
import { computed } from 'vue'
import { fingerInfo } from '@/data/keyMapping'

const props = defineProps({
  activeFinger: {
    type: String,
    default: null
  },
  lastResult: {
    type: String,
    default: null
  }
})

// 获取手指颜色
function getFingerColor(fingerId) {
  return fingerInfo[fingerId]?.color || '#94a3b8'
}

// 获取手指名称
function getFingerDisplayName(fingerId) {
  if (!fingerId) return ''
  return fingerInfo[fingerId]?.name || ''
}

// 检查手指是否激活
function isFingerActive(fingerId) {
  return props.activeFinger === fingerId
}

// 检查结果样式
function getResultClass(fingerId) {
  if (props.activeFinger !== fingerId) return ''
  return props.lastResult ? `result-${props.lastResult}` : 'active'
}

// 手指名称
const fingerNames = {
  L1: '小指', L2: '无名指', L3: '中指', L4: '食指',
  R4: '食指', R3: '中指', R2: '无名指', R1: '小指'
}

// 手指长度（用于SVG定位）
const fingerLengths = {
  L1: 45, L2: 55, L3: 65, L4: 60,
  R4: 60, R3: 65, R2: 55, R1: 45
}

// 手指宽度
const fingerWidths = {
  L1: 14, L2: 16, L3: 18, L4: 17,
  R4: 17, R3: 18, R2: 16, R1: 14
}
</script>

<template>
  <div class="hands-wrapper">
    <!-- 手指提示文字 -->
    <div v-if="activeFinger" class="finger-hint">
      <span class="hint-text" :style="{ color: getFingerColor(activeFinger) }">
        使用 {{ getFingerDisplayName(activeFinger) }}
      </span>
    </div>

    <div class="hands-container">
      <!-- 左手 -->
      <div class="hand-wrapper">
        <svg class="hand-svg hand-left" viewBox="0 0 180 200">
          <defs>
            <filter id="glow-left" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="fingerGradientLeft" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" style="stop-color:#dbeafe;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#bfdbfe;stop-opacity:1" />
            </linearGradient>
          </defs>

          <!-- 手掌 -->
          <path
            class="palm"
            d="M70,120 Q55,145 65,165 Q90,180 115,165 Q125,145 110,120 Q90,110 70,120 Z"
            fill="url(#fingerGradientLeft)"
          />

          <!-- 左手手指 -->
          <!-- 小指 L1 -->
          <g :class="['finger-group', getResultClass('L1')]">
            <rect
              :x="43" :y="40" :width="fingerWidths.L1" :height="fingerLengths.L1"
              :rx="fingerWidths.L1/2"
              class="finger-bone"
              :fill="isFingerActive('L1') ? getFingerColor('L1') : 'url(#fingerGradientLeft)'"
            />
            <ellipse
              :cx="43 + fingerWidths.L1/2" cy="40" :rx="fingerWidths.L1/2" ry="10"
              class="finger-tip"
              :fill="isFingerActive('L1') ? getFingerColor('L1') : '#bfdbfe'"
            />
          </g>

          <!-- 无名指 L2 -->
          <g :class="['finger-group', getResultClass('L2')]">
            <rect
              :x="60" :y="28" :width="fingerWidths.L2" :height="fingerLengths.L2"
              :rx="fingerWidths.L2/2"
              class="finger-bone"
              :fill="isFingerActive('L2') ? getFingerColor('L2') : 'url(#fingerGradientLeft)'"
            />
            <ellipse
              :cx="60 + fingerWidths.L2/2" cy="28" :rx="fingerWidths.L2/2" ry="11"
              class="finger-tip"
              :fill="isFingerActive('L2') ? getFingerColor('L2') : '#bfdbfe'"
            />
          </g>

          <!-- 中指 L3 -->
          <g :class="['finger-group', getResultClass('L3')]">
            <rect
              :x="79" :y="16" :width="fingerWidths.L3" :height="fingerLengths.L3"
              :rx="fingerWidths.L3/2"
              class="finger-bone"
              :fill="isFingerActive('L3') ? getFingerColor('L3') : 'url(#fingerGradientLeft)'"
            />
            <ellipse
              :cx="79 + fingerWidths.L3/2" cy="16" :rx="fingerWidths.L3/2" ry="12"
              class="finger-tip"
              :fill="isFingerActive('L3') ? getFingerColor('L3') : '#bfdbfe'"
            />
          </g>

          <!-- 食指 L4 -->
          <g :class="['finger-group', getResultClass('L4')]">
            <rect
              :x="100" :y="26" :width="fingerWidths.L4" :height="fingerLengths.L4"
              :rx="fingerWidths.L4/2"
              class="finger-bone"
              :fill="isFingerActive('L4') ? getFingerColor('L4') : 'url(#fingerGradientLeft)'"
            />
            <ellipse
              :cx="100 + fingerWidths.L4/2" cy="26" :rx="fingerWidths.L4/2" ry="11"
              class="finger-tip"
              :fill="isFingerActive('L4') ? getFingerColor('L4') : '#bfdbfe'"
            />
          </g>

          <!-- 拇指 -->
          <g :class="['finger-group', getResultClass('THUMB')]">
            <ellipse
              cx="130" cy="135" rx="16" ry="22"
              class="finger-tip thumb"
              :fill="isFingerActive('THUMB') ? '#1f2937' : '#dbeafe'"
            />
          </g>
        </svg>
      </div>

      <!-- 右手 -->
      <div class="hand-wrapper">
        <svg class="hand-svg hand-right" viewBox="0 0 180 200">
          <defs>
            <filter id="glow-right" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="fingerGradientRight" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" style="stop-color:#dbeafe;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#bfdbfe;stop-opacity:1" />
            </linearGradient>
          </defs>

          <!-- 手掌 -->
          <path
            class="palm"
            d="M70,120 Q55,145 65,165 Q90,180 115,165 Q125,145 110,120 Q90,110 70,120 Z"
            fill="url(#fingerGradientRight)"
          />

          <!-- 右手手指 -->
          <!-- 拇指 -->
          <g :class="['finger-group', getResultClass('THUMB')]">
            <ellipse
              cx="50" cy="135" rx="16" ry="22"
              class="finger-tip thumb"
              :fill="isFingerActive('THUMB') ? '#1f2937' : '#dbeafe'"
            />
          </g>

          <!-- 食指 R4 -->
          <g :class="['finger-group', getResultClass('R4')]">
            <rect
              :x="60" :y="26" :width="fingerWidths.R4" :height="fingerLengths.R4"
              :rx="fingerWidths.R4/2"
              class="finger-bone"
              :fill="isFingerActive('R4') ? getFingerColor('R4') : 'url(#fingerGradientRight)'"
            />
            <ellipse
              :cx="60 + fingerWidths.R4/2" cy="26" :rx="fingerWidths.R4/2" ry="11"
              class="finger-tip"
              :fill="isFingerActive('R4') ? getFingerColor('R4') : '#bfdbfe'"
            />
          </g>

          <!-- 中指 R3 -->
          <g :class="['finger-group', getResultClass('R3')]">
            <rect
              :x="80" :y="16" :width="fingerWidths.R3" :height="fingerLengths.R3"
              :rx="fingerWidths.R3/2"
              class="finger-bone"
              :fill="isFingerActive('R3') ? getFingerColor('R3') : 'url(#fingerGradientRight)'"
            />
            <ellipse
              :cx="80 + fingerWidths.R3/2" cy="16" :rx="fingerWidths.R3/2" ry="12"
              class="finger-tip"
              :fill="isFingerActive('R3') ? getFingerColor('R3') : '#bfdbfe'"
            />
          </g>

          <!-- 无名指 R2 -->
          <g :class="['finger-group', getResultClass('R2')]">
            <rect
              :x="101" :y="28" :width="fingerWidths.R2" :height="fingerLengths.R2"
              :rx="fingerWidths.R2/2"
              class="finger-bone"
              :fill="isFingerActive('R2') ? getFingerColor('R2') : 'url(#fingerGradientRight)'"
            />
            <ellipse
              :cx="101 + fingerWidths.R2/2" cy="28" :rx="fingerWidths.R2/2" ry="11"
              class="finger-tip"
              :fill="isFingerActive('R2') ? getFingerColor('R2') : '#bfdbfe'"
            />
          </g>

          <!-- 小指 R1 -->
          <g :class="['finger-group', getResultClass('R1')]">
            <rect
              :x="120" :y="40" :width="fingerWidths.R1" :height="fingerLengths.R1"
              :rx="fingerWidths.R1/2"
              class="finger-bone"
              :fill="isFingerActive('R1') ? getFingerColor('R1') : 'url(#fingerGradientRight)'"
            />
            <ellipse
              :cx="120 + fingerWidths.R1/2" cy="40" :rx="fingerWidths.R1/2" ry="10"
              class="finger-tip"
              :fill="isFingerActive('R1') ? getFingerColor('R1') : '#bfdbfe'"
            />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hands-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.finger-hint {
  margin-bottom: 16px;
  padding: 10px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  animation: fadeInSlide 0.3s ease;
}

.dark .finger-hint {
  background: #1e293b;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

@keyframes fadeInSlide {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hint-text {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}

.hands-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 20px;
}

.hand-wrapper {
  position: relative;
}

.hand-svg {
  width: 140px;
  height: 160px;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.08));
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark .hand-svg {
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.25));
}

.palm {
  filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.2));
  transition: filter 0.3s ease;
}

.dark .palm {
  filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.1));
}

.finger-group {
  transition: all 0.2s ease;
}

.finger-bone {
  transition: fill 0.2s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.finger-tip {
  transition: fill 0.2s ease, filter 0.2s ease;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.12));
}

.thumb {
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.15));
}

/* 激活状态 */
.finger-group.active .finger-bone,
.finger-group.active .finger-tip {
  filter: drop-shadow(0 0 12px currentColor);
}

.finger-group.active .finger-tip {
  filter: drop-shadow(0 0 16px currentColor);
}

/* 正确结果 - 绿色脉动 */
.finger-group.result-correct .finger-bone {
  animation: correctPulse 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.finger-group.result-correct .finger-bone,
.finger-group.result-correct .finger-tip {
  fill: #22c55e !important;
  filter: drop-shadow(0 0 20px #22c55e);
}

/* 错误结果 - 红色抖动 */
.finger-group.result-incorrect .finger-bone {
  animation: errorShake 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.finger-group.result-incorrect .finger-bone,
.finger-group.result-incorrect .finger-tip {
  fill: #ef4444 !important;
  filter: drop-shadow(0 0 20px #ef4444);
}

@keyframes correctPulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.08);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes errorShake {
  0%, 100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-6px) rotate(-2deg);
  }
  40% {
    transform: translateX(6px) rotate(2deg);
  }
  60% {
    transform: translateX(-4px) rotate(-1deg);
  }
  80% {
    transform: translateX(4px) rotate(1deg);
  }
}

/* 暗色模式优化 */
.dark .finger-bone {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25));
}

.dark .finger-tip {
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
}

/* 响应式设计 */
@media (max-width: 640px) {
  .hands-container {
    gap: 20px;
    padding: 10px;
  }

  .hand-svg {
    width: 120px;
    height: 140px;
  }

  .hint-text {
    font-size: 16px;
  }
}
</style>
