// 手指到键位的映射
const fingerKeys = {
  'L1': ['`', '1', 'q', 'a', 'z'],
  'L2': ['2', 'w', 's', 'x'],
  'L3': ['3', 'e', 'd', 'c'],
  'L4': ['4', '5', 'r', 't', 'f', 'g', 'v', 'b'],
  'R4': ['6', '7', 'y', 'u', 'h', 'j', 'n', 'm'],
  'R3': ['8', 'i', 'k', ','],
  'R2': ['9', 'o', 'l', '.'],
  'R1': ['0', '-', '=', 'p', '[', ']', ';', "'", '/'],
  'THUMB': [' ']
}

// 常用字母组合（用于生成更自然的练习）
const commonBigrams = [
  'th', 'he', 'in', 'en', 'nt', 're', 'er', 'an', 'ti', 'es',
  'on', 'at', 'to', 'nd', 'ou', 'ea', 'ng', 'as', 'or', 'is',
  'it', 'et', 'al', 'ar', 'st', 'se', 'te', 'of', 'ed', 'nd'
]

// 常用单词（扩展版）
const commonWords = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
  'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
  'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
  'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us'
]

/**
 * 检查单词是否可以使用指定的手指
 */
function canUseWord(word, targetFingers) {
  for (const char of word.toLowerCase()) {
    const finger = getFingerForKey(char)
    if (!targetFingers.includes(finger)) {
      return false
    }
  }
  return true
}

/**
 * 获取字符对应的手指
 */
function getFingerForKey(char) {
  const lowerChar = char.toLowerCase()
  for (const [finger, keys] of Object.entries(fingerKeys)) {
    if (keys.includes(lowerChar)) {
      return finger
    }
  }
  return null
}

/**
 * 生成随机字符序列
 */
function generateRandomChars(targetFingers, length) {
  let result = []
  let availableKeys = []

  // 收集所有可用键位
  targetFingers.forEach(finger => {
    if (fingerKeys[finger]) {
      availableKeys = availableKeys.concat(fingerKeys[finger])
    }
  })

  // 过滤掉空格（除非明确要求）
  if (!targetFingers.includes('THUMB')) {
    availableKeys = availableKeys.filter(k => k !== ' ')
  }

  for (let i = 0; i < length; i++) {
    const randomKey = availableKeys[Math.floor(Math.random() * availableKeys.length)]
    result.push(randomKey)
  }

  return result.join('')
}

/**
 * 生成基于单词的练习内容
 */
function generateWordBased(targetFingers, wordCount) {
  let result = []

  // 找出所有可以使用目标手指的单词
  const usableWords = commonWords.filter(word =>
    canUseWord(word, targetFingers)
  )

  // 如果没有可用的单词，回退到随机字符
  if (usableWords.length === 0) {
    return generateRandomChars(targetFingers, wordCount * 4)
  }

  // 添加时间戳作为随机种子的一部分
  const seed = Date.now()
  const shuffledWords = [...usableWords].sort(() => Math.random() - 0.5)

  // 随机选择单词，确保每次都不一样
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * shuffledWords.length)
    result.push(shuffledWords[randomIndex])

    // 每3-4个单词才添加一个空格，减少空格数量
    if ((i + 1) % 3 !== 0 && i < wordCount - 1) {
      // 大部分情况不添加空格，形成连贯的字符流
      // 只有在特定位置才添加空格
    }
  }

  return result.join('') // 改为不用空格连接，直接连接单词
}

/**
 * 生成基于手指组合的练习
 */
function generateFingerCombination(targetFingers, charsPerFinger, repeatCount) {
  let result = []

  for (let round = 0; round < repeatCount; round++) {
    // 为每个手指生成字符
    for (const finger of targetFingers) {
      const keys = fingerKeys[finger] || []
      if (keys.length === 0) continue

      for (let i = 0; i < charsPerFinger; i++) {
        const randomKey = keys[Math.floor(Math.random() * keys.length)]
        result.push(randomKey)
      }

      // 只在有拇指时才添加空格，并且减少空格频率（每隔一个手指才添加空格）
      if (targetFingers.includes('THUMB') && Math.random() > 0.5) {
        result.push(' ')
      }
    }
  }

  return result.join('').trim()
}

/**
 * 生成重复模式练习
 */
function generatePatternRepeat(targetFingers, pattern, repeatTimes) {
  let result = []

  // 检查模式是否可用
  const patternFingers = pattern.split('').map(c => getFingerForKey(c))

  for (let i = 0; i < repeatTimes; i++) {
    result.push(pattern)
    if (i < repeatTimes - 1) {
      result.push(' ')
    }
  }

  return result.join('')
}

/**
 * 验证内容是否只使用目标手指
 */
function validateContent(content, targetFingers) {
  const chars = content.replace(/\n/g, '').replace(/ /g, '').split('')
  for (const char of chars) {
    const finger = getFingerForKey(char)
    if (!finger || !targetFingers.includes(finger)) {
      console.warn(`字符 '${char}' (手指: ${finger}) 不在目标手指列表中:`, targetFingers)
      return false
    }
  }
  return true
}

/**
 * 主要的随机内容生成函数
 */
export function generateRandomContent(targetFingers, options = {}) {
  const {
    type = 'mixed', // 'chars', 'words', 'pattern', 'mixed'
    length = 80,
    wordCount = 12,
    pattern = null,
    charsPerFinger = 2,
    repeatCount = 4
  } = options

  let content = ''

  switch (type) {
    case 'chars':
      content = generateRandomChars(targetFingers, length)
      break

    case 'words':
      content = generateWordBased(targetFingers, wordCount)
      break

    case 'pattern':
      if (pattern) {
        content = generatePatternRepeat(targetFingers, pattern, repeatCount)
      } else {
        content = generateRandomChars(targetFingers, length)
      }
      break

    case 'finger':
      content = generateFingerCombination(targetFingers, charsPerFinger, repeatCount)
      break

    case 'mixed':
    default:
      // 根据手指数量选择最佳生成方式
      if (targetFingers.length === 1) {
        // 单个手指：使用模式重复
        const keys = fingerKeys[targetFingers[0]] || []
        const pattern = keys.slice(0, 2).join('')
        content = generatePatternRepeat(targetFingers, pattern, repeatCount)
      } else if (targetFingers.length === 2) {
        // 两个手指：交替模式
        content = generateFingerCombination(targetFingers, charsPerFinger, repeatCount)
      } else {
        // 多个手指：使用单词或混合
        const wordContent = generateWordBased(targetFingers, Math.floor(wordCount / 2))
        if (wordContent.split(' ').length > 2) {
          content = wordContent
        } else {
          content = generateRandomChars(targetFingers, length)
        }
      }
      break
  }

  // 生成两行内容
  const line1 = content
  const line2 = content

  return `${line1}\n${line2}`
}

/**
 * 根据关卡难度生成内容
 */
export function generateContentForLevel(level) {
  const { targetFingers, stage, id } = level

  // 根据关卡阶段和ID确定难度
  const levelNum = parseInt(id.split('-')[1])

  // 早期关卡（1-5）：模式重复
  if (levelNum <= 5) {
    return generateRandomContent(targetFingers, {
      type: 'finger',
      charsPerFinger: 2 + Math.floor(levelNum / 2),
      repeatCount: 3 + levelNum
    })
  }

  // 中期关卡（6-12）：混合模式
  if (levelNum <= 12) {
    return generateRandomContent(targetFingers, {
      type: 'mixed',
      wordCount: 8 + levelNum,
      length: 60 + levelNum * 4
    })
  }

  // 后期关卡（13-20）：单词为主
  return generateRandomContent(targetFingers, {
    type: 'words',
    wordCount: 10 + levelNum
  })
}
