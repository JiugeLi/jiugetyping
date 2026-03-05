<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { getLevelById, getAllLevels } from '@/data/levels'
import { useTypingEngine } from '@/composables/useTypingEngine'
import { useFingerGuide } from '@/composables/useFingerGuide'
import { useStats } from '@/composables/useStats'
import { useSoundEffect, SOUND_NAMES } from '@/composables/useSoundEffect'
import { useLocale } from '@/composables/useLocale'
import { generateContentForLevel } from '@/utils/contentGenerator'
import VirtualKeyboard from '@/components/VirtualKeyboard.vue'
import VirtualHands from '@/components/VirtualHands.vue'
import LevelCompleteModal from '@/components/LevelCompleteModal.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { getLocalizedText } = useLocale()

const levelId = computed(() => route.params.levelId)
const level = computed(() => getLevelById(levelId.value))
const allLevels = getAllLevels()

// 本地化关卡标题
const levelTitle = computed(() => {
  return level.value ? getLocalizedText(level.value.title) : ''
})

// Composables
const typingEngine = useTypingEngine()
const fingerGuide = useFingerGuide()
const stats = useStats()
const soundEffect = useSoundEffect()

// 状态
const showCompleteModal = ref(false)
const lastResult = ref(null)
const completedStats = ref(null)

// 获取练习内容（根据模式）
function getPracticeContent() {
  if (!level.value) return ''

  const mode = userStore.settings.practiceMode || 'random'

  if (mode === 'random') {
    // 随机模式：每次生成新内容
    const randomContent = generateContentForLevel(level.value)
    console.log('生成随机内容:', randomContent) // 调试日志
    return randomContent
  } else {
    // 固定模式：使用预设内容
    console.log('使用固定内容:', level.value.content) // 调试日志
    return level.value.content
  }
}

// 初始化关卡
function initLevel() {
  if (level.value) {
    const content = getPracticeContent()
    typingEngine.init(level.value, content)
    stats.reset()
    stats.setStartTime(Date.now())
    lastResult.value = null
    completedStats.value = null
    showCompleteModal.value = false
  }
}

// 监听关卡变化，重新初始化
watch(levelId, () => {
  initLevel()
})

// 初始化关卡
onMounted(() => {
  if (level.value) {
    initLevel()
    window.addEventListener('keydown', handleKeyDown)
  }
})

onUnmounted(() => {
  typingEngine.cleanup()
  window.removeEventListener('keydown', handleKeyDown)
})

// 当前目标字符对应的手指
const activeFinger = computed(() => {
  return typingEngine.currentChar.value
    ? fingerGuide.getFingerForChar(typingEngine.currentChar.value)?.key
    : null
})

function handleKeyDown(e) {
  const prevIndex = typingEngine.currentIndex.value
  typingEngine.handleKeyDown(e)

  // 记录统计
  const currentIndex = typingEngine.currentIndex.value
  if (currentIndex > prevIndex) {
    const char = typingEngine.targetSequence.value[prevIndex]
    const expectedChar = char
    const actualChar = typingEngine.userInput.value[prevIndex]
    const isCorrect = expectedChar === actualChar
    const fingerId = fingerGuide.getFingerForChar(char)?.key

    stats.recordKeystroke(fingerId, isCorrect, char)

    // 播放音效
    if (isCorrect) {
      soundEffect.playKeySound()
    } else {
      soundEffect.playErrorKeySound()
    }

    // 记录手指按压结果
    lastResult.value = isCorrect ? 'correct' : 'incorrect'

    // 清除结果状态
    setTimeout(() => {
      if (lastResult.value === (isCorrect ? 'correct' : 'incorrect')) {
        lastResult.value = null
      }
    }, 300)
  }

  // 检查完成
  if (typingEngine.isCompleted.value) {
    handleLevelComplete()
  }
}

function handleLevelComplete() {
  const wpm = typingEngine.getWPM()
  const accuracy = typingEngine.accuracy.value
  const stars = stats.calculateStars(level.value, accuracy, wpm)
  const time = typingEngine.getElapsedTime()

  // 保存进度
  const existingProgress = userStore.progress[level.value.id] || {}
  const isNewRecord = !existingProgress.stars || stars > existingProgress.stars

  userStore.updateLevelProgress(level.value.id, {
    stars,
    bestWpm: Math.max(wpm, existingProgress.bestWpm || 0),
    bestAccuracy: Math.max(accuracy, existingProgress.bestAccuracy || 0)
  })

  completedStats.value = { wpm, accuracy, stars, time, isNewRecord }
  showCompleteModal.value = true
}

function retry() {
  showCompleteModal.value = false
  // 重新生成内容（随机模式）或使用固定内容
  const content = getPracticeContent()
  typingEngine.init(level.value, content)
  stats.reset()
  stats.setStartTime(Date.now())
}

function nextLevel() {
  showCompleteModal.value = false
  const currentIndex = allLevels.findIndex(l => l.id === levelId.value)
  if (currentIndex < allLevels.length - 1) {
    const nextId = allLevels[currentIndex + 1].id
    router.push(`/practice/${nextId}`)
  } else {
    router.push('/')
  }
}

function togglePracticeMode() {
  const newMode = userStore.settings.practiceMode === 'random' ? 'fixed' : 'random'
  userStore.updateSettings({ practiceMode: newMode })
  // 重新初始化当前关卡以应用新模式
  initLevel()
}

// 格式化显示文本
const displayContent = computed(() => {
  // 显示 typingEngine 中的实际内容（可能是随机生成的）
  // typingEngine.targetSequence 是一个 computed，返回 ref
  // 需要用 .value 来获取实际的字符串
  const content = typingEngine.targetSequence?.value || typingEngine.targetSequence || level.value?.content || ''
  // 确保返回的是字符串
  return Array.isArray(content) ? content.join('') : content
})

// 状态样式
function getCharStateClass(index) {
  const state = typingEngine.charStates.value[index]
  return {
    'char-pending': state === 'pending',
    'char-current': state === 'current',
    'char-correct': state === 'correct',
    'char-incorrect': state === 'incorrect'
  }
}

// 计算字符在整体内容中的索引
function getCharIndex(lineIndex, charIndex, line) {
  const lines = displayContent.value.split('\n')
  let index = 0
  for (let i = 0; i < lineIndex; i++) {
    // 每行的长度 + 1（换行符本身也占一个位置）
    index += lines[i].length + 1
  }
  return index + charIndex
}

// 实时显示的WPM
const displayWPM = computed(() => {
  if (!typingEngine.isStarted.value) return 0
  return typingEngine.getWPM()
})
</script>

<template>
  <div class="practice-page">
    <!-- 左侧关卡列表 -->
    <aside class="level-sidebar">
      <div class="sidebar-header">
        <button class="back-button" @click="router.push('/')">
          ← 返回
        </button>
        <h3 class="sidebar-title">选择关卡</h3>
      </div>
      <div class="level-list">
        <button
          v-for="(levelItem, index) in allLevels"
          :key="levelItem.id"
          class="level-item"
          :class="{ active: levelId === levelItem.id }"
          @click="router.push(`/practice/${levelItem.id}`)"
        >
          <div class="level-item-header">
            <span class="level-item-number">{{ index + 1 }}</span>
            <span class="level-item-title">{{ getLocalizedText(levelItem.title) }}</span>
          </div>
          <span class="level-item-stars" v-if="userStore.progress[levelItem.id]?.stars">
            {{ '⭐'.repeat(userStore.progress[levelItem.id].stars) }}
          </span>
        </button>
      </div>
    </aside>

    <!-- 主内容区 -->
    <main class="practice-main">
      <!-- 顶部状态栏 -->
      <header class="top-bar">
        <!-- 左侧：关卡信息和模式切换 -->
        <div class="level-section">
          <div class="level-info-card">
            <div class="level-number-badge">
              {{ allLevels.findIndex(l => l.id === levelId.value) + 1 }}
            </div>
            <div class="level-text">
              <h1 class="level-title">{{ levelTitle }}</h1>
              <p class="level-subtitle">Level {{ levelId }}</p>
            </div>
          </div>

          <div class="mode-switcher">
            <button
              class="mode-option"
              :class="{ active: userStore.settings.practiceMode === 'fixed' }"
              @click="togglePracticeMode"
            >
              <span class="mode-icon">📝</span>
              <span class="mode-text">固定模式</span>
            </button>
            <button
              class="mode-option"
              :class="{ active: userStore.settings.practiceMode === 'random' }"
              @click="togglePracticeMode"
            >
              <span class="mode-icon">🎲</span>
              <span class="mode-text">随机模式</span>
            </button>
          </div>
        </div>

        <!-- 右侧：统计和音效 -->
        <div class="stats-section">
          <div class="stat-card">
            <div class="stat-icon">⚡</div>
            <div class="stat-info">
              <span class="stat-label">速度</span>
              <span class="stat-value">{{ displayWPM }} <small class="stat-unit">WPM</small></span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🎯</div>
            <div class="stat-info">
              <span class="stat-label">准确率</span>
              <span class="stat-value">{{ typingEngine.accuracy.value }}<small class="stat-unit">%</small></span>
            </div>
          </div>
          <div class="sound-card">
            <select
              v-model="userStore.settings.soundType"
              @change="userStore.updateSettings({ soundType: userStore.settings.soundType })"
              class="sound-selector"
              title="选择声音类型"
            >
              <option v-for="(name, type) in SOUND_NAMES" :key="type" :value="type">
                {{ name }}
              </option>
            </select>
            <button
              @click="soundEffect.previewSound(userStore.settings.soundType)"
              class="preview-button"
              title="试听当前音色"
            >
              🔊
            </button>
          </div>
        </div>
      </header>

      <!-- 文本显示区 -->
      <div class="text-display">
        <div class="text-content">
          <template v-for="(line, lineIndex) in displayContent.split('\n')" :key="lineIndex">
            <div class="text-line">
              <span
                v-for="(char, charIndex) in line.split('')"
                :key="`${lineIndex}-${charIndex}`"
                class="char"
                :class="getCharStateClass(getCharIndex(lineIndex, charIndex, line))"
              >{{ char === ' ' ? '\u00A0' : char }}</span>
            </div>
          </template>
        </div>
      </div>

      <!-- 进度条 -->
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: typingEngine.progress.value + '%' }"
        ></div>
      </div>

      <!-- 虚拟键盘 -->
      <div class="keyboard-section">
        <VirtualKeyboard
          :current-key="typingEngine.currentChar.value"
          :show-finger-colors="true"
        />
      </div>

      <!-- 虚拟手 -->
      <div v-if="userStore.settings.showVirtualHands" class="hands-section">
        <VirtualHands
          :active-finger="activeFinger"
          :last-result="lastResult"
        />
      </div>
    </main>

    <!-- 完成弹窗 -->
    <LevelCompleteModal
      :show="showCompleteModal"
      :stars="completedStats?.stars || 0"
      :wpm="completedStats?.wpm || 0"
      :accuracy="completedStats?.accuracy || 0"
      :time="completedStats?.time || 0"
      :is-new-record="completedStats?.isNewRecord || false"
      @retry="retry"
      @next="nextLevel"
    />
  </div>
</template>

<style scoped>
.practice-page {
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  gap: 0;
}

.dark .practice-page {
  background: #0f172a;
}

/* 左侧侧边栏 */
.level-sidebar {
  width: 280px;
  background: white;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.dark .level-sidebar {
  background: #1e293b;
  border-right-color: #334155;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
}

.dark .sidebar-header {
  border-bottom-color: #334155;
}

.sidebar-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 12px 0 0 0;
}

.dark .sidebar-title {
  color: #f1f5f9;
}

.back-button {
  width: 100%;
  padding: 10px 16px;
  background: #f1f5f9;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  transition: all 0.2s ease;
}

.dark .back-button {
  background: #334155;
  color: #94a3b8;
}

.back-button:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.dark .back-button:hover {
  background: #475569;
  color: #f1f5f9;
}

.level-list {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: calc(100vh - 200px);
}

/* 自定义滚动条 */
.level-list::-webkit-scrollbar {
  width: 6px;
}

.level-list::-webkit-scrollbar-track {
  background: transparent;
}

.level-list::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.dark .level-list::-webkit-scrollbar-thumb {
  background: #475569;
}

.level-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  gap: 6px;
}

.dark .level-item {
  background: #334155;
  border-color: #475569;
}

.level-item:hover {
  border-color: #3b82f6;
  background: white;
  transform: translateX(4px);
}

.dark .level-item:hover {
  background: #475569;
}

.level-item.active {
  border-color: #3b82f6;
  background: #eff6ff;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}

.dark .level-item.active {
  background: #1e3a8a;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.level-item-header {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.level-item-number {
  font-size: 18px;
  font-weight: 700;
  color: #3b82f6;
  min-width: 28px;
}

.level-item-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  flex: 1;
}

.dark .level-item-title {
  color: #f1f5f9;
}

.level-item-stars {
  font-size: 12px;
  color: #f59e0b;
}

/* 主内容区 */
.practice-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  overflow-y: auto;
}

/* 顶部状态栏 */
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.dark .top-bar {
  background: #1e293b;
}

/* 左侧区域：关卡信息 + 模式切换 */
.level-section {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.level-info-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border-radius: 12px;
  border: 2px solid #3b82f6;
}

.dark .level-info-card {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  border-color: #3b82f6;
}

.level-number-badge {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  font-size: 20px;
  font-weight: 800;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
}

.level-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.level-title {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  line-height: 1.2;
}

.dark .level-title {
  color: #f1f5f9;
}

.level-subtitle {
  font-size: 12px;
  font-weight: 600;
  color: #3b82f6;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 模式切换器 */
.mode-switcher {
  display: flex;
  gap: 8px;
  background: #f1f5f9;
  padding: 4px;
  border-radius: 12px;
}

.dark .mode-switcher {
  background: #334155;
}

.mode-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
}

.dark .mode-option {
  color: #94a3b8;
}

.mode-option:hover {
  background: white;
  color: #1e293b;
}

.dark .mode-option:hover {
  background: #475569;
  color: #f1f5f9;
}

.mode-option.active {
  background: white;
  color: #3b82f6;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.dark .mode-option.active {
  background: #475569;
  color: #60a5fa;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.mode-icon {
  font-size: 18px;
}

.mode-text {
  font-size: 13px;
  font-weight: 600;
}

/* 右侧区域：统计 + 音效 */
.stats-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.dark .stat-card {
  background: #334155;
  border-color: #475569;
}

.stat-icon {
  font-size: 24px;
  line-height: 1;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-label {
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
}

.dark .stat-value {
  color: #f1f5f9;
}

.stat-unit {
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  margin-left: 2px;
}

/* 音效卡片 */
.sound-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.dark .sound-card {
  background: #334155;
  border-color: #475569;
}

.sound-selector {
  padding: 8px 12px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dark .sound-selector {
  background: #475569;
  border-color: #64748b;
  color: #94a3b8;
}

.sound-selector:hover {
  border-color: #3b82f6;
}

.preview-button {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
}

.preview-button:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.preview-button:active {
  transform: scale(0.95);
}

.text-display {
  background: white;
  border-radius: 16px;
  padding: 40px 20px;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dark .text-display {
  background: #1e293b;
}

.text-content {
  font-size: 32px;
  font-family: 'Courier New', monospace;
  letter-spacing: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.text-line {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
}

.char {
  display: inline-block;
  padding: 4px 2px;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.char-pending {
  color: #64748b;
}

.char-current {
  background: #3b82f6;
  color: white;
  animation: pulse 1s ease infinite;
}

.char-correct {
  color: #22c55e;
}

.char-incorrect {
  color: #ef4444;
  text-decoration: underline;
  text-decoration-color: #ef4444;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.progress-bar {
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
}

.dark .progress-bar {
  background: #334155;
}

.progress-fill {
  height: 100%;
  background: #3b82f6;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.keyboard-section {
  display: flex;
  justify-content: center;
}

.hands-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .top-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .level-section {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .level-info-card {
    justify-content: center;
  }

  .mode-switcher {
    justify-content: center;
  }

  .stats-section {
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media (max-width: 1024px) {
  .level-sidebar {
    width: 240px;
  }

  .level-item {
    padding: 10px;
  }

  .level-item-title {
    font-size: 13px;
  }

  .level-number-badge {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }

  .level-title {
    font-size: 16px;
  }

  .stat-card {
    padding: 10px 12px;
  }

  .stat-value {
    font-size: 16px;
  }
}

@media (max-width: 768px) {
  .practice-page {
    flex-direction: column;
  }

  .level-sidebar {
    width: 100%;
    height: auto;
    max-height: 200px;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
  }

  .dark .level-sidebar {
    border-bottom-color: #334155;
  }

  .level-list {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: visible;
  }

  .level-list::-webkit-scrollbar {
    width: auto;
    height: 6px;
  }

  .level-item {
    min-width: 140px;
    flex-shrink: 0;
  }

  .practice-main {
    padding: 12px;
    gap: 12px;
  }

  .top-bar {
    padding: 12px;
  }

  .level-info-card {
    padding: 10px 12px;
  }

  .level-number-badge {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }

  .level-title {
    font-size: 14px;
  }

  .level-subtitle {
    font-size: 10px;
  }

  .mode-option {
    padding: 8px 12px;
  }

  .mode-text {
    font-size: 12px;
  }

  .stat-card {
    padding: 8px 10px;
  }

  .stat-icon {
    font-size: 20px;
  }

  .stat-value {
    font-size: 14px;
  }

  .stat-unit {
    font-size: 9px;
  }

  .sound-card {
    padding: 6px;
  }

  .text-display {
    min-height: 140px;
    padding: 24px 16px;
  }

  .text-content {
    font-size: 24px;
    letter-spacing: 2px;
  }
}

@media (max-width: 480px) {
  .sidebar-header {
    padding: 12px;
  }

  .sidebar-title {
    font-size: 16px;
  }

  .level-item-number {
    font-size: 16px;
  }

  .level-item-title {
    font-size: 12px;
  }

  .mode-switcher {
    width: 100%;
  }

  .mode-option {
    flex: 1;
    justify-content: center;
    padding: 8px;
  }

  .mode-text {
    display: none;
  }

  .stats-section {
    gap: 8px;
  }

  .stat-card {
    padding: 6px 8px;
    gap: 6px;
  }

  .stat-icon {
    font-size: 18px;
  }

  .stat-label {
    display: none;
  }

  .stat-value {
    font-size: 13px;
  }

  .sound-selector {
    padding: 6px 8px;
    font-size: 12px;
  }

  .preview-button {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }

  .text-content {
    font-size: 20px;
    letter-spacing: 1px;
  }
}
</style>