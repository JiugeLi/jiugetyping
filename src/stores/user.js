import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { SOUND_TYPES } from '@/composables/useSoundEffect'

export const useUserStore = defineStore('user', () => {
  const settings = ref({
    theme: 'light',
    soundType: SOUND_TYPES.MECHANICAL,
    showVirtualHands: true,
    shuangpinScheme: 'xiaohé',
    locale: null, // null 表示未设置，需要自动检测
    practiceMode: 'fixed' // 'random' 或 'fixed'
  })

  // 关卡进度：{ levelId: { stars: number, bestWpm: number, bestAccuracy: number, completed: boolean } }
  const progress = ref({})

  // 手指表现数据
  const fingerStats = ref({})

  const mode = ref('en') // 'en' | 'pinyin' | 'shuangpin'

  function setMode(newMode) {
    mode.value = newMode
  }

  function updateSettings(newSettings) {
    settings.value = { ...settings.value, ...newSettings }
    saveProgress()
  }

  function updateLevelProgress(levelId, data) {
    const existing = progress.value[levelId]
    if (!existing || data.stars > existing.stars) {
      progress.value[levelId] = {
        ...existing,
        ...data,
        completed: true
      }
    }
    saveProgress()
  }

  function updateFingerStats(fingerId, stats) {
    fingerStats.value[fingerId] = {
      ...fingerStats.value[fingerId],
      ...stats
    }
  }

  function isLevelUnlocked(levelId, prerequisite) {
    return true // 所有关卡都解锁，无需前置条件
  }

  function getStarsForLevel(levelId) {
    return progress.value[levelId]?.stars || 0
  }

  // 从IndexedDB加载进度
  async function loadProgress() {
    try {
      const saved = localStorage.getItem('touchtype-progress')
      if (saved) {
        const data = JSON.parse(saved)
        progress.value = data.progress || {}
        fingerStats.value = data.fingerStats || {}
        settings.value = { ...settings.value, ...data.settings }
      }
    } catch (e) {
      console.error('Failed to load progress:', e)
    }
  }

  // 保存进度到localStorage（MVP阶段使用）
  function saveProgress() {
    try {
      localStorage.setItem('touchtype-progress', JSON.stringify({
        progress: progress.value,
        fingerStats: fingerStats.value,
        settings: settings.value
      }))
    } catch (e) {
      console.error('Failed to save progress:', e)
    }
  }

  // 初始化加载
  loadProgress()

  return {
    settings,
    progress,
    fingerStats,
    mode,
    setMode,
    updateSettings,
    updateLevelProgress,
    updateFingerStats,
    isLevelUnlocked,
    getStarsForLevel,
    loadProgress,
    saveProgress
  }
})