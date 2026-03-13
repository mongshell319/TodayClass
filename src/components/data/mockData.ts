import type { Student, Quest, Dungeon, BossAttack } from '../types/schoolQuest';

export const mockCurrentStudent: Student = {
  id: 'student1',
  name: '김민수',
  level: 15,
  experience: 2340,
  maxExperience: 3000,
  role: 'dps',
  hp: 100,
  maxHp: 100,
  mp: 80,
  maxMp: 100,
  avatar: 'https://images.unsplash.com/photo-1638012107344-3ed0f994d8d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwYW5pbWUlMjBjaGFyYWN0ZXIlMjBhdmF0YXJ8ZW58MXx8fHwxNzU5MzE5NjA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  isOnline: true,
  contributions: 12,
  penalties: 1
};

export const mockPartyMembers: Student[] = [
  {
    id: 'student2',
    name: '박지영',
    level: 14,
    experience: 2100,
    maxExperience: 2800,
    role: 'tank',
    hp: 120,
    maxHp: 120,
    mp: 60,
    maxMp: 80,
    avatar: 'https://images.unsplash.com/photo-1633381182794-01b10764b431?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBzdHVkZW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU5MzE5NjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isOnline: true,
    contributions: 10,
    penalties: 0
  },
  {
    id: 'student3',
    name: '이철수',
    level: 13,
    experience: 1800,
    maxExperience: 2600,
    role: 'healer',
    hp: 90,
    maxHp: 90,
    mp: 100,
    maxMp: 100,
    avatar: 'https://images.unsplash.com/photo-1750926013403-407ff0b0db06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwc3R1ZGVudCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1OTMxOTYyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isOnline: true,
    contributions: 8,
    penalties: 2
  },
  {
    id: 'student4',
    name: '최영희',
    level: 16,
    experience: 2800,
    maxExperience: 3200,
    role: 'support',
    hp: 95,
    maxHp: 95,
    mp: 90,
    maxMp: 95,
    avatar: 'https://images.unsplash.com/photo-1561065533-316e3142d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHBlcnNvbiUyMHN0dWRlbnR8ZW58MXx8fHwxNzU5MzE5NjI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isOnline: false,
    contributions: 15,
    penalties: 0
  }
];

export const mockDungeon: Dungeon = {
  id: 'math-ch3',
  subject: '수학',
  chapter: '3단원',
  title: '이차함수의 그래프',
  difficulty: 'medium',
  maxStudents: 4,
  currentStudents: 4,
  status: 'in-progress',
  bossHp: 2800,
  maxBossHp: 5000,
  questsCompleted: 7,
  totalQuests: 10,
  timeLimit: 45,
  timeRemaining: 28,
  rewards: {
    experience: 500,
    items: ['이차함수 마스터 배지', '수학 포션 x3']
  }
};

export const mockActiveQuests: Quest[] = [
  {
    id: 'quest1',
    type: 'question',
    title: '개념 확인 질문',
    description: '이차함수의 꼭짓점 공식을 설명하세요',
    assignedRole: 'dps',
    assignedStudent: 'student1',
    difficulty: 'easy',
    timeLimit: 300,
    timeRemaining: 180,
    isCompleted: false,
    isActive: true,
    points: 100,
    content: {
      question: '이차함수 f(x) = ax² + bx + c의 꼭짓점 좌표는?',
      options: ['(-b/2a, f(-b/2a))', '(b/2a, f(b/2a))', '(-b/a, f(-b/a))', '(b/a, f(b/a))'],
      correctAnswer: '(-b/2a, f(-b/2a))'
    }
  },
  {
    id: 'quest2',
    type: 'problem',
    title: '연습문제 해결',
    description: '주어진 문제를 단계별로 해결하세요',
    assignedRole: 'tank',
    assignedStudent: 'student2',
    difficulty: 'medium',
    timeLimit: 600,
    timeRemaining: 420,
    isCompleted: false,
    isActive: true,
    points: 200,
    content: {
      problem: 'f(x) = 2x² - 8x + 3의 그래프를 그리고 최솟값을 구하시오.'
    }
  }
];

export const mockBossAttacks: BossAttack[] = [
  {
    id: 'confusion',
    name: '혼란의 공격',
    damage: 20,
    description: '잘못된 정보로 학생들을 혼란시킵니다',
    type: 'magical'
  },
  {
    id: 'timecrunch',
    name: '시간 압박',
    damage: 15,
    description: '남은 시간을 단축시킵니다',
    type: 'special'
  },
  {
    id: 'difficulty',
    name: '난이도 상승',
    damage: 25,
    description: '문제의 난이도를 높입니다',
    type: 'physical'
  }
];