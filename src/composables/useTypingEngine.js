import { ref, computed } from 'vue'
import { useTypingStore } from '@/stores/typing'

export function useTypingEngine() {
  const typingStore = useTypingStore()

  const isActive = ref(false)
  const lastKeyTime = ref(null)

  function init(level, content) {
    typingStore.initLevel(level, content)
    isActive.value = true
  }

  function handleKeyDown(e) {
    // 阻止默认的Backspace行为（在非输入区域）
    if (e.key === 'Backspace') {
      e.preventDefault()
    }

    // 忽略修饰键
    if (e.ctrlKey || e.altKey || e.metaKey) return

    // 处理特殊键
    if (e.key === 'Backspace') {
      typingStore.handleKeyPress('Backspace')
      return
    }

    // 只处理可打印字符
    if (e.key.length === 1 || e.key === ' ') {
      e.preventDefault()
      typingStore.handleKeyPress(e.key)
    }
  }

  function cleanup() {
    isActive.value = false
  }

  function reset() {
    typingStore.reset()
  }

  return {
    isActive,
    targetSequence: computed(() => typingStore.targetSequence),
    userInput: computed(() => typingStore.userInput),
    currentIndex: computed(() => typingStore.currentIndex),
    currentChar: computed(() => typingStore.currentChar),
    charStates: computed(() => typingStore.charStates),
    isStarted: computed(() => typingStore.isStarted),
    isCompleted: computed(() => typingStore.isCompleted),
    progress: computed(() => typingStore.progress),
    accuracy: computed(() => typingStore.accuracy),
    getWPM: typingStore.getWPM,
    getCPM: typingStore.getCPM,
    getElapsedTime: typingStore.getElapsedTime,
    init,
    handleKeyDown,
    cleanup,
    reset
  }
}