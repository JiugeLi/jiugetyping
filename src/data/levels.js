// 基准键位阶段关卡数据（第一阶段）- 扩展到20个
export const homeRowLevels = [
  {
    id: '1-1',
    title: {
      zh: '找准基准',
      en: 'Find Home Row'
    },
    stage: 1,
    targetFingers: ['L4', 'R4', 'THUMB'],
    mode: 'en',
    content: 'fjf jfj fjf jfj fjf jfj fjf jfj\nfjf jfj fjf jfj fjf jfj fjf jfj',
    prerequisite: null,
    starThresholds: { 1: { accuracy: 85, wpm: 10 }, 2: { accuracy: 90, wpm: 20 }, 3: { accuracy: 95, wpm: 30 }, 4: { accuracy: 98, wpm: 40 }, 5: { accuracy: 100, wpm: 50 }}
  },
  {
    id: '1-2',
    title: {
      zh: '食指交替',
      en: 'Index Alternation'
    },
    stage: 1,
    targetFingers: ['L4', 'R4', 'THUMB'],
    mode: 'en',
    content: 'fff jjj fff jjj fjf jfj fjf jfj ffj jff\nfff jjj fff jjj fjf jfj fjf jfj ffj jff',
    prerequisite: null,
    starThresholds: { 1: { accuracy: 85, wpm: 15 }, 2: { accuracy: 90, wpm: 25 }, 3: { accuracy: 95, wpm: 35 }, 4: { accuracy: 98, wpm: 45 }, 5: { accuracy: 100, wpm: 55 }}
  },
  {
    id: '1-3',
    title: {
      zh: '中指出场',
      en: 'Middle Finger Entry'
    },
    stage: 1,
    targetFingers: ['L3', 'R3', 'THUMB'],
    mode: 'en',
    content: 'dkd kdk dkd kdk dkd kdk dkdkd kdkd dkd\ndkd kdk dkd kdk dkd kdk dkdkd kdkd dkd',
    prerequisite: null,
    starThresholds: { 1: { accuracy: 85, wpm: 15 }, 2: { accuracy: 90, wpm: 25 }, 3: { accuracy: 95, wpm: 35 }, 4: { accuracy: 98, wpm: 45 }, 5: { accuracy: 100, wpm: 50 }}
  },
  {
    id: '1-4',
    title: {
      zh: '食指与中指',
      en: 'Index & Middle'
    },
    stage: 1,
    targetFingers: ['L3', 'L4', 'R3', 'R4', 'THUMB'],
    mode: 'en',
    content: 'fjd kjf dkj fkd fjd jkf dkf fjk dfkj fdkj\nfjd kjf dkj fkd fjd jkf dkf fjk dfkj fdkj',
    prerequisite: null,
    starThresholds: { 1: { accuracy: 85, wpm: 15 }, 2: { accuracy: 90, wpm: 25 }, 3: { accuracy: 95, wpm: 35 }, 4: { accuracy: 98, wpm: 45 }, 5: { accuracy: 100, wpm: 50 }}
  },
  {
    id: '1-5',
    title: {
      zh: '无名指入门',
      en: 'Ring Finger Start'
    },
    stage: 1,
    targetFingers: ['L2', 'R2', 'THUMB'],
    mode: 'en',
    content: 'sls lsl sls lsl slsls ls lsls lsls sls\nsls lsl sls lsl slsls ls lsls lsls sls',
    prerequisite: null,
    starThresholds: { 1: { accuracy: 85, wpm: 12 }, 2: { accuracy: 90, wpm: 22 }, 3: { accuracy: 95, wpm: 32 }, 4: { accuracy: 98, wpm: 42 }, 5: { accuracy: 100, wpm: 50 }}
  },
  {
    id: '1-6',
    title: {
      zh: '四指协调',
      en: 'Four-Finger Coord'
    },
    stage: 1,
    targetFingers: ['L2', 'L3', 'L4', 'R2', 'R3', 'R4', 'THUMB'],
    mode: 'en',
    content: 'fjs dk lsf jkd fsj lkd fks jdl skdj flks\nfjs dk lsf jkd fsj lkd fks jdl skdj flks',
    prerequisite: null,
    starThresholds: { 1: { accuracy: 85, wpm: 15 }, 2: { accuracy: 90, wpm: 25 }, 3: { accuracy: 95, wpm: 35 }, 4: { accuracy: 98, wpm: 45 }, 5: { accuracy: 100, wpm: 50 }}
  },
  {
    id: '1-7',
    title: {
      zh: '小指初体验',
      en: 'Pinky First Time'
    },
    stage: 1,
    targetFingers: ['L1', 'R1'],
    mode: 'en',
    content: "a;a;a; ;a;a; ;;;a;a; ;a;a;a;;; a;a\na;a;a; ;a;a; ;;;a;a; ;a;a;a;;; a;a",
    prerequisite: null,
    starThresholds: { 1: { accuracy: 85, wpm: 10 }, 2: { accuracy: 90, wpm: 18 }, 3: { accuracy: 95, wpm: 28 }, 4: { accuracy: 98, wpm: 38 }, 5: { accuracy: 100, wpm: 45 }}
  },
  {
    id: '1-8',
    title: {
      zh: '小指与无名指',
      en: 'Pinky & Ring'
    },
    stage: 1,
    targetFingers: ['L1', 'L2', 'R1', 'R2', 'THUMB'],
    mode: 'en',
    content: "as;l as;l as;l sla; sla; as;l la;s as;l\nas;l as;l as;l sla; sla; as;l la;s as;l",
    prerequisite: null,
    starThresholds: { 1: { accuracy: 85, wpm: 12 }, 2: { accuracy: 90, wpm: 20 }, 3: { accuracy: 95, wpm: 30 }, 4: { accuracy: 98, wpm: 40 }, 5: { accuracy: 100, wpm: 48 }}
  },
  {
    id: '1-9',
    title: {
      zh: 'Home Row综合',
      en: 'Home Row Mix'
    },
    stage: 1,
    targetFingers: ['L1', 'L2', 'L3', 'L4', 'R1', 'R2', 'R3', 'R4', 'THUMB'],
    mode: 'en',
    content: 'asdf jkl; asdf jkl; asdf jkl; fjdk sl;f\nasdf jkl; asdf jkl; asdf jkl; fjdk sl;f',
    prerequisite: null,
    starThresholds: { 1: { accuracy: 85, wpm: 15 }, 2: { accuracy: 90, wpm: 25 }, 3: { accuracy: 95, wpm: 35 }, 4: { accuracy: 98, wpm: 45 }, 5: { accuracy: 100, wpm: 55 }}
  },
  {
    id: '1-10',
    title: {
      zh: '拇指空格',
      en: 'Thumb Space'
    },
    stage: 1,
    targetFingers: ['L1', 'L2', 'L3', 'L4', 'R1', 'R2', 'R3', 'R4', 'THUMB'],
    mode: 'en',
    content: 'a sad lad ask a dad a lass a ask all\na sad lad ask a dad a lass a ask all fall',
    prerequisite: null,
    starThresholds: { 1: { accuracy: 85, wpm: 15 }, 2: { accuracy: 90, wpm: 25 }, 3: { accuracy: 95, wpm: 35 }, 4: { accuracy: 98, wpm: 45 }, 5: { accuracy: 100, wpm: 55 }}
  },
  {
    id: '1-11',
    title: {
      zh: '全指灵活',
      en: 'All Fingers Agile'
    },
    stage: 1,
    targetFingers: ['L1', 'L2', 'L3', 'L4', 'R1', 'R2', 'R3', 'R4', 'THUMB'],
    mode: 'en',
    content: 'asdfg hjkl; asdfg hjkl; asd ;lkj fghj\nasdfg hjkl; asdfg hjkl; asd ;lkj fghj',
    prerequisite: null,
    starThresholds: { 1: { accuracy: 85, wpm: 18 }, 2: { accuracy: 90, wpm: 28 }, 3: { accuracy: 95, wpm: 38 }, 4: { accuracy: 98, wpm: 48 }, 5: { accuracy: 100, wpm: 58 }}
  },
  {
    id: '1-12',
    title: {
      zh: '节奏练习',
      en: 'Rhythm Practice'
    },
    stage: 1,
    targetFingers: ['L1', 'L2', 'L3', 'L4', 'R1', 'R2', 'R3', 'R4', 'THUMB'],
    mode: 'en',
    content: 'the dog cat log rat bat hat sat mat\nthe dog cat log rat bat hat sat mat fat',
    prerequisite: null,
    starThresholds: { 1: { accuracy: 85, wpm: 20 }, 2: { accuracy: 90, wpm: 30 }, 3: { accuracy: 95, wpm: 40 }, 4: { accuracy: 98, wpm: 50 }, 5: { accuracy: 100, wpm: 60 }}
  },
  {
    id: '1-13',
    title: {
      zh: '连贯打字',
      en: 'Flow Typing'
    },
    stage: 1,
    targetFingers: ['L1', 'L2', 'L3', 'L4', 'R1', 'R2', 'R3', 'R4', 'THUMB'],
    mode: 'en',
    content: 'jazz fizz buzz fuzz puss muss grass class\njazz fizz buzz fuzz puss muss grass class pass',
    prerequisite: null,
    starThresholds: { 1: { accuracy: 85, wpm: 22 }, 2: { accuracy: 90, wpm: 32 }, 3: { accuracy: 95, wpm: 42 }, 4: { accuracy: 98, wpm: 52 }, 5: { accuracy: 100, wpm: 62 }}
  },
  {
    id: '1-14',
    title: {
      zh: '单词组合',
      en: 'Word Combo'
    },
    stage: 1,
    targetFingers: ['L1', 'L2', 'L3', 'L4', 'R1', 'R2', 'R3', 'R4', 'THUMB'],
    mode: 'en',
    content: 'ask dad lad sad has had ass all off add\nask dad lad sad has had ass all off add odd',
    prerequisite: null,
    starThresholds: { 1: { accuracy: 85, wpm: 22 }, 2: { accuracy: 90, wpm: 32 }, 3: { accuracy: 95, wpm: 42 }, 4: { accuracy: 98, wpm: 52 }, 5: { accuracy: 100, wpm: 62 }}
  },
  {
    id: '1-15',
    title: {
      zh: '速度提升',
      en: 'Speed Boost'
    },
    stage: 1,
    targetFingers: ['L1', 'L2', 'L3', 'L4', 'R1', 'R2', 'R3', 'R4', 'THUMB'],
    mode: 'en',
    content: 'salt talk tall hall fall call wall ball mall\nsalt talk tall hall fall call wall ball mall gall',
    prerequisite: null,
    starThresholds: { 1: { accuracy: 85, wpm: 25 }, 2: { accuracy: 90, wpm: 35 }, 3: { accuracy: 95, wpm: 45 }, 4: { accuracy: 98, wpm: 55 }, 5: { accuracy: 100, wpm: 65 }}
  },
  {
    id: '1-16',
    title: {
      zh: '精准度训练',
      en: 'Precision Drill'
    },
    stage: 1,
    targetFingers: ['L1', 'L2', 'L3', 'L4', 'R1', 'R2', 'R3', 'R4', 'THUMB'],
    mode: 'en',
    content: 'flag flax flat slab slay sway play plan plea plow\nflag flax flat slab slay sway play plan plea plow slow',
    prerequisite: null,
    starThresholds: { 1: { accuracy: 90, wpm: 25 }, 2: { accuracy: 93, wpm: 35 }, 3: { accuracy: 96, wpm: 45 }, 4: { accuracy: 98, wpm: 55 }, 5: { accuracy: 100, wpm: 65 }}
  },
  {
    id: '1-17',
    title: {
      zh: '混合手指',
      en: 'Mixed Fingers'
    },
    stage: 1,
    targetFingers: ['L1', 'L2', 'L3', 'L4', 'R1', 'R2', 'R3', 'R4', 'THUMB'],
    mode: 'en',
    content: 'jump luck pump dump hump lump bump gump rump\njump luck pump dump hump lump bump gump rump sump',
    prerequisite: null,
    starThresholds: { 1: { accuracy: 85, wpm: 28 }, 2: { accuracy: 90, wpm: 38 }, 3: { accuracy: 95, wpm: 48 }, 4: { accuracy: 98, wpm: 58 }, 5: { accuracy: 100, wpm: 68 }}
  },
  {
    id: '1-18',
    title: {
      zh: '流畅性训练',
      en: 'Fluency Drill'
    },
    stage: 1,
    targetFingers: ['L1', 'L2', 'L3', 'L4', 'R1', 'R2', 'R3', 'R4', 'THUMB'],
    mode: 'en',
    content: 'dark park mark bark yard card hard ward warm\ndark park mark bark yard card hard ward warm farm',
    prerequisite: null,
    starThresholds: { 1: { accuracy: 85, wpm: 30 }, 2: { accuracy: 90, wpm: 40 }, 3: { accuracy: 95, wpm: 50 }, 4: { accuracy: 98, wpm: 60 }, 5: { accuracy: 100, wpm: 70 }}
  },
  {
    id: '1-19',
    title: {
      zh: '高强度练习',
      en: 'Intensity Drill'
    },
    stage: 1,
    targetFingers: ['L1', 'L2', 'L3', 'L4', 'R1', 'R2', 'R3', 'R4', 'THUMB'],
    mode: 'en',
    content: 'world word work worm worn norm form storm storm\nworld word work worm worn norm form storm storm born',
    prerequisite: null,
    starThresholds: { 1: { accuracy: 85, wpm: 32 }, 2: { accuracy: 90, wpm: 42 }, 3: { accuracy: 95, wpm: 52 }, 4: { accuracy: 98, wpm: 62 }, 5: { accuracy: 100, wpm: 72 }}
  },
  {
    id: '1-20',
    title: {
      zh: '基准键位大师',
      en: 'Home Row Master'
    },
    stage: 1,
    targetFingers: ['L1', 'L2', 'L3', 'L4', 'R1', 'R2', 'R3', 'R4', 'THUMB'],
    mode: 'en',
    content: 'the quick brown fox jumps over lazy dog sphinx quartz\nthe quick brown fox jumps over lazy dog sphinx quartz judge',
    prerequisite: null,
    starThresholds: { 1: { accuracy: 90, wpm: 35 }, 2: { accuracy: 93, wpm: 45 }, 3: { accuracy: 96, wpm: 55 }, 4: { accuracy: 98, wpm: 65 }, 5: { accuracy: 100, wpm: 75 }}
  }
]

// 获取所有关卡
export function getAllLevels() {
  return homeRowLevels
}

// 根据ID获取关卡
export function getLevelById(id) {
  return homeRowLevels.find(level => level.id === id)
}

// 根据阶段获取关卡
export function getLevelsByStage(stage) {
  return homeRowLevels.filter(level => level.stage === stage)
}
