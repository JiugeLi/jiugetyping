// 音效系统
import { ref, watch, computed } from 'vue'
import { useUserStore } from '@/stores/user'

// 音效类型
export const SOUND_TYPES = {
  MECHANICAL: 'mechanical',      // 机械键盘
  SCISSOR: 'scissor',            // 剪刀脚
  TYPEWRITER: 'typewriter',      // 打字机
  PIANO: 'piano',                // 钢琴
  CHIME: 'chime',                // 风铃
  WATERDROP: 'waterdrop',        // 水滴
  MUTE: 'mute'                   // 静音
}

// 音效名称映射
export const SOUND_NAMES = {
  [SOUND_TYPES.MECHANICAL]: '机械键盘',
  [SOUND_TYPES.SCISSOR]: '剪刀脚',
  [SOUND_TYPES.TYPEWRITER]: '打字机',
  [SOUND_TYPES.PIANO]: '钢琴',
  [SOUND_TYPES.CHIME]: '风铃',
  [SOUND_TYPES.WATERDROP]: '水滴',
  [SOUND_TYPES.MUTE]: '静音'
}

// 预生成的音效数据（使用Web Audio API生成）
let audioContext = null

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioContext
}

// 机械键盘音效 - 清脆的click声
function playMechanicalSound() {
  try {
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.type = 'square'
    osc.frequency.setValueAtTime(2500, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.04)

    gain.gain.setValueAtTime(0.25, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.04)
  } catch (e) {
    console.log('Audio error:', e)
  }
}

// 剪刀脚音效 - 轻柔的按压声
function playScissorSound() {
  try {
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.type = 'sine'
    osc.frequency.setValueAtTime(1800, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.03)

    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.03)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.03)
  } catch (e) {
    console.log('Audio error:', e)
  }
}

// 打字机音效 - 复古打字机声音
function playTypewriterSound() {
  try {
    const ctx = getAudioContext()

    // 主音调
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(1500, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05)

    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.05)

    // 添加咔哒声
    setTimeout(() => {
      try {
        const clickOsc = ctx.createOscillator()
        const clickGain = ctx.createGain()
        clickOsc.connect(clickGain)
        clickGain.connect(ctx.destination)

        clickOsc.type = 'square'
        clickOsc.frequency.setValueAtTime(3000, ctx.currentTime)
        clickGain.gain.setValueAtTime(0.1, ctx.currentTime)
        clickGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.01)

        clickOsc.start(ctx.currentTime)
        clickOsc.stop(ctx.currentTime + 0.01)
      } catch (e) {}
    }, 10)
  } catch (e) {
    console.log('Audio error:', e)
  }
}

// 钢琴音效 - 清脆的琴键声
function playPianoSound() {
  try {
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(2200, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.08)

    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.08)
  } catch (e) {
    console.log('Audio error:', e)
  }
}

// 风铃音效 - 清脆的铃声
function playChimeSound() {
  try {
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.type = 'sine'
    osc.frequency.setValueAtTime(3000, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.1)

    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.1)
  } catch (e) {
    console.log('Audio error:', e)
  }
}

// 水滴音效 - 清脆的水滴声
function playWaterdropSound() {
  try {
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.type = 'sine'
    osc.frequency.setValueAtTime(1400, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.12)

    gain.gain.setValueAtTime(0.35, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.12)
  } catch (e) {
    console.log('Audio error:', e)
  }
}

// 错误音效 - 低沉的提示音
function playErrorSound() {
  try {
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.type = 'sine'
    osc.frequency.setValueAtTime(200, ctx.currentTime)

    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.2)
  } catch (e) {
    console.log('Audio error:', e)
  }
}

// 成功音效 - 上升音阶
function playSuccessSound() {
  try {
    const ctx = getAudioContext()
    const notes = [523, 659, 784] // C5, E5, G5

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1)
      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.1)
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + i * 0.1 + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.15)

      osc.start(ctx.currentTime + i * 0.1)
      osc.stop(ctx.currentTime + i * 0.1 + 0.15)
    })
  } catch (e) {
    console.log('Audio error:', e)
  }
}

// 音效播放器
export function useSoundEffect() {
  const userStore = useUserStore()
  const currentSoundType = computed(() => {
    return userStore.settings.soundType || SOUND_TYPES.MECHANICAL
  })

  // 监听设置变化
  watch(() => userStore.settings.soundType, (newType) => {
    console.log('Sound type changed to:', newType)
  })

  function playKeySound() {
    if (currentSoundType.value === SOUND_TYPES.MUTE) return

    switch (currentSoundType.value) {
      case SOUND_TYPES.MECHANICAL:
        playMechanicalSound()
        break
      case SOUND_TYPES.SCISSOR:
        playScissorSound()
        break
      case SOUND_TYPES.TYPEWRITER:
        playTypewriterSound()
        break
      case SOUND_TYPES.PIANO:
        playPianoSound()
        break
      case SOUND_TYPES.CHIME:
        playChimeSound()
        break
      case SOUND_TYPES.WATERDROP:
        playWaterdropSound()
        break
      default:
        playMechanicalSound()
    }
  }

  function playErrorKeySound() {
    if (currentSoundType.value === SOUND_TYPES.MUTE) return
    playErrorSound()
  }

  function playSuccessKeySound() {
    if (currentSoundType.value === SOUND_TYPES.MUTE) return
    playSuccessSound()
  }

  // 试听音色
  function previewSound(soundType) {
    if (soundType === SOUND_TYPES.MUTE) return

    switch (soundType) {
      case SOUND_TYPES.MECHANICAL:
        playMechanicalSound()
        break
      case SOUND_TYPES.SCISSOR:
        playScissorSound()
        break
      case SOUND_TYPES.TYPEWRITER:
        playTypewriterSound()
        break
      case SOUND_TYPES.PIANO:
        playPianoSound()
        break
      case SOUND_TYPES.CHIME:
        playChimeSound()
        break
      case SOUND_TYPES.WATERDROP:
        playWaterdropSound()
        break
    }
  }

  // 获取所有可用的音色选项
  function getSoundOptions() {
    return Object.values(SOUND_TYPES).map(type => ({
      value: type,
      label: SOUND_NAMES[type] || type
    }))
  }

  return {
    SOUND_TYPES,
    SOUND_NAMES,
    currentSoundType,
    playKeySound,
    playErrorKeySound,
    playSuccessKeySound,
    previewSound,
    getSoundOptions
  }
}
