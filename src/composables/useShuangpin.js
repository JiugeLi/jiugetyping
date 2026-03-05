import { ref } from 'vue'

// 双拼方案映射
const shuangpinSchemes = {
  xiaohé: {
    // 声母映射
    shengmu: {
      'zh': 'v', 'ch': 'i', 'sh': 'u',
      'b': 'b', 'p': 'p', 'm': 'm', 'f': 'f',
      'd': 'd', 't': 't', 'n': 'n', 'l': 'l',
      'g': 'g', 'k': 'k', 'h': 'h',
      'j': 'j', 'q': 'q', 'x': 'x',
      'r': 'r', 'y': 'y', 'w': 'w'
    },
    // 韵母映射
    yunmu: {
      'a': 'a', 'o': 'o', 'e': 'e', 'i': 'i', 'u': 'u', 'v': 'v',
      'ai': 'd', 'ei': 'w', 'ui': 'v', 'ao': 'k', 'ou': 'b', 'iu': 'q',
      'ie': 'p', 've': 't', 'er': 'r', 'an': 'j', 'en': 'f', 'in': 'n',
      'un': 'y', 'vn': 'v', 'ang': 'h', 'eng': 'g', 'ing': ';', 'ong': 's',
      'ia': 'x', 'ua': 'x', 'iao': 'c', 'ian': 'm', 'iang': 'l', 'iong': 's',
      'uai': 'y', 'uan': 'r', 'uang': 'l', 'üan': 'r', 'üan': 't'
    }
  },
 微软: {
    shengmu: {
      'zh': 'v', 'ch': 'i', 'sh': 'u',
      'b': 'b', 'p': 'p', 'm': 'm', 'f': 'f',
      'd': 'd', 't': 't', 'n': 'n', 'l': 'l',
      'g': 'g', 'k': 'k', 'h': 'h',
      'j': 'j', 'q': 'q', 'x': 'x',
      'r': 'r', 'y': 'y', 'w': 'w'
    },
    yunmu: {
      'a': 'a', 'o': 'o', 'e': 'e', 'i': 'i', 'u': 'u', 'v': 'v',
      'ai': 'l', 'ei': 'z', 'ui': 'u', 'ao': 'k', 'ou': 'y', 'iu': 'p',
      'ie': 'x', 've': 't', 'er': 'r', 'an': 'f', 'en': 'g', 'in': 'h',
      'un': 'j', 'vn': 'v', 'ang': 'h', 'eng': 'g', 'ing': ';', 'ong': 's'
    }
  }
}

// 全拼转双拼
function quanpinToShuangpin(quanpin, scheme) {
  const schemeData = shuangpinSchemes[scheme]
  if (!schemeData) return quanpin

  let result = ''
  let i = 0

  while (i < quanpin.length) {
    // 尝试匹配2-4个字符的韵母
    let matched = false

    // 先尝试3个字符
    if (i + 3 <= quanpin.length) {
      const three = quanpin.slice(i, i + 3)
      if (schemeData.yunmu[three]) {
        result += schemeData.yunmu[three]
        i += 3
        matched = true
      }
    }

    // 再尝试2个字符
    if (!matched && i + 2 <= quanpin.length) {
      const two = quanpin.slice(i, i + 2)
      if (schemeData.yunmu[two]) {
        result += schemeData.yunmu[two]
        i += 2
        matched = true
      }
    }

    // 最后尝试1个字符
    if (!matched) {
      const one = quanpin[i]
      // 检查是否是声母
      if (schemeData.shengmu[one]) {
        result += schemeData.shengmu[one]
      } else if (schemeData.yunmu[one]) {
        // 零声母
        result += schemeData.yunmu[one]
      } else {
        result += one
      }
      i++
    }
  }

  return result
}

export function useShuangpin() {
  const currentScheme = ref('xiaohé')

  function setScheme(scheme) {
    if (shuangpinSchemes[scheme]) {
      currentScheme.value = scheme
    }
  }

  // 将汉字文本转换为按键序列
  function convertToKeySequence(text, mode = 'shuangpin') {
    // MVP阶段简化处理：英文模式直接返回字符序列
    if (mode === 'en') {
      return text.split('').map(char => ({
        char,
        display: char,
        finger: null
      }))
    }

    // 全拼和双拼模式需要将汉字转换为拼音
    // 这里使用简单的处理方式，实际应该使用pinyin-pro库
    if (mode === 'pinyin' || mode === 'shuangpin') {
      // MVP阶段：假设输入已经是拼音或双拼格式
      // 实际产品中需要使用pinyin-pro库将汉字转为拼音
      const chars = text.split('')
      return chars.map(char => {
        let pinyin = char
        let shuangpinCode = char

        if (mode === 'shuangpin') {
          shuangpinCode = quanpinToShuangpin(char, currentScheme.value)
        }

        return {
          char: shuangpinCode,
          display: mode === 'shuangpin' ? `${char}→${shuangpinCode}` : char,
          original: char,
          finger: null
        }
      })
    }

    return []
  }

  function getAvailableSchemes() {
    return Object.keys(shuangpinSchemes)
  }

  function getSchemeYunmuMap(scheme) {
    return shuangpinSchemes[scheme]?.yunmu || {}
  }

  return {
    currentScheme,
    setScheme,
    convertToKeySequence,
    getAvailableSchemes,
    getSchemeYunmuMap,
    shuangpinSchemes
  }
}