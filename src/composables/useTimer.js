import { ref, onUnmounted } from 'vue'

export function useTimer() {
  const startTime = ref(null)
  const endTime = ref(null)
  const isRunning = ref(false)
  let intervalId = null

  const elapsedSeconds = ref(0)

  function start() {
    if (isRunning.value) return

    startTime.value = Date.now()
    isRunning.value = true

    intervalId = setInterval(() => {
      elapsedSeconds.value = Math.floor((Date.now() - startTime.value) / 1000)
    }, 1000)
  }

  function stop() {
    if (!isRunning.value) return

    endTime.value = Date.now()
    isRunning.value = false

    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  function reset() {
    stop()
    startTime.value = null
    endTime.value = null
    elapsedSeconds.value = 0
  }

  function getElapsed() {
    if (!startTime.value) return 0
    const end = endTime.value || Date.now()
    return Math.floor((end - startTime.value) / 1000)
  }

  function getElapsedMs() {
    if (!startTime.value) return 0
    const end = endTime.value || Date.now()
    return end - startTime.value
  }

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })

  return {
    startTime,
    endTime,
    isRunning,
    elapsedSeconds,
    start,
    stop,
    reset,
    getElapsed,
    getElapsedMs
  }
}