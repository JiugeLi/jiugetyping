/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        finger: {
          l1: '#e91e63', // 玫红色 - 小指
          l2: '#ff9800', // 橙色 - 无名指
          l3: '#ffeb3b', // 黄色 - 中指
          l4: '#4caf50', // 绿色 - 食指
          r4: '#00bcd4', // 青色 - 食指
          r3: '#2196f3', // 蓝色 - 中指
          r2: '#9c27b0', // 紫色 - 无名指
          r1: '#e91e63', // 品红色 - 小指
          thumb: '#9e9e9e', // 灰色 - 拇指
        }
      },
      animation: {
        'breathe': 'breathe 1.5s ease-in-out infinite',
        'shake': 'shake 0.3s ease-in-out',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        }
      }
    },
  },
  plugins: [],
}