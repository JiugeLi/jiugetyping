import { ref, computed } from 'vue'

export function useStats() {
  const fingerKeystrokes = ref({}) // { fingerId: { total: 0, correct: 0, errors: [], times: [] } }
  const startTime = ref(null)

  function recordKeystroke(fingerId, isCorrect, keyChar) {
    if (!fingerId) return

    if (!fingerKeystrokes.value[fingerId]) {
      fingerKeystrokes.value[fingerId] = {
        total: 0,
        correct: 0,
        errors: [],
        times: []
      }
    }

    const fingerData = fingerKeystrokes.value[fingerId]
    fingerData.total++
    if (isCorrect) {
      fingerData.correct++
    } else {
      fingerData.errors.push(keyChar)
    }

    // 记录击键时间
    if (startTime.value) {
      fingerData.times.push(Date.now() - startTime.value)
    }
  }

  function getFingerAccuracy(fingerId) {
    const data = fingerKeystrokes.value[fingerId]
    if (!data || data.total === 0) return 100
    return Math.round((data.correct / data.total) * 100)
  }

  function getFingerAvgTime(fingerId) {
    const data = fingerKeystrokes.value[fingerId]
    if (!data || data.times.length === 0) return 0
    const sum = data.times.reduce((a, b) => a + b, 0)
    return Math.round(sum / data.times.length)
  }

  function getWeakFingers() {
    const weakFingers = []
    for (const [fingerId, data] of Object.entries(fingerKeystrokes.value)) {
      if (data.total >= 5) {
        const accuracy = getFingerAccuracy(fingerId)
        if (accuracy < 90) {
          weakFingers.push({ fingerId, accuracy, total: data.total })
        }
      }
    }
    return weakFingers.sort((a, b) => a.accuracy - b.accuracy)
  }

  function calculateStars(level, accuracy, wpm) {
    const thresholds = level.starThresholds
    let stars = 0

    for (let i = 5; i >= 1; i--) {
      if (accuracy >= thresholds[i].accuracy && wpm >= thresholds[i].wpm) {
        stars = i
        break
      }
    }

    return stars
  }

  function reset() {
    fingerKeystrokes.value = {}
    startTime.value = Date.now()
  }

  function setStartTime(time) {
    startTime.value = time
  }

  return {
    fingerKeystrokes,
    recordKeystroke,
    getFingerAccuracy,
    getFingerAvgTime,
    getWeakFingers,
    calculateStars,
    reset,
    setStartTime
  }
}