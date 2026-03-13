# 오늘의 수업 - School Quest 프로젝트 문서

## 📋 프로젝트 개요

**프로젝트명**: 오늘의 수업 (School Quest)  
**목적**: 교사를 위한 학급 관리 및 생활기록부 작성 지원 플랫폼  
**주요 기능**: 게임화된 학습 대시보드로 학생 동기부여 증진  
**기술 스택**: React, TypeScript, Tailwind CSS v4, Motion (Framer Motion)

---

## 🎨 디자인 시스템

### 색상 테마
- **메인 컬러**: 슬레이트-퍼플-핑크 그라데이션
- **배경 그라데이션**:
  - `from-pink-900 via-purple-900 via-blue-900 to-cyan-900`
  - `from-rose-600 via-purple-600 via-blue-600 to-cyan-600`
  - `from-cyan-900 via-blue-800 via-indigo-900 to-purple-900` (수업 퀘스트)
  - `from-emerald-900 via-green-800 via-teal-900 to-cyan-900` (학교 퀘스트)
  - `from-pink-900 via-purple-800 via-violet-900 to-indigo-900` (공부 레이드)

### 타이포그래피
```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&family=Noto+Serif+KR:wght@300;400;500;600;700&display=swap');
```
- **Noto Serif KR**: 제목 및 감성적인 텍스트
- **Noto Sans KR**: 본문 및 일반 텍스트

### 비주얼 효과
1. **파티클 효과**: 무지개 색상의 떠다니는 파티클
2. **배경 패턴**: 라디얼 그라디언트 점 패턴
3. **블러 효과**: `backdrop-blur-sm`, `backdrop-blur-md`
4. **그림자**: `shadow-2xl`, `shadow-lg` with color variants
5. **애니메이션**: Motion(Framer Motion)을 활용한 부드러운 전환

---

## 🏗️ 프로젝트 구조

```
/
├── App.tsx                          # 메인 앱 컴포넌트 (뷰 라우팅)
├── styles/
│   └── globals.css                  # 전역 스타일 및 애니메이션
├── components/
│   ├── LandingPage.tsx              # 랜딩 페이지 (홈)
│   ├── SchoolQuest.tsx              # School Quest 메인
│   ├── TeacherDashboard.tsx         # 교사 대시보드
│   ├── SchoolLife.tsx               # 학교 생활 도구
│   ├── StudentRecord.tsx            # 생활기록부
│   ├── MusicPlayer.tsx              # YouTube 음악 플레이어
│   ├── Logo.tsx                     # 로고 컴포넌트
│   │
│   ├── quest/                       # School Quest 관련 컴포넌트
│   │   ├── StudentProfileCard.tsx   # 학생 프로필 카드
│   │   ├── QuestMenuCard.tsx        # 퀘스트 메뉴 카드
│   │   ├── ClassQuestView.tsx       # 수업 퀘스트 뷰
│   │   ├── SchoolQuestView.tsx      # 학교 퀘스트 뷰
│   │   └── StudyRaidView.tsx        # 공부 레이드 뷰
│   │
│   ├── types/                       # TypeScript 타입 정의
│   │   ├── questTypes.ts            # 퀘스트 관련 타입
│   │   └── schoolQuest.ts           # 기존 School Quest 타입
│   │
│   └── ui/                          # 재사용 가능한 UI 컴포넌트
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── progress.tsx
│       ├── avatar.tsx
│       └── ... (기타 UI 컴포넌트)
```

---

## 🎮 School Quest 시스템

### 메인 화면 구성

#### 1. 네비게이션 바
- **로고**: School Quest 브랜딩
- **제목**: "School Quest - 학습과 성장의 여정"
- **우측 메뉴**:
  - 알림 버튼 (Bell 아이콘)
  - 설정 버튼 (Settings 아이콘)
  - "홈으로" 버튼
  - 사용자 아바타 및 레벨 표시

#### 2. 학생 프로필 카드 (`StudentProfileCard.tsx`)
**위치**: 메인 화면 상단

**구성 요소**:
- **왼쪽 영역**:
  - 학생 아바타 (132x132px)
  - 레벨 배지 (아바타 우하단)
  
- **오른쪽 영역**:
  - 학생 이름 (text-3xl)
  - 학년/반 배지
  - 학번 배지
  - 경험치 프로그레스 바
  - 성과 통계 (완료 퀘스트 / 완료율 / 업적)

- **하단 영역**:
  - **카테고리별 통계** (3열 그리드):
    1. 수업 퀘스트 (cyan 그라데이션)
    2. 학교 퀘스트 (emerald 그라데이션)
    3. 공부 레이드 (pink 그라데이션)
  - **최근 업적** (가로 스크롤):
    - 업적 아이콘 + 제목 + 설명
    - 황금색 그라데이션 카드

**타입 정의**:
```typescript
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
```

#### 3. 퀘스트 메뉴 (`QuestMenuCard.tsx`)
**위치**: 프로필 카드 아래, 3열 그리드

**3가지 퀘스트 타입**:

1. **수업 퀘스트** (Class Quest)
   - 아이콘: `BookOpen`
   - 색상: cyan-blue-indigo 그라데이션
   - 설명: "실시간 수업 중 문제 해결과 학습 활동"
   
2. **학교 퀘스트** (School Quest)
   - 아이콘: `School`
   - 색상: emerald-green-teal 그라데이션
   - 설명: "청소, 안전점검 등 학교생활 전반의 책임 활동"
   
3. **공부 레이드** (Study Raid)
   - 아이콘: `Users`
   - 색상: pink-purple-violet 그라데이션
   - 설명: "친구들과 함께하는 협력 학습 프로젝트"

**카드 구성**:
- 헤더: 아이콘 + 제목 + 설명 + 화살표
- 내용: 진행중 수 / 완료 수
- 하단: "시작하기" 버튼
- 호버 효과: scale(1.05), 그림자 증가

#### 4. 오늘의 목표
**위치**: 퀘스트 메뉴 아래

**구성**: 3개의 목표 카드
- 수업 퀘스트 2개 완료하기 (cyan)
- 학교 퀘스트 1개 참여하기 (emerald)
- 레이드 1개 진행하기 (pink)

---

### 수업 퀘스트 뷰 (`ClassQuestView.tsx`)

**배경**: cyan-blue-indigo-purple 그라데이션

**레이아웃**: 2열 그리드

#### 왼쪽: 진행 중인 퀘스트
- 과목 아이콘 (수학: Calculator, 영어: BookOpen, 화학: Brain)
- 퀘스트 제목 + 과목명
- 난이도 배지 (easy: green, medium: yellow, hard: red)
- 포인트 배지
- 설명
- 제한 시간
- "시작하기" 버튼 (cyan-blue 그라데이션)

#### 오른쪽: 완료된 퀘스트
- 초록색 배경 (`bg-green-900/20`)
- 초록색 테두리
- 획득 경험치 표시 (`+{points} EXP`)

#### 하단: 퀘스트 상세 정보 (선택 시)
- 문제 내용
- 선택지 (4지선다)
- 힌트 (파란색 박스)

**타입 정의**:
```typescript
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
```

---

### 학교 퀘스트 뷰 (`SchoolQuestView.tsx`)

**배경**: emerald-green-teal-cyan 그라데이션

**레이아웃**: 2열 그리드

#### 퀘스트 카테고리
```typescript
type SchoolQuestCategory = 
  | 'cleaning'     // 🧹 청소 (파란색)
  | 'safety'       // 🛡️ 안전 (빨간색)
  | 'community'    // 🤝 공동체 (초록색)
  | 'environment'  // 🌱 환경 (에메랄드색)
```

#### 왼쪽: 진행 중인 퀘스트
- 카테고리 이모지
- 퀘스트 제목
- 카테고리 배지
- 마감일 표시 ("오늘까지", "내일까지", "N일 후")
- 포인트
- 인증 필요 여부 (Camera 아이콘)
- "시작하기" 버튼 (emerald-green 그라데이션)

#### 퀘스트 상세 정보
- 수행 방법 (번호 매긴 리스트)
- 마감 기한 + 보상 (오렌지색 박스)
- 인증 필요 안내 (파란색 박스)

**타입 정의**:
```typescript
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
```

---

### 공부 레이드 뷰 (`StudyRaidView.tsx`)

**배경**: pink-purple-violet-indigo 그라데이션

**레이아웃**: 2열 그리드

#### 왼쪽: 참여 중인 레이드 목록
- 과목 아이콘
- 레이드 제목 + 과목
- 난이도 배지
- 설명
- **진행률 바** (Progress 컴포넌트)
- 참여자 수 (N/MAX명)
- 마감일
- **팀원 아바타** (오버랩 스타일)

#### 오른쪽: 레이드 상세 정보
- 담당 선생님
- 마감일
- **과제 목록**:
  - Individual (개인): Sword 아이콘 (빨간색)
  - Collaborative (협업): Shield 아이콘 (파란색)
  - 완료 여부 배지
  - 완료자 명단
- **보상 정보** (황금색 그라데이션):
  - 경험치
  - 아이템 목록 (배지, 인증서 등)

**타입 정의**:
```typescript
interface StudyRaid {
  id: string;
  title: string;
  subject: string;
  description: string;
  assignedBy: string;
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

interface Assignment {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'collaborative';
  isCompleted: boolean;
  completedBy?: string[];
}
```

---

## 🎭 애니메이션 시스템

### Motion (Framer Motion) 사용

#### 페이지 진입 애니메이션
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
>
```

#### 카드 호버 애니메이션
```typescript
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
```

#### 파티클 애니메이션
```typescript
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

### CSS 커스텀 애니메이션 (`globals.css`)

```css
/* 레벨업 애니메이션 */
@keyframes levelUp {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}

/* 퀘스트 완료 애니메이션 */
@keyframes questComplete {
  0% { transform: rotateY(0deg) scale(1); }
  50% { transform: rotateY(180deg) scale(1.1); }
  100% { transform: rotateY(360deg) scale(1); }
}

/* 떠다니는 파티클 */
@keyframes floatingParticles {
  0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
  50% { opacity: 0.5; }
  100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
}

/* 반짝임 효과 */
@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

/* 배지 글로우 */
@keyframes badgeGlow {
  0%, 100% { box-shadow: 0 0 5px rgba(168, 85, 247, 0.5); }
  50% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.8), 0 0 30px rgba(168, 85, 247, 0.6); }
}
```

---

## 🌐 랜딩 페이지 특징

### 비행기 응원 메시지 시스템
- 우상단에서 날아오는 비행기 아이콘
- 클릭하면 응원 메시지 표시
- 15-25초 간격으로 랜덤 출현
- 사용자가 메시지 입력 가능 (공유 시스템)

### YouTube 음악 플레이어
- 감성적인 배경음악 재생
- 플레이어 컨트롤 UI

### 날씨 정보
- 실시간 날씨 및 온도 표시
- 아이콘: Sun, Cloud, CloudRain, CloudSnow

### 4가지 서비스 카드
1. **선생님 워크스페이스** (파란색)
2. **School Quest** (보라색)
3. **학교 생활** (초록색)
4. **생활기록부** (남색)

### 오늘의 명언
- Noto Serif KR 서체
- 교육 관련 명언 표시

---

## 📦 주요 의존성 라이브러리

```json
{
  "dependencies": {
    "react": "^18.x",
    "motion/react": "latest",
    "lucide-react": "latest",
    "recharts": "latest",
    "react-slick": "latest"
  }
}
```

### Lucide React 아이콘 사용 예시
```typescript
import { 
  BookOpen,      // 수업 퀘스트
  School,        // 학교 퀘스트
  Users,         // 공부 레이드
  Trophy,        // 업적
  Star,          // 별
  Crown,         // 왕관/보상
  Target,        // 목표
  Clock,         // 시간
  ArrowLeft,     // 뒤로가기
  Bell,          // 알림
  Settings,      // 설정
  // ... 등
} from 'lucide-react';
```

---

## 🎯 핵심 디자인 패턴

### 1. 무지개 그라데이션 패턴
```css
/* 6가지 색상 조합 */
from-cyan-600 via-blue-600 to-indigo-700    /* 파랑 계열 */
from-emerald-600 via-green-600 to-teal-700  /* 초록 계열 */
from-pink-600 via-purple-600 to-violet-700  /* 분홍 계열 */
from-rose-600 via-purple-600 to-blue-600    /* 혼합 */
```

### 2. 글래스모피즘 (Glassmorphism)
```css
bg-black/40                    /* 반투명 배경 */
border border-white/20         /* 은은한 테두리 */
backdrop-blur-sm              /* 블러 효과 */
```

### 3. 네온 그림자 효과
```css
shadow-lg shadow-cyan-500/30
shadow-2xl shadow-purple-500/20
shadow-lg shadow-emerald-500/20
```

### 4. 카드 호버 트랜지션
```css
hover:scale-105
hover:border-white/60
hover:shadow-2xl
transition-all duration-300
```

---

## 🔧 개발 환경 설정

### Tailwind CSS v4 설정

**globals.css** 최상단:
```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&family=Noto+Serif+KR:wght@300;400;500;600;700&display=swap');

@custom-variant dark (&:is(.dark *));

:root {
  /* CSS 변수 정의 */
}

@theme inline {
  /* Tailwind 테마 토큰 */
}

@layer base {
  /* 기본 스타일 */
}
```

### TypeScript 설정
- strict 모드 활성화
- 타입 정의를 `/components/types/` 폴더에 분리
- 인터페이스와 타입 재사용 극대화

---

## 📱 반응형 디자인

### 브레이크포인트
```typescript
// 그리드 레이아웃
grid-cols-1              // 모바일
md:grid-cols-2           // 태블릿
md:grid-cols-3           // 데스크톱
lg:grid-cols-2           // 대형 화면 (상세 뷰)
```

### 반응형 패딩/마진
```typescript
p-4 md:p-6               // 패딩
gap-4 md:gap-6           // 간격
```

---

## 🚀 향후 확장 가능성

### 데이터베이스 연동
- 현재는 목업 데이터 사용
- Supabase 등 백엔드 연동 가능
- 실시간 퀘스트 업데이트

### 추가 기능
- 실시간 알림 시스템
- 학생 간 채팅
- 리더보드/랭킹 시스템
- 길드 시스템 (팀 기반 활동)
- 아이템 샵
- 일일 룰렛 시스템

### AI 통합
- AI 학습 어시스턴트
- 자동 피드백 시스템
- 생활기록부 자동 생성

---

## 📝 컴포넌트 재사용 가이드

### UI 컴포넌트 (`/components/ui/`)
모든 UI 컴포넌트는 재사용 가능하도록 설계:
- `Button`: 다양한 variant (default, outline, ghost)
- `Card`: CardHeader, CardTitle, CardContent 조합
- `Badge`: 색상 커스터마이징 가능
- `Progress`: 진행률 표시
- `Avatar`: 이미지 + Fallback

### 타입 재사용
```typescript
import type { 
  StudentProfile, 
  ClassQuest, 
  SchoolQuest, 
  StudyRaid,
  QuestCategory,
  Achievement 
} from './types/questTypes';
```

---

## 🎨 색상 시스템 요약

### 퀘스트별 색상 팔레트

#### 수업 퀘스트 (Class Quest)
```
Primary: cyan-500, blue-500, indigo-600
Accent: cyan-300, blue-300
Background: from-cyan-900 via-blue-800 to-purple-900
```

#### 학교 퀘스트 (School Quest)
```
Primary: emerald-500, green-500, teal-600
Accent: emerald-300, green-300
Background: from-emerald-900 via-green-800 to-cyan-900
```

#### 공부 레이드 (Study Raid)
```
Primary: pink-500, purple-500, violet-600
Accent: pink-300, purple-300
Background: from-pink-900 via-purple-800 to-indigo-900
```

#### 보상/업적
```
Primary: yellow-500, orange-500
Accent: yellow-300, orange-300
Background: from-yellow-600 via-orange-600
```

---

## 🔑 핵심 코드 스니펫

### 그라데이션 카드 생성
```typescript
<div className="bg-gradient-to-br from-cyan-600/40 to-blue-600/30 border border-cyan-400/50 rounded-lg p-4 shadow-lg shadow-cyan-500/20">
  {/* 내용 */}
</div>
```

### 파티클 배경 효과
```typescript
<div className="absolute inset-0 pointer-events-none">
  {Array.from({ length: 25 }, (_, i) => {
    const colors = ['bg-pink-400/40', 'bg-purple-400/40', 'bg-blue-400/40', 'bg-cyan-400/40'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return (
      <motion.div
        key={i}
        className={`absolute w-1 h-1 ${randomColor} rounded-full`}
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
        style={{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%'
        }}
      />
    );
  })}
</div>
```

### 네비게이션 바 (상단 고정)
```typescript
<nav className="bg-black/30 border-b border-white/10 backdrop-blur-sm sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex items-center justify-between h-16">
      {/* 내용 */}
    </div>
  </div>
</nav>
```

---

## 📚 참고 자료

### 주요 파일 경로
- **메인 앱**: `/App.tsx`
- **School Quest**: `/components/SchoolQuest.tsx`
- **타입 정의**: `/components/types/questTypes.ts`
- **글로벌 스타일**: `/styles/globals.css`
- **퀘스트 뷰**:
  - `/components/quest/ClassQuestView.tsx`
  - `/components/quest/SchoolQuestView.tsx`
  - `/components/quest/StudyRaidView.tsx`

### 컴포넌트 계층 구조
```
App
└── LandingPage
    ├── MusicPlayer
    └── 4개 서비스 카드
        ├── TeacherDashboard
        ├── SchoolQuest
        │   ├── StudentProfileCard
        │   ├── QuestMenuCard (x3)
        │   ├── ClassQuestView
        │   ├── SchoolQuestView
        │   └── StudyRaidView
        ├── SchoolLife
        └── StudentRecord
```

---

## 🎓 프로젝트 철학

이 프로젝트는 **게임화(Gamification)**를 통해 학생들의 학습 동기를 높이고, 교사들의 학급 관리 업무를 효율적으로 지원하는 것을 목표로 합니다.

### 핵심 가치
1. **동기부여**: 퀘스트, 경험치, 레벨, 업적 시스템
2. **협업**: 공부 레이드를 통한 팀 학습
3. **책임감**: 학교 퀘스트를 통한 생활 습관 형성
4. **성취감**: 시각적 피드백과 보상 시스템

### 사용자 경험 (UX) 원칙
- **직관적**: 게임에 익숙한 Z세대를 위한 UI/UX
- **몰입감**: 화려한 비주얼과 부드러운 애니메이션
- **즉각적 피드백**: 실시간 진행률 및 보상 표시
- **개인화**: 학생별 프로필 및 통계

---

## ✅ 체크리스트 (다른 환경에서 재현)

### 필수 설치
- [ ] Node.js 및 npm/yarn
- [ ] React 18+
- [ ] TypeScript
- [ ] Tailwind CSS v4

### 필수 라이브러리
- [ ] motion/react (Framer Motion)
- [ ] lucide-react (아이콘)
- [ ] recharts (차트, 옵션)

### 폰트 설정
- [ ] Google Fonts에서 Noto Sans KR, Noto Serif KR 임포트
- [ ] globals.css에 @import 추가

### 파일 구조
- [ ] `/components` 폴더 생성
- [ ] `/components/quest` 하위 폴더 생성
- [ ] `/components/types` 하위 폴더 생성
- [ ] `/components/ui` UI 컴포넌트 생성
- [ ] `/styles/globals.css` 전역 스타일 설정

### 타입 정의
- [ ] `questTypes.ts` 생성 및 모든 인터페이스 정의
- [ ] 타입 export/import 확인

### 컴포넌트 구현
- [ ] App.tsx (라우팅)
- [ ] LandingPage.tsx
- [ ] SchoolQuest.tsx
- [ ] StudentProfileCard.tsx
- [ ] QuestMenuCard.tsx
- [ ] ClassQuestView.tsx
- [ ] SchoolQuestView.tsx
- [ ] StudyRaidView.tsx

### 스타일링
- [ ] Tailwind 설정 확인
- [ ] 커스텀 애니메이션 추가
- [ ] 색상 팔레트 적용
- [ ] 반응형 디자인 테스트

---

## 🎉 마무리

이 문서는 "오늘의 수업 - School Quest" 프로젝트의 모든 핵심 요소를 담고 있습니다. 
다른 개발 환경에서도 동일한 경험을 재현할 수 있도록 상세하게 작성되었습니다.

**행복한 코딩 되세요! 🚀✨**

---

*Last Updated: 2024*
*Version: 1.0.0*
