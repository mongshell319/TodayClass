import { Shield, Sword, Heart, Zap, HelpCircle, Calculator, Eye, MessageSquare, Users } from 'lucide-react';
import type { StudentRole, QuestType, DungeonStatus } from '../types/schoolQuest';

// 역할별 정보 반환
export const getRoleInfo = (role: StudentRole) => {
  switch (role) {
    case 'tank':
      return { color: 'bg-blue-500', icon: Shield, name: '탱커' };
    case 'dps':
      return { color: 'bg-red-500', icon: Sword, name: '딜러' };
    case 'healer':
      return { color: 'bg-green-500', icon: Heart, name: '힐러' };
    case 'support':
      return { color: 'bg-purple-500', icon: Zap, name: '서포터' };
  }
};

// 퀘스트 타입별 아이콘 반환
export const getQuestIcon = (type: QuestType) => {
  switch (type) {
    case 'question': return HelpCircle;
    case 'problem': return Calculator;
    case 'understanding': return Eye;
    case 'discussion': return MessageSquare;
    case 'presentation': return Users;
  }
};

// 던전 상태에 따른 배경 그라데이션 반환
export const getDungeonStatusColor = (status: DungeonStatus) => {
  switch (status) {
    case 'preparing': return 'from-blue-900 via-slate-800 to-gray-900';
    case 'in-progress': return 'from-purple-900 via-slate-800 to-gray-900';
    case 'boss-fight': return 'from-red-900 via-slate-800 to-gray-900';
    case 'completed': return 'from-green-900 via-slate-800 to-gray-900';
    case 'failed': return 'from-gray-900 via-slate-800 to-black';
  }
};

// 시간 포맷팅 (초 -> 분:초)
export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// 난이도 색상 반환
export const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
  switch (difficulty) {
    case 'easy': return 'bg-green-500';
    case 'medium': return 'bg-yellow-500';
    case 'hard': return 'bg-red-500';
  }
};

// 난이도 텍스트 반환
export const getDifficultyText = (difficulty: 'easy' | 'medium' | 'hard') => {
  switch (difficulty) {
    case 'easy': return '쉬움';
    case 'medium': return '보통';
    case 'hard': return '어려움';
  }
};