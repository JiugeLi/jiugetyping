# JiugeTyping

<div align="center">
  <h3>🎯 从零开始掌握标准指法的打字练习应用</h3>
  <p>English Typing Practice - Learn Touch Typing from Scratch</p>
</div>

---

## ✨ 特性

- 🎮 **闯关模式** - 20个精心设计的关卡，从基准键位到熟练打字
- 🎯 **指法引导** - 虚拟键盘实时着色，精准引导每根手指的位置
- 🤚 **虚拟手部动画** - 实时显示手指位置，帮助形成肌肉记忆
- 📊 **进度追踪** - 记录WPM、准确率、星级评价
- 🌓 **深色模式** - 支持深色/浅色主题切换
- 🔊 **多种音效** - 7种键盘声音，增加打字乐趣
- 🎲 **练习模式** - 固定内容 / 随机生成两种模式
- 🌍 **多语言** - 支持中文/英文界面

## 📸 截图

### 关卡选择
- 响应式网格布局展示所有关卡
- 实时显示星级评价
- 悬停动画效果

### 练习界面
- 左侧关卡列表（可滚动选择）
- 顶部关卡信息和模式切换
- 实时WPM和准确率统计
- 虚拟键盘手指颜色引导
- 虚拟手部动画

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0 或 yarn >= 1.22.0

### 安装

```bash
# 克隆项目
git clone <repository-url>
cd 打字机

# 安装依赖
npm install
```

### 开发

```bash
# 启动开发服务器
npm run dev

# 在浏览器中打开
http://localhost:5173
```

### 构建

```bash
# 生产构建
npm run build

# 预览生产构建
npm run preview
```

## 🌐 部署到 Cloudflare Pages

本项目完全支持 Cloudflare Pages 部署！

### 部署步骤

1. **推送代码到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **在 Cloudflare Pages 创建项目**
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 进入 "Pages" 页面
   - 点击 "Create a project"
   - 选择 "Connect to Git"

3. **配置构建设置**
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: (留空)

4. **环境变量** (可选)
   - 无需额外环境变量

5. **点击 "Save and Deploy"**

### 自动部署

配置完成后，每次推送到主分支都会自动触发部署！

### 自定义域名 (可选)

- 在 Cloudflare Pages 项目设置中
- 点击 "Custom domains"
- 添加你的域名并按提示配置 DNS

### 注意事项

- ✅ 项目已包含 `_redirects` 文件，支持 Vue Router 的 history 模式
- ✅ 纯静态站点，无需服务器
- ✅ 使用 localStorage 存储用户进度
- ✅ 支持 SPA 路由（/practice/1, /settings 等）

### 其他部署平台

项目也可部署到以下平台：

**Vercel**
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

**Netlify**
```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 部署
netlify deploy --prod
```

**GitHub Pages**
```bash
# 修改 vite.config.js 的 base 为仓库名
# npm run build
# 将 dist 目录推送到 gh-pages 分支
```

## 🎯 关卡设计

### 第一阶段：基准键位（20关）

1. **找准基准** (1-1) - F/J 键定位
2. **食指交替** (1-2) - 食指协调练习
3. **中指出场** (1-3) - 中指基础
4. **食指与中指** (1-4) - 组合练习
5. **无名指入门** (1-5) - 无名指基础
6. **四指协调** (1-6) - 多指配合
7. **小指初体验** (1-7) - 小指基础
8. **小指与无名指** (1-8) - 弱指练习
9. **Home Row综合** (1-9) - 全指综合
10. **拇指空格** (1-10) - 空格键练习
11-20. **进阶练习** - 逐步提升速度和准确率

### 评价标准

每个关卡有5个星级，根据准确率和WPM综合评定：

- ⭐ (1星) - 基础完成
- ⭐⭐ (2星) - 良好表现
- ⭐⭐⭐ (3星) - 熟练掌握
- ⭐⭐⭐⭐ (4星) - 精通
- ⭐⭐⭐⭐⭐ (5星) - 大师级别

## 🛠️ 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **状态管理**: Pinia
- **路由**: Vue Router
- **样式**: Scoped CSS
- **存储**: localStorage

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── TopNav.vue      # 顶部导航栏
│   ├── VirtualKeyboard.vue  # 虚拟键盘
│   ├── VirtualHands.vue     # 虚拟手
│   └── LevelCompleteModal.vue  # 完成弹窗
├── composables/         # 组合式API
│   ├── useTypingEngine.js   # 打字引擎
│   ├── useFingerGuide.js    # 手指引导
│   ├── useStats.js          # 统计数据
│   ├── useSoundEffect.js    # 音效管理
│   ├── useShuangpin.js      # 双拼方案
│   └── useLocale.js         # 国际化
├── data/               # 数据文件
│   └── levels.js       # 关卡配置
├── stores/             # Pinia状态管理
│   └── user.js         # 用户数据
├── utils/              # 工具函数
│   └── contentGenerator.js  # 内容生成
└── views/              # 页面视图
    ├── HomePage.vue    # 首页
    ├── PracticePage.vue  # 练习页
    └── SettingsPage.vue  # 设置页
```

## 🎨 功能详解

### 练习模式

**固定模式 📝**
- 使用预设的固定内容
- 适合针对性练习
- 内容稳定，便于对比进步

**随机模式 🎲**
- 每次生成新的练习内容
- 基于关卡要求的手指组合
- 包含随机字符、单词、组合模式

### 音效系统

7种键盘声音可选：
- ⌨️ 机械键盘
- 🎹 电容键盘
- 📱 触屏键盘
- 🎮 游戏键盘
- 🎵 合成音
- 💭 静默模式
- 🎲 其他风格

### 数据统计

- **WPM** (Words Per Minute) - 每分钟字数
- **准确率** - 正确输入百分比
- **星级评价** - 5级评分系统
- **最佳记录** - 保存最高WPM和准确率

## 📝 开发说明

### 添加新关卡

编辑 `src/data/levels.js`:

```javascript
{
  id: '1-21',
  title: {
    zh: '新关卡',
    en: 'New Level'
  },
  stage: 1,
  targetFingers: ['L1', 'L2', 'R1', 'R2', 'THUMB'],
  mode: 'en',
  content: '练习内容\n第二行内容',
  prerequisite: null,
  starThresholds: {
    1: { accuracy: 85, wpm: 10 },
    2: { accuracy: 90, wpm: 20 },
    3: { accuracy: 95, wpm: 30 },
    4: { accuracy: 98, wpm: 40 },
    5: { accuracy: 100, wpm: 50 }
  }
}
```

### 自定义内容生成

编辑 `src/utils/contentGenerator.js` 中的 `generateContentForLevel` 函数。

## 🌐 浏览器支持

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

如有问题或建议，欢迎通过以下方式联系：

- 提交 GitHub Issue
- 发送邮件至开发者

---

<div align="center">
  <p>使用 ❤️ 和 Vue 3 构建 | Made with ❤️ using Vue 3</p>
  <p>© 2024 JiugeTyping</p>
</div>
