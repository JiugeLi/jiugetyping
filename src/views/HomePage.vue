<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { getAllLevels } from '@/data/levels'
import { useLocale } from '@/composables/useLocale'
import TopNav from '@/components/TopNav.vue'

const router = useRouter()
const userStore = useUserStore()
const { locale, detectLocale, getLocalizedText, loadSavedLocale } = useLocale()

const levels = getAllLevels()

// 初始化语言检测
onMounted(async () => {
  const saved = loadSavedLocale()
  if (!saved) {
    await detectLocale()
  }
})

function getLevelStars(levelId) {
  return userStore.getStarsForLevel(levelId)
}

function startLevel(level) {
  router.push(`/practice/${level.id}`)
}

function getLevelTitle(level) {
  return getLocalizedText(level.title)
}
</script>

<template>
  <div class="home-page">
    <!-- 统一顶部导航 -->
    <TopNav />

    <!-- 主标题 -->
    <div class="page-header">
      <h1 class="page-title">
        {{ locale === 'zh' ? '指法练习' : 'Typing Practice' }}
      </h1>
      <p class="page-subtitle">
        {{ locale === 'zh' ? '从基准键位到熟练打字的完整学习路径' : 'Complete learning path from home row to touch typing' }}
      </p>
    </div>

    <!-- 关卡网格 -->
    <div class="levels-grid">
      <button
        v-for="level in levels"
        :key="level.id"
        class="level-card"
        @click="startLevel(level)"
      >
        <div class="level-header">
          <span class="level-number">{{ level.id.split('-')[1] }}</span>
          <div class="level-stars">
            <span
              v-for="s in 5"
              :key="s"
              class="star"
              :class="{ filled: s <= getLevelStars(level.id) }"
            >★</span>
          </div>
        </div>
        <div class="level-title">{{ getLevelTitle(level) }}</div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  padding-bottom: 40px;
}

.dark .home-page {
  background: linear-gradient(135deg, #1e3a5f 0%, #172554 100%);
}

/* 页面标题 */
.page-header {
  text-align: center;
  padding: 60px 20px 40px;
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  font-size: 36px;
  font-weight: 800;
  color: #1e40af;
  margin-bottom: 12px;
  text-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
}

.dark .page-title {
  color: #60a5fa;
}

.page-subtitle {
  font-size: 16px;
  color: #64748b;
  line-height: 1.6;
}

.dark .page-subtitle {
  color: #94a3b8;
}

/* 关卡网格 */
.levels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.level-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.04),
    0 1px 3px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
}

.dark .level-card {
  background: #1e293b;
  border-color: #475569;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.2),
    0 1px 3px rgba(0, 0, 0, 0.3);
}

.level-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.level-card:hover::before {
  opacity: 1;
}

.level-card:hover {
  border-color: #3b82f6;
  transform: translateY(-8px) scale(1.02);
  box-shadow:
    0 12px 28px rgba(59, 130, 246, 0.25),
    0 4px 12px rgba(59, 130, 246, 0.15);
}

.dark .level-card:hover {
  box-shadow:
    0 12px 28px rgba(59, 130, 246, 0.35),
    0 4px 12px rgba(59, 130, 246, 0.25);
}

.level-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.level-number {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  font-size: 20px;
  font-weight: 800;
  border-radius: 12px;
  box-shadow:
    0 4px 12px rgba(59, 130, 246, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.level-card:hover .level-number {
  transform: scale(1.1) rotate(5deg);
  box-shadow:
    0 6px 16px rgba(59, 130, 246, 0.4),
    inset 0 1px 2px rgba(255, 255, 255, 0.3);
}

.level-stars {
  display: flex;
  gap: 2px;
}

.star {
  font-size: 12px;
  color: #cbd5e1;
  transition: all 0.2s ease;
}

.dark .star {
  color: #475569;
}

.star.filled {
  color: #fbbf24;
  filter: drop-shadow(0 1px 2px rgba(251, 191, 36, 0.4));
  animation: starPop 0.3s ease;
}

@keyframes starPop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

.level-title {
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  text-align: center;
  letter-spacing: 0.3px;
  line-height: 1.4;
  transition: color 0.2s ease;
}

.dark .level-title {
  color: #cbd5e1;
}

.level-card:hover .level-title {
  color: #3b82f6;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-header {
    padding: 40px 20px 30px;
  }

  .page-title {
    font-size: 28px;
  }

  .page-subtitle {
    font-size: 14px;
  }

  .levels-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
    padding: 0 16px;
  }

  .level-card {
    padding: 16px;
  }

  .level-number {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 24px;
  }

  .levels-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .level-card {
    padding: 12px;
  }

  .level-number {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }

  .level-title {
    font-size: 12px;
  }

  .star {
    font-size: 10px;
  }
}
</style>