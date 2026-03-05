import { computed } from 'vue'
import { getFingerForKey, fingerInfo } from '@/data/keyMapping'

export function useFingerGuide() {
  function getCurrentFinger(char) {
    if (!char) return null
    const fingerId = getFingerForKey(char)
    return fingerId ? fingerInfo[fingerId] : null
  }

  const currentFinger = computed(() => (char) => getCurrentFinger(char))

  function getFingerForChar(char) {
    return getCurrentFinger(char)
  }

  function getHandForChar(char) {
    const finger = getCurrentFinger(char)
    return finger?.hand || null
  }

  function getColorForChar(char) {
    const finger = getCurrentFinger(char)
    return finger?.color || '#e5e7eb'
  }

  return {
    currentFinger,
    getFingerForChar,
    getHandForChar,
    getColorForChar,
    fingerInfo
  }
}