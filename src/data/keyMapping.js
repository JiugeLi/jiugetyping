// 手指键位映射表
// 键为小写字符，值为手指ID
export const fingerKeyMap = {
  // 左手小指 L1
  '`': 'L1', '1': 'L1', 'q': 'L1', 'a': 'L1', 'z': 'L1',
  'tab': 'L1', 'capslock': 'L1', 'shift': 'L1',

  // 左手无名指 L2
  '2': 'L2', 'w': 'L2', 's': 'L2', 'x': 'L2',

  // 左手中指 L3
  '3': 'L3', 'e': 'L3', 'd': 'L3', 'c': 'L3',

  // 左手食指 L4
  '4': 'L4', '5': 'L4', 'r': 'L4', 't': 'L4', 'f': 'L4', 'g': 'L4', 'v': 'L4', 'b': 'L4',

  // 右手食指 R4
  '6': 'R4', '7': 'R4', 'y': 'R4', 'u': 'R4', 'h': 'R4', 'j': 'R4', 'n': 'R4', 'm': 'R4',

  // 右手中指 R3
  '8': 'R3', 'i': 'R3', 'k': 'R3', ',': 'R3',

  // 右手无名指 R2
  '9': 'R2', 'o': 'R2', 'l': 'R2', '.': 'R2',

  // 右手小指 R1
  '0': 'R1', '-': 'R1', '=': 'R1', 'p': 'R1', '[': 'R1', ']': 'R1', ';': 'R1', "'": 'R1', '/': 'R1',
  'enter': 'R1', 'backslash': 'R1',

  // 拇指
  ' ': 'THUMB'
}

// 手指信息 - 色盲友好配色（黑、白、灰、蓝、黄）
export const fingerInfo = {
  L1: { name: '左手小指', shortName: '左小', color: '#1e40af', hand: 'left', key: 'L1' },  // 深蓝
  L2: { name: '左手无名指', shortName: '左无', color: '#3b82f6', hand: 'left', key: 'L2' }, // 中蓝
  L3: { name: '左手中指', shortName: '左中', color: '#93c5fd', hand: 'left', key: 'L3' },   // 浅蓝
  L4: { name: '左手食指', shortName: '左食', color: '#fbbf24', hand: 'left', key: 'L4' },   // 黄色
  R4: { name: '右手食指', shortName: '右食', color: '#f59e0b', hand: 'right', key: 'R4' },   // 深黄
  R3: { name: '右手中指', shortName: '右中', color: '#4b5563', hand: 'right', key: 'R3' },   // 深灰
  R2: { name: '右手无名指', shortName: '右无', color: '#9ca3af', hand: 'right', key: 'R2' },  // 中灰
  R1: { name: '右手小指', shortName: '右小', color: '#d1d5db', hand: 'right', key: 'R1' },   // 浅灰
  THUMB: { name: '拇指', shortName: '拇指', color: '#1f2937', hand: 'both', key: 'THUMB' }   // 黑色
}

// 键盘行布局（QWERTY）
export const keyboardRows = [
  // 数字行
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
  // 字母行
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  // Home行
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
  // 底部行
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
  // 空格
  [' ']
]

// 特殊键定义
export const specialKeys = {
  'backspace': { width: 2, label: 'Backspace' },
  'tab': { width: 1.5, label: 'Tab' },
  'capslock': { width: 1.75, label: 'Caps' },
  'enter': { width: 2.25, label: 'Enter' },
  'shift': { width: 2.25, label: 'Shift' },
  'ctrl': { width: 1.25, label: 'Ctrl' },
  'alt': { width: 1.25, label: 'Alt' },
  ' ': { width: 6.25, label: '' }
}

// 获取键对应的手指
export function getFingerForKey(key) {
  const normalized = key.toLowerCase()
  return fingerKeyMap[normalized] || null
}

// 获取键的手指颜色
export function getFingerColorForKey(key) {
  const finger = getFingerForKey(key)
  return finger ? fingerInfo[finger]?.color : '#e5e7eb'
}