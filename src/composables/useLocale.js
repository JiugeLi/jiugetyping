import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'

// 支持的语言列表
export const SUPPORTED_LOCALES = ['zh', 'en']

// 国家代码到语言的映射
const COUNTRY_TO_LOCALE = {
  'CN': 'zh', // 中国
  'TW': 'zh', // 台湾
  'HK': 'zh', // 香港
  'MO': 'zh', // 澳门
  'SG': 'zh', // 新加坡
  'MY': 'zh', // 马来西亚
  // 其他国家默认使用英文
}

// 语言名称映射
export const LOCALE_NAMES = {
  zh: '简体中文',
  en: 'English'
}

export function useLocale() {
  const userStore = useUserStore()

  // 当前语言
  const locale = ref(userStore.settings.locale || 'zh')

  // 是否正在检测
  const isDetecting = ref(false)

  // 检测错误
  const detectionError = ref(null)

  // 计算属性：当前语言名称
  const currentLocaleName = computed(() => LOCALE_NAMES[locale.value])

  // 计算属性：是否为中文
  const isZh = computed(() => locale.value === 'zh')

  // 计算属性：是否为英文
  const isEn = computed(() => locale.value === 'en')

  // 根据浏览器语言和IP检测语言
  async function detectLocale() {
    // 如果已经手动设置过，不再检测
    if (userStore.settings.locale) {
      locale.value = userStore.settings.locale
      return locale.value
    }

    isDetecting.value = true
    detectionError.value = null

    try {
      // 首先尝试使用浏览器语言
      const browserLang = navigator.language || navigator.userLanguage
      if (browserLang.startsWith('zh')) {
        setLocale('zh')
        isDetecting.value = false
        return 'zh'
      }

      // 如果浏览器不是中文，尝试通过IP检测国家
      const response = await fetch('https://ipapi.co/json/', {
        timeout: 5000,
        signal: AbortSignal.timeout(5000)
      })

      if (!response.ok) {
        throw new Error('Failed to fetch location')
      }

      const data = await response.json()
      const countryCode = data.country_code

      // 根据国家代码选择语言
      const detectedLocale = COUNTRY_TO_LOCALE[countryCode] || 'en'
      setLocale(detectedLocale)

      return detectedLocale
    } catch (error) {
      console.warn('Language detection failed, falling back to browser language:', error)

      // 如果IP检测失败，回退到浏览器语言
      const browserLang = navigator.language || navigator.userLanguage
      const fallbackLocale = browserLang.startsWith('zh') ? 'zh' : 'en'
      setLocale(fallbackLocale)

      detectionError.value = error.message
      return fallbackLocale
    } finally {
      isDetecting.value = false
    }
  }

  // 设置语言
  function setLocale(newLocale) {
    if (!SUPPORTED_LOCALES.includes(newLocale)) {
      console.warn(`Unsupported locale: ${newLocale}`)
      return
    }

    locale.value = newLocale
    userStore.updateSettings({ locale: newLocale })

    // 持久化到 localStorage
    localStorage.setItem('user-locale', newLocale)

    // 更新 HTML lang 属性
    document.documentElement.lang = newLocale
  }

  // 切换语言
  function toggleLocale() {
    const newLocale = locale.value === 'zh' ? 'en' : 'zh'
    setLocale(newLocale)
    return newLocale
  }

  // 获取本地化文本
  function getLocalizedText(textObj) {
    if (!textObj) return ''

    // 如果是字符串，直接返回
    if (typeof textObj === 'string') return textObj

    // 如果是对象，根据当前语言返回对应文本
    return textObj[locale.value] || textObj.zh || textObj.en || ''
  }

  // 从 localStorage 恢复语言设置
  function loadSavedLocale() {
    const saved = localStorage.getItem('user-locale')
    if (saved && SUPPORTED_LOCALES.includes(saved)) {
      setLocale(saved)
      return saved
    }

    // 如果没有保存的设置，使用 store 中的值
    if (userStore.settings.locale) {
      locale.value = userStore.settings.locale
      document.documentElement.lang = userStore.settings.locale
      return userStore.settings.locale
    }

    return null
  }

  return {
    locale,
    isDetecting,
    detectionError,
    currentLocaleName,
    isZh,
    isEn,
    detectLocale,
    setLocale,
    toggleLocale,
    getLocalizedText,
    loadSavedLocale
  }
}
