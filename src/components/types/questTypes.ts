// 새로운 퀘스트 시스템 타입 정의

export type QuestCategory = 'class' | 'school' | 'study-raid';

export interface StudentProfile {
  id: string;
  name: string;
  studentId: string;
  class: string;
  level: number;
  experience: number;
  maxExperience: number;
  avatar?: string;
  totalQuests: number;
  completedQuests: number;
  achievements: Achievement[];
  stats: {
    classQuests: number;
    schoolQuests: number;
    studyRaids: number;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: Date;
  category: QuestCategory;
}

export interface ClassQuest {
  id: string;
  title: string;
  subject: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  timeLimit: number;
  isActive: boolean;
  isCompleted: boolean;
  content: {
    question?: string;
    options?: string[];
    problem?: string;
    hints?: string[];
  };
}

export interface SchoolQuest {
  id: string;
  title: string;
  category: 'cleaning' | 'safety' | 'community' | 'environment';
  description: string;
  points: number;
  deadline: Date;
  isCompleted: boolean;
  verificationRequired: boolean;
  instructions: string[];
}

export interface StudyRaid {
  id: string;
  title: string;
  subject: string;
  description: string;
  assignedBy: string; // 선생님 이름
  participants: string[];
  maxParticipants: number;
  difficulty: 'easy' | 'medium' | 'hard';
  rewards: {
    experience: number;
    items: string[];
  };
  deadline: Date;
  isActive: boolean;
  progress: number;
  content: {
    assignments: Assignment[];
  };
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'collaborative';
  isCompleted: boolean;
  completedBy?: string[];
}