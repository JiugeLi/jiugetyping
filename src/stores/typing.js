import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTypingStore = defineStore('typing', () => {
  const currentLevel = ref(null)
  const targetSequence = ref([])
  const userInput = ref([])
  const currentIndex = ref(0)
  const isStarted = ref(false)
  const isCompleted = ref(false)
  const startTime = ref(null)
  const endTime = ref(null)

  // 每个字符的状态：'pending' | 'correct' | 'incorrect'
  const charStates = computed(() => {
    return targetSequence.value.map((char, index) => {
      if (index < currentIndex.value) {
        return userInput.value[index] === char ? 'correct' : 'incorrect'
      } else if (index === currentIndex.value) {
        return 'current'
      }
      return 'pending'
    })
  })

  const currentChar = computed(() => {
    return targetSequence.value[currentIndex.value] || null
  })

  const progress = computed(() => {
    if (targetSequence.value.length === 0) return 0
    return Math.round((currentIndex.value / targetSequence.value.length) * 100)
  })

  const accuracy = computed(() => {
    if (currentIndex.value === 0) return 100
    const errors = userInput.value.slice(0, currentIndex.value).filter(
      (char, i) => char !== targetSequence.value[i]
    ).length
    return Math.round(((currentIndex.value - errors) / currentIndex.value) * 100)
  })

  function initLevel(level, sequence) {
    currentLevel.value = level
    targetSequence.value = sequence.split('')
    userInput.value = []
    currentIndex.value = 0
    isStarted.value = false
    isCompleted.value = false
    startTime.value = null
    endTime.value = null
  }

  function startTyping() {
    if (!isStarted.value) {
      isStarted.value = true
      startTime.value = Date.now()
    }
  }

  function handleKeyPress(key) {
    if (isCompleted.value) return

    startTyping()

    if (key === 'Backspace') {
      if (currentIndex.value > 0) {
        currentIndex.value--
        userInput.value.pop()
      }
      return
    }

    // 只处理单字符
    if (key.length !== 1) return

    const expectedChar = targetSequence.value[currentIndex.value]
    if (expectedChar === undefined) return

    userInput.value.push(key)
    currentIndex.value++

    // 检查是否完成
    if (currentIndex.value >= targetSequence.value.length) {
      isCompleted.value = true
      endTime.value = Date.now()
    }
  }

  function getWPM() {
    if (!startTime.value) return 0
    if (currentIndex.value === 0) return 0

    // 使用当前时间或结束时间
    const end = endTime.value || Date.now()
    const minutes = (end - startTime.value) / 60000
    if (minutes === 0) return 0

    // 假设5个字符算一个单词
    const words = currentIndex.value / 5
    return Math.round(words / minutes)
  }

  function getCPM() {
    if (!startTime.value) return 0
    if (currentIndex.value === 0) return 0

    // 使用当前时间或结束时间
    const end = endTime.value || Date.now()
    const minutes = (end - startTime.value) / 60000
    if (minutes === 0) return 0

    return Math.round(currentIndex.value / minutes)
  }

  function getElapsedTime() {
    if (!startTime.value) return 0
    const end = endTime.value || Date.now()
    return Math.round((end - startTime.value) / 1000)
  }

  function reset() {
    userInput.value = []
    currentIndex.value = 0
    isStarted.value = false
    isCompleted.value = false
    startTime.value = null
    endTime.value = null
  }

  return {
    currentLevel,
    targetSequence,
    userInput,
    currentIndex,
    isStarted,
    isCompleted,
    startTime,
    endTime,
    charStates,
    currentChar,
    progress,
    accuracy,
    initLevel,
    handleKeyPress,
    getWPM,
    getCPM,
    getElapsedTime,
    reset
  }
})