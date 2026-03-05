<script setup>
import { computed } from 'vue'
import { keyboardRows, fingerKeyMap, fingerInfo } from '@/data/keyMapping'

const props = defineProps({
  currentKey: {
    type: String,
    default: ''
  },
  showFingerColors: {
    type: Boolean,
    default: true
  }
})

// 数字行
const numberRow = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=']

// 字母行
const letterRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
]

function getKeyLabel(key) {
  if (key === ' ') return ''
  if (key === '`') return '~'
  if (key === '-') return '_'
  if (key === '=') return '+'
  if (key === '[') return '{'
  if (key === ']') return '}'
  if (key === '\\') return '|'
  if (key === ';') return ':'
  if (key === "'") return '"'
  if (key === ',') return '<'
  if (key === '.') return '>'
  if (key === '/') return '?'
  return key.toUpperCase()
}

function getFingerId(key) {
  return fingerKeyMap[key.toLowerCase()] || null
}

function getFingerColor(fingerId) {
  if (!fingerId || !props.showFingerColors) return null
  return fingerInfo[fingerId]?.color || null
}

function getFingerName(fingerId) {
  return fingerId ? fingerInfo[fingerId]?.name : ''
}

function isCurrentKey(key) {
  return props.currentKey && props.currentKey.toLowerCase() === key.toLowerCase()
}

function isSpaceKey(key) {
  return key === ' '
}
</script>

<template>
  <div class="virtual-keyboard">
    <!-- 数字行 -->
    <div class="key-row">
      <div
        v-for="key in numberRow"
        :key="'num-' + key"
        class="key"
        :class="{
          'key-space': isSpaceKey(key),
          'key-active': isCurrentKey(key),
          'has-finger-color': getFingerColor(getFingerId(key))
        }"
        :style="getFingerColor(getFingerId(key)) ? { '--finger-color': getFingerColor(getFingerId(key)) } : {}"
        :title="getFingerName(getFingerId(key))"
      >
        <span class="key-main">{{ getKeyLabel(key) }}</span>
      </div>
    </div>

    <!-- 字母行1 -->
    <div class="key-row">
      <div
        v-for="key in letterRows[0]"
        :key="'letter1-' + key"
        class="key"
        :class="{
          'key-space': isSpaceKey(key),
          'key-active': isCurrentKey(key),
          'has-finger-color': getFingerColor(getFingerId(key))
        }"
        :style="getFingerColor(getFingerId(key)) ? { '--finger-color': getFingerColor(getFingerId(key)) } : {}"
        :title="getFingerName(getFingerId(key))"
      >
        <span class="key-main">{{ getKeyLabel(key) }}</span>
      </div>
    </div>

    <!-- 字母行2 (Home Row) -->
    <div class="key-row">
      <div
        v-for="key in letterRows[1]"
        :key="'letter2-' + key"
        class="key"
        :class="{
          'key-space': isSpaceKey(key),
          'key-active': isCurrentKey(key),
          'home-row': true,
          'has-finger-color': getFingerColor(getFingerId(key))
        }"
        :style="getFingerColor(getFingerId(key)) ? { '--finger-color': getFingerColor(getFingerId(key)) } : {}"
        :title="getFingerName(getFingerId(key))"
      >
        <span class="key-main">{{ getKeyLabel(key) }}</span>
        <span v-if="['f', 'j'].includes(key)" class="key-bump"></span>
      </div>
    </div>

    <!-- 字母行3 -->
    <div class="key-row">
      <div
        v-for="key in letterRows[2]"
        :key="'letter3-' + key"
        class="key"
        :class="{
          'key-space': isSpaceKey(key),
          'key-active': isCurrentKey(key),
          'has-finger-color': getFingerColor(getFingerId(key))
        }"
        :style="getFingerColor(getFingerId(key)) ? { '--finger-color': getFingerColor(getFingerId(key)) } : {}"
        :title="getFingerName(getFingerId(key))"
      >
        <span class="key-main">{{ getKeyLabel(key) }}</span>
      </div>
    </div>

    <!-- 空格行 -->
    <div class="key-row">
      <div
        class="key key-spacebar"
        :class="{ 'key-active': isCurrentKey(' '), 'has-finger-color': getFingerColor('THUMB') }"
        :style="getFingerColor('THUMB') ? { '--finger-color': getFingerColor('THUMB') } : {}"
      >
        <span class="key-main">空格</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.virtual-keyboard {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 20px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 10px 15px -3px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 white;
  user-select: none;
}

.dark .virtual-keyboard {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.3),
    0 10px 15px -3px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.key-row {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.key {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 48px;
  padding: 0 10px;
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  color: #475569;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.04),
    0 1px 2px rgba(0, 0, 0, 0.06);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.dark .key {
  background: linear-gradient(145deg, #334155 0%, #475569 100%);
  border-color: #64748b;
  color: #e2e8f0;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.3);
}

.key::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--finger-color, transparent);
  opacity: 0;
  transition: opacity 0.2s ease;
  border-radius: 9px;
}

/* 有手指颜色的按键显示淡色背景 */
.key.has-finger-color::before {
  opacity: 0.3;
}

.key.has-finger-color:hover::before {
  opacity: 0.45;
}

.key:hover {
  transform: translateY(-2px);
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.08),
    0 2px 4px rgba(0, 0, 0, 0.06);
}

.dark .key:hover {
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.3),
    0 2px 4px rgba(0, 0, 0, 0.4);
}

/* 当前要敲击的按键 - 强调突出 */
.key-active {
  transform: translateY(1px) scale(1.1);
  box-shadow:
    0 0 0 3px var(--finger-color),
    0 0 20px var(--finger-color),
    0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: var(--finger-color, #94a3b8);
  z-index: 10;
  animation: keyPulse 1s ease-in-out infinite;
}

.key-active::before {
  opacity: 0.8;
}

.dark .key-active {
  box-shadow:
    0 0 0 3px var(--finger-color),
    0 0 20px var(--finger-color),
    0 4px 12px rgba(0, 0, 0, 0.4);
}

@keyframes keyPulse {
  0%, 100% {
    transform: translateY(1px) scale(1.1);
  }
  50% {
    transform: translateY(1px) scale(1.15);
  }
}

.key-space {
  min-width: 60px;
}

.key-spacebar {
  min-width: 320px;
  max-width: 480px;
  flex: 1;
}

.key-main {
  position: relative;
  z-index: 1;
}

.key-bump {
  position: absolute;
  bottom: 8px;
  width: 4px;
  height: 4px;
  background: #cbd5e1;
  border-radius: 50%;
}

.dark .key-bump {
  background: #64748b;
}

.home-row {
  border-top: 3px solid var(--finger-color, #cbd5e1);
}

.dark .home-row {
  border-top-color: var(--finger-color, #475569);
}
</style>
