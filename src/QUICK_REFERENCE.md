# School Quest - 빠른 참조 가이드 ⚡

## 🎨 색상 코드 치트시트

### 퀘스트별 메인 그라데이션
```css
/* 수업 퀘스트 */
bg-gradient-to-br from-cyan-600/80 via-blue-600/70 to-indigo-700/60
배경: from-cyan-900 via-blue-800 via-indigo-900 to-purple-900

/* 학교 퀘스트 */
bg-gradient-to-br from-emerald-600/80 via-green-600/70 to-teal-700/60
배경: from-emerald-900 via-green-800 via-teal-900 to-cyan-900

/* 공부 레이드 */
bg-gradient-to-br from-pink-600/80 via-purple-600/70 to-violet-700/60
배경: from-pink-900 via-purple-800 via-violet-900 to-indigo-900

/* 업적/보상 */
bg-gradient-to-br from-yellow-600/40 to-orange-600/30
border: border-yellow-400/50
shadow: shadow-lg shadow-yellow-500/20
```

## 📦 타입 정의 모음

```typescript
// 학생 프로필
interface StudentProfile {
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

// 수업 퀘스트
interface ClassQuest {
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

// 학교 퀘스트
interface SchoolQuest {
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

// 공부 레이드
interface StudyRaid {
  id: string;
  title: string;
  subject: string;
  description: string;
  assignedBy: string;
  participants: string[];
  maxParticipants: number;
  difficulty: 'easy' | 'medium' | 'hard';
  rewards: { experience: number; items: string[]; };
  deadline: Date;
  isActive: boolean;
  progress: number;
  content: { assignments: Assignment[]; };
}
```

## 🎭 애니메이션 스니펫

```typescript
// 페이지 진입
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
>

// 카드 호버
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>

// 파티클 효과
<motion.div
  animate={{
    x: [0, Math.random() * 1200],
    y: [0, Math.random() * 800],
    opacity: [0, 1, 0],
    scale: [0.5, 1.5, 0.5]
  }}
  transition={{
    duration: Math.random() * 12 + 18,
    repeat: Infinity,
    delay: Math.random() * 10
  }}
/>
```

## 🧩 자주 사용하는 컴포넌트 패턴

### 글래스모피즘 카드
```typescript
<Card className="bg-black/40 border-white/20 backdrop-blur-sm">
  <CardHeader>
    <CardTitle className="text-white">제목</CardTitle>
  </CardHeader>
  <CardContent>
    {/* 내용 */}
  </CardContent>
</Card>
```

### 그라데이션 통계 박스
```typescript
<div className="bg-gradient-to-br from-cyan-600/40 to-blue-600/30 border border-cyan-400/50 rounded-lg p-4 shadow-lg shadow-cyan-500/20">
  <div className="text-2xl font-bold text-cyan-300">{value}</div>
  <div className="text-sm text-gray-200">{label}</div>
</div>
```

### 상단 네비게이션
```typescript
<nav className="bg-black/30 border-b border-white/10 backdrop-blur-sm sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex items-center justify-between h-16">
      {/* 내용 */}
    </div>
  </div>
</nav>
```

## 🎯 아이콘 매핑

```typescript
import {
  BookOpen,      // 수업 퀘스트 메인
  School,        // 학교 퀘스트 메인
  Users,         // 공부 레이드 메인
  Calculator,    // 수학
  Brain,         // 화학
  Trophy,        // 업적
  Star,          // 별/등급
  Crown,         // 보상
  Target,        // 목표/완료
  Clock,         // 시간
  Camera,        // 인증
  Sword,         // 개인 과제
  Shield,        // 협업 과제
} from 'lucide-react';
```

## 📐 반응형 그리드

```typescript
// 기본 패턴
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// 프로필 카드 내부
className="grid grid-cols-3 gap-4"

// 퀘스트 뷰 (2열)
className="grid grid-cols-1 lg:grid-cols-2 gap-6"
```

## 🎨 배지 색상 시스템

```typescript
// 난이도
const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'easy': return 'bg-green-500';
    case 'medium': return 'bg-yellow-500';
    case 'hard': return 'bg-red-500';
  }
};

// 카테고리 (학교 퀘스트)
const categoryColors = {
  cleaning: 'bg-blue-500',
  safety: 'bg-red-500',
  community: 'bg-green-500',
  environment: 'bg-emerald-500'
};
```

## 🔧 유틸리티 함수

```typescript
// 마감일 포맷팅
const formatDeadline = (date: Date) => {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return '오늘까지';
  if (days === 1) return '내일까지';
  return `${days}일 후`;
};

// 완료율 계산
const completionRate = Math.round(
  (completedQuests / totalQuests) * 100
);
```

## 📱 모바일 최적화 클래스

```css
/* 텍스트 크기 */
text-base md:text-lg lg:text-xl

/* 패딩 */
p-4 md:p-6 lg:p-8

/* 간격 */
gap-4 md:gap-6 lg:gap-8

/* 그리드 */
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

## 🌈 파티클 색상 배열

```typescript
const particleColors = [
  'bg-pink-400/40',
  'bg-purple-400/40',
  'bg-blue-400/40',
  'bg-cyan-400/40',
  'bg-yellow-400/40',
  'bg-green-400/40'
];

const randomColor = particleColors[
  Math.floor(Math.random() * particleColors.length)
];
```

## 📚 필수 import 문

```typescript
// 기본
import { useState } from 'react';
import { motion } from 'motion/react';

// UI 컴포넌트
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

// 아이콘
import { 
  ArrowLeft, BookOpen, School, Users, 
  Trophy, Clock, Target 
} from 'lucide-react';

// 타입
import type { 
  StudentProfile, 
  ClassQuest, 
  SchoolQuest, 
  StudyRaid 
} from '../types/questTypes';
```

## 🎪 배경 패턴 템플릿

```typescript
{/* 배경 효과 */}
<div className="absolute inset-0 opacity-30">
  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 via-blue-500/10 to-cyan-500/10"></div>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(236,72,153,0.1)_1px,transparent_0)] bg-[length:40px_40px]"></div>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(59,130,246,0.1)_1px,transparent_0)] bg-[length:60px_60px]"></div>
</div>
```

## ⚙️ 프로젝트 설정 (package.json 예시)

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "motion": "latest",
    "lucide-react": "latest"
  }
}
```

## 🚀 빠른 시작 명령어

```bash
# 프로젝트 생성
npm create vite@latest school-quest -- --template react-ts

# 의존성 설치
npm install motion lucide-react

# Tailwind CSS v4 설치
npm install tailwindcss@next

# 개발 서버 실행
npm run dev
```

---

**Tip**: 이 가이드를 북마크하여 개발 중 빠르게 참조하세요! 🔖
