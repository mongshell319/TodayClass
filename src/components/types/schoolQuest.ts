// School Quest 관련 타입 정의

export type StudentRole = 'tank' | 'dps' | 'healer' | 'support';
export type QuestType = 'question' | 'problem' | 'understanding' | 'discussion' | 'presentation';
export type DungeonStatus = 'preparing' | 'in-progress' | 'boss-fight' | 'completed' | 'failed';

export interface Student {
  id: string;
  name: string;
  level: number;
  experience: number;
  maxExperience: number;
  role: StudentRole;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  avatar?: string;
  isOnline: boolean;
  contributions: number;
  penalties: number;
}

export interface Quest {
  id: string;
  type: QuestType;
  title: string;
  description: string;
  assignedRole?: StudentRole;
  assignedStudent?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number; // seconds
  timeRemaining: number;
  isCompleted: boolean;
  isActive: boolean;
  points: number;
  content?: {
    question?: string;
    options?: string[];
    correctAnswer?: string;
    problem?: string;
    topic?: string;
  };
}

export interface Dungeon {
  id: string;
  subject: string;
  chapter: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  maxStudents: number;
  currentStudents: number;
  status: DungeonStatus;
  bossHp: number;
  maxBossHp: number;
  questsCompleted: number;
  totalQuests: number;
  timeLimit: number; // minutes
  timeRemaining: number;
  rewards: {
    experience: number;
    items: string[];
  };
}

export interface BossAttack {
  id: string;
  name: string;
  damage: number;
  description: string;
  type: 'physical' | 'magical' | 'special';
}