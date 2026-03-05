<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useLocale } from '@/composables/useLocale'

const router = useRouter()
const userStore = useUserStore()
const { locale, toggleLocale } = useLocale()

function navigateTo(path) {
  router.push(path)
}

// 本地化文本映射
const navLabels = {
  zh: {
    levels: '关卡',
    settings: '设置'
  },
  en: {
    levels: 'Levels',
    settings: 'Settings'
  }
}

const currentLabels = computed(() => navLabels[locale.value] || navLabels.zh)
</script>

<template>
  <nav class="top-nav">
    <div class="nav-container">
      <div class="nav-brand">
        <span class="brand-cn">指法道场</span>
        <span class="brand-en">TouchType Dojo</span>
      </div>

      <div class="nav-links">
        <button
          class="nav-link"
          :class="{ active: $route.path === '/' }"
          @click="navigateTo('/')"
        >
          {{ currentLabels.levels }}
        </button>
        <button
          class="nav-link"
          :class="{ active: $route.path === '/settings' }"
          @click="navigateTo('/settings')"
        >
          {{ currentLabels.settings }}
        </button>
      </div>

      <!-- 语言切换按钮 -->
      <button
        @click="toggleLocale"
        class="locale-switcher"
        title="切换语言 / Switch Language"
      >
        {{ locale === 'zh' ? '🇺🇸 EN' : '🇨🇳 中文' }}
      </button>
    </div>
  </nav>
</template>

<style scoped>
.top-nav {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.dark .top-nav {
  background: #1e293b;
  border-bottom-color: #334155;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.nav-brand {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.brand-cn {
  font-size: 20px;
  font-weight: 800;
  color: #1e40af;
  letter-spacing: 2px;
}

.dark .brand-cn {
  color: #60a5fa;
}

.brand-en {
  font-size: 11px;
  color: #60a5fa;
  letter-spacing: 1px;
}

.nav-links {
  display: flex;
  gap: 8px;
}

.nav-link {
  padding: 8px 16px;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  transition: all 0.2s ease;
}

.dark .nav-link {
  color: #94a3b8;
}

.nav-link:hover {
  background: #f1f5f9;
  color: #1e293b;
}

.dark .nav-link:hover {
  background: #334155;
  color: #f1f5f9;
}

.nav-link.active {
  background: #3b82f6;
  color: white;
}

.locale-switcher {
  padding: 6px 12px;
  background: #f1f5f9;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.dark .locale-switcher {
  background: #334155;
  border-color: #475569;
  color: #cbd5e1;
}

.locale-switcher:hover {
  border-color: #3b82f6;
  transform: translateY(-1px);
}

.locale-switcher:active {
  transform: translateY(0);
}

@media (max-width: 640px) {
  .nav-container {
    flex-wrap: wrap;
  }

  .nav-brand {
    order: 1;
    flex: 1;
  }

  .nav-links {
    order: 3;
    width: 100%;
    justify-content: center;
  }
}
</style>
