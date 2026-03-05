<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useShuangpin } from '@/composables/useShuangpin'
import { useSoundEffect, SOUND_NAMES, SOUND_TYPES } from '@/composables/useSoundEffect'
import TopNav from '@/components/TopNav.vue'

const router = useRouter()
const userStore = useUserStore()
const shuangpin = useShuangpin()
const soundEffect = useSoundEffect()

const settings = ref({ ...userStore.settings })

function saveSettings() {
  userStore.updateSettings(settings.value)

  // 更新双拼方案
  if (settings.value.shuangpinScheme) {
    shuangpin.setScheme(settings.value.shuangpinScheme)
  }

  router.push('/')
}

function toggleTheme() {
  settings.value.theme = settings.value.theme === 'light' ? 'dark' : 'light'
  applyTheme(settings.value.theme)
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// 初始化主题
applyTheme(settings.value.theme)
</script>

<template>
  <div class="settings-page">
    <!-- 统一顶部导航 -->
    <TopNav />

    <main class="settings-content">
      <!-- 外观 -->
      <section class="settings-section">
        <h2 class="section-title">外观</h2>

        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">深色主题</span>
            <span class="setting-desc">切换深色/浅色界面</span>
          </div>
          <button
            class="toggle-button"
            :class="{ active: settings.theme === 'dark' }"
            @click="toggleTheme"
          >
            <span class="toggle-knob"></span>
          </button>
        </div>
      </section>

      <!-- 打字辅助 -->
      <section class="settings-section">
        <h2 class="section-title">打字辅助</h2>

        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">练习模式</span>
            <span class="setting-desc">随机模式每次生成新内容，固定模式使用预设内容</span>
          </div>
          <div class="mode-selector">
            <button
              class="mode-button"
              :class="{ active: settings.practiceMode === 'random' }"
              @click="settings.practiceMode = 'random'"
            >
              🎲 随机模式
            </button>
            <button
              class="mode-button"
              :class="{ active: settings.practiceMode === 'fixed' }"
              @click="settings.practiceMode = 'fixed'"
            >
              📝 固定模式
            </button>
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">显示虚拟手</span>
            <span class="setting-desc">在键盘下方显示虚拟手动画</span>
          </div>
          <button
            class="toggle-button"
            :class="{ active: settings.showVirtualHands }"
            @click="settings.showVirtualHands = !settings.showVirtualHands"
          >
            <span class="toggle-knob"></span>
          </button>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">音效类型</span>
            <span class="setting-desc">选择按键声音风格</span>
          </div>
          <div class="sound-selector-group">
            <select v-model="settings.soundType" class="select-input">
              <option v-for="(name, type) in SOUND_NAMES" :key="type" :value="type">
                {{ name }}
              </option>
            </select>
            <button
              @click="soundEffect.previewSound(settings.soundType)"
              class="preview-btn"
              title="试听当前音色"
            >
              🔊 试听
            </button>
          </div>
        </div>

        <div class="setting-item sound-preview-list">
          <div class="setting-info">
            <span class="setting-label">快速试听所有音色</span>
            <span class="setting-desc">点击按钮试听不同音色</span>
          </div>
          <div class="sound-buttons">
            <button
              v-for="(name, type) in SOUND_NAMES"
              :key="type"
              @click="soundEffect.previewSound(type)"
              class="sound-mini-btn"
              :class="{ active: settings.soundType === type }"
              :title="name"
            >
              {{ name }}
            </button>
          </div>
        </div>
      </section>

      <!-- 双拼设置 -->
      <section class="settings-section">
        <h2 class="section-title">双拼方案</h2>

        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">选择方案</span>
            <span class="setting-desc">双拼练习时使用的方案</span>
          </div>
          <select
            v-model="settings.shuangpinScheme"
            class="select-input"
          >
            <option v-for="scheme in shuangpin.getAvailableSchemes()" :key="scheme" :value="scheme">
              {{ { 'xiaohé': '小鹤双拼', '微软': '微软双拼' }[scheme] || scheme }}
            </option>
          </select>
        </div>
      </section>

      <!-- 保存按钮 -->
      <button class="save-button" @click="saveSettings">
        保存设置
      </button>

      <!-- 数据管理 -->
      <section class="settings-section">
        <h2 class="section-title">数据管理</h2>

        <button class="danger-button" @click="userStore.saveProgress()">
          导出进度
        </button>
      </section>
    </main>
  </div>
</template>

<style scoped>
.settings-page {
  min-height: 100vh;
  background: #f8fafc;
  padding-bottom: 20px;
}

.dark .settings-page {
  background: #0f172a;
}

.settings-content {
  max-width: 600px;
  margin: 0 auto;
}

.settings-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.dark .settings-section {
  background: #1e293b;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
}

.dark .setting-item {
  border-color: #334155;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-info {
  display: flex;
  flex-direction: column;
}

.setting-label {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.dark .setting-label {
  color: #f1f5f9;
}

.setting-desc {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 4px;
}

.toggle-button {
  width: 48px;
  height: 28px;
  background: #e2e8f0;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  position: relative;
  transition: background 0.2s ease;
}

.dark .toggle-button {
  background: #334155;
}

.toggle-button.active {
  background: #3b82f6;
}

.toggle-knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toggle-button.active .toggle-knob {
  transform: translateX(20px);
}

.select-input {
  padding: 8px 16px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #1e293b;
  cursor: pointer;
}

.dark .select-input {
  background: #334155;
  border-color: #475569;
  color: #f1f5f9;
}

.mode-selector {
  display: flex;
  gap: 8px;
}

.mode-button {
  padding: 8px 16px;
  background: #f1f5f9;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.dark .mode-button {
  background: #334155;
  border-color: #475569;
  color: #94a3b8;
}

.mode-button:hover {
  border-color: #3b82f6;
  transform: translateY(-1px);
}

.mode-button.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.save-button {
  width: 100%;
  padding: 16px;
  background: #3b82f6;
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.save-button:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.danger-button {
  padding: 12px 24px;
  background: #ef4444;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.danger-button:hover {
  background: #dc2626;
}

.sound-selector-group {
  display: flex;
  gap: 8px;
  align-items: center;
}

.preview-btn {
  padding: 8px 16px;
  background: #3b82f6;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.preview-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.preview-btn:active {
  transform: translateY(0);
}

.sound-preview-list {
  flex-direction: column;
  align-items: stretch;
}

.sound-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 8px;
  width: 100%;
}

.sound-mini-btn {
  padding: 8px 12px;
  background: #f1f5f9;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  color: #64748b;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dark .sound-mini-btn {
  background: #334155;
  border-color: #475569;
  color: #94a3b8;
}

.sound-mini-btn:hover {
  border-color: #3b82f6;
  background: white;
  transform: translateY(-2px);
}

.dark .sound-mini-btn:hover {
  background: #475569;
}

.sound-mini-btn.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}
</style>