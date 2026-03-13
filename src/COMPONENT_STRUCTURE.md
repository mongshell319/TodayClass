# School Quest 컴포넌트 구조도 📊

## 🏛️ 전체 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                         App.tsx                              │
│                  (메인 라우팅 컴포넌트)                        │
│                                                               │
│  State: currentView                                          │
│  Views: home | dashboard | school-quest |                   │
│         school-life | student-record                         │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────────┐    ┌──────────────┐
│ LandingPage  │    │ TeacherDashboard │    │ SchoolLife   │
└──────────────┘    └──────────────────┘    └──────────────┘
        │                                           │
        │                                           ▼
        │                                   ┌──────────────┐
        │                                   │StudentRecord │
        │                                   └──────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│                      SchoolQuest.tsx                         │
│                   (퀘스트 시스템 메인)                         │
│                                                               │
│  State: currentView                                          │
│  Views: main | class-quest | school-quest | study-raid      │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────────┐    ┌──────────────┐
│ClassQuestView│    │ SchoolQuestView  │    │StudyRaidView │
└──────────────┘    └──────────────────┘    └──────────────┘
```

## 🎯 School Quest 메인 화면 구조

```
SchoolQuest.tsx
├── Navigation Bar
│   ├── Logo
│   ├── Title & Subtitle
│   └── Right Menu
│       ├── Bell Icon (알림)
│       ├── Settings Icon
│       ├── "홈으로" Button
│       └── User Avatar + Level
│
├── StudentProfileCard
│   ├── Avatar Section
│   │   ├── Avatar (132x132px)
│   │   └── Level Badge
│   │
│   ├── Profile Info
│   │   ├── Name (text-3xl)
│   │   ├── Class Badge
│   │   ├── Student ID Badge
│   │   ├── Experience Progress Bar
│   │   └── Stats Grid (3 columns)
│   │       ├── Completed Quests
│   │       ├── Completion Rate
│   │       └── Achievements Count
│   │
│   ├── Category Stats (3 columns)
│   │   ├── Class Quests (cyan gradient)
│   │   ├── School Quests (emerald gradient)
│   │   └── Study Raids (pink gradient)
│   │
│   └── Recent Achievements (horizontal scroll)
│       └── Achievement Cards (yellow gradient)
│
├── Quest Menu Section
│   ├── Section Header
│   │   ├── Title: "퀘스트 선택"
│   │   └── Description
│   │
│   └── Quest Cards Grid (3 columns)
│       ├── QuestMenuCard (Class Quest)
│       │   ├── Icon: BookOpen
│       │   ├── Title & Description
│       │   ├── Stats: Active / Completed
│       │   └── "시작하기" Button
│       │
│       ├── QuestMenuCard (School Quest)
│       │   ├── Icon: School
│       │   ├── Title & Description
│       │   ├── Stats: Active / Completed
│       │   └── "시작하기" Button
│       │
│       └── QuestMenuCard (Study Raid)
│           ├── Icon: Users
│           ├── Title & Description
│           ├── Stats: Active / Completed
│           └── "시작하기" Button
│
└── Daily Goals Section
    └── Goal Cards Grid (3 columns)
        ├── Class Quest Goal (cyan)
        ├── School Quest Goal (emerald)
        └── Study Raid Goal (pink)
```

## 📚 Class Quest View 구조

```
ClassQuestView.tsx
├── Header
│   ├── "뒤로가기" Button
│   ├── Title: "수업 퀘스트"
│   └── Subtitle
│
└── Main Grid (2 columns)
    ├── Left Column: Active Quests
    │   ├── Card Header: "진행 중인 퀘스트 (N)"
    │   │
    │   └── Quest List
    │       └── Quest Item
    │           ├── Subject Icon
    │           ├── Title + Subject
    │           ├── Difficulty Badge
    │           ├── Points Badge
    │           ├── Description
    │           ├── Time Limit
    │           └── "시작하기" Button
    │
    └── Right Column: Completed Quests
        ├── Card Header: "완료된 퀘스트 (N)"
        │
        └── Quest List
            └── Quest Item (green theme)
                ├── Subject Icon
                ├── Title + Subject
                ├── Description
                └── EXP Badge

└── Quest Detail Modal (if selected)
    ├── Header
    │   ├── Subject Icon + Title
    │   └── "닫기" Button
    │
    └── Content
        ├── Description
        ├── Question Section
        │   ├── Question Text
        │   └── Options (A, B, C, D)
        │
        └── Hints Section (blue box)
            └── Hint List
```

## 🏫 School Quest View 구조

```
SchoolQuestView.tsx
├── Header
│   ├── "뒤로가기" Button
│   ├── Title: "학교 퀘스트"
│   └── Subtitle
│
└── Main Grid (2 columns)
    ├── Left Column: Active Quests
    │   ├── Card Header: "진행 중인 퀘스트 (N)"
    │   │
    │   └── Quest List
    │       └── Quest Item
    │           ├── Category Emoji
    │           ├── Title
    │           ├── Category Badge
    │           ├── Deadline
    │           ├── Points Badge
    │           ├── Description
    │           ├── Verification Required Icon
    │           └── "시작하기" Button
    │
    └── Right Column: Completed Quests
        ├── Card Header: "완료된 퀘스트 (N)"
        │
        └── Quest List (green theme)

└── Quest Detail Modal (if selected)
    ├── Header
    │   ├── Emoji + Title
    │   └── "닫기" Button
    │
    └── Content
        ├── Description
        ├── Instructions Section
        │   └── Numbered List
        │
        ├── Deadline & Rewards (orange box)
        │   ├── Deadline
        │   └── Points
        │
        └── Verification Notice (blue box)
            └── Camera Icon + Description
```

## 👥 Study Raid View 구조

```
StudyRaidView.tsx
├── Header
│   ├── "뒤로가기" Button
│   ├── Title: "공부 레이드"
│   └── Subtitle
│
└── Main Grid (2 columns)
    ├── Left Column: Active Raids List
    │   ├── Section Title: "참여 중인 레이드"
    │   │
    │   └── Raid Cards
    │       └── Raid Card
    │           ├── Header
    │           │   ├── Subject Icon + Title
    │           │   └── Difficulty Badge
    │           │
    │           └── Content
    │               ├── Description
    │               ├── Progress Bar
    │               ├── Participants Info
    │               ├── Deadline
    │               └── Team Member Avatars
    │
    └── Right Column: Raid Detail
        ├── Selected Raid Info
        │   ├── Header
        │   │   ├── Title
        │   │   └── "닫기" Button
        │   │
        │   ├── Description
        │   │
        │   ├── Info Grid (2 columns)
        │   │   ├── Teacher Name
        │   │   └── Deadline
        │   │
        │   ├── Assignments Section
        │   │   └── Assignment List
        │   │       └── Assignment Item
        │   │           ├── Type Icon (Sword/Shield)
        │   │           ├── Title
        │   │           ├── Status Badge
        │   │           ├── Description
        │   │           └── Completed By List
        │   │
        │   └── Rewards Section (golden box)
        │       ├── Crown Icon
        │       ├── Experience Points
        │       └── Item List
        │
        └── Empty State (if no selection)
            ├── Users Icon
            └── Message
```

## 🧩 재사용 컴포넌트 라이브러리

```
/components/ui/
├── button.tsx
│   └── Variants: default | outline | ghost
│
├── card.tsx
│   ├── Card (wrapper)
│   ├── CardHeader
│   ├── CardTitle
│   └── CardContent
│
├── badge.tsx
│   └── Color variants via className
│
├── progress.tsx
│   └── Progress bar with value prop
│
├── avatar.tsx
│   ├── Avatar (wrapper)
│   ├── AvatarImage
│   └── AvatarFallback
│
└── ... (기타 30+ UI 컴포넌트)
```

## 📊 데이터 흐름도

```
                    ┌──────────────┐
                    │  Mock Data   │
                    │  (목업 데이터) │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   useState   │
                    │ (컴포넌트 상태) │
                    └──────┬───────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │ Active   │    │Completed │    │ Selected │
    │ Quests   │    │ Quests   │    │  Quest   │
    └────┬─────┘    └────┬─────┘    └────┬─────┘
         │               │                │
         └───────────────┴────────────────┘
                         │
                         ▼
                  ┌──────────────┐
                  │  UI Render   │
                  │  (화면 표시)  │
                  └──────────────┘
```

## 🎨 스타일 계층 구조

```
globals.css
├── Font Imports (Google Fonts)
│   ├── Noto Sans KR
│   └── Noto Serif KR
│
├── CSS Variables (:root)
│   ├── Colors
│   ├── Spacing
│   ├── Radius
│   └── Fonts
│
├── Tailwind Theme (@theme inline)
│   └── Custom tokens mapping
│
├── Base Layer (@layer base)
│   ├── Typography defaults
│   └── Global resets
│
└── Custom Animations (@keyframes)
    ├── levelUp
    ├── questComplete
    ├── floatingParticles
    ├── shimmer
    ├── badgeGlow
    └── ...

Component Styles
├── Tailwind Utility Classes
├── Conditional Classes (className)
└── Inline Styles (style prop)
```

## 🔄 뷰 전환 흐름도

```
                  ┌─────────────┐
                  │ LandingPage │
                  └──────┬──────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌─────────┐   ┌─────────────┐  ┌───────────┐
    │Dashboard│   │ SchoolQuest │  │SchoolLife │
    └─────────┘   └──────┬──────┘  └───────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌─────────┐   ┌─────────────┐  ┌───────────┐
    │  Class  │   │   School    │  │   Study   │
    │  Quest  │   │   Quest     │  │   Raid    │
    └─────────┘   └─────────────┘  └───────────┘
         │               │               │
         └───────────────┼───────────────┘
                         │
                         ▼
                  ┌─────────────┐
                  │   뒤로가기    │
                  │  (onBack)    │
                  └─────────────┘
```

## 🎭 애니메이션 레이어

```
┌─────────────────────────────────────────────────┐
│              Visual Layers                      │
├─────────────────────────────────────────────────┤
│ Layer 5: Modals & Overlays (z-50)              │
│   └── Quest Detail Modal                       │
├─────────────────────────────────────────────────┤
│ Layer 4: Navigation (z-50, sticky)             │
│   └── Top Navigation Bar                       │
├─────────────────────────────────────────────────┤
│ Layer 3: Motion Animations (z-10)              │
│   ├── Page transitions                         │
│   ├── Card hover effects                       │
│   └── Button interactions                      │
├─────────────────────────────────────────────────┤
│ Layer 2: Content (z-10, relative)              │
│   ├── Profile Cards                            │
│   ├── Quest Cards                              │
│   └── Detail Views                             │
├─────────────────────────────────────────────────┤
│ Layer 1: Particles (pointer-events-none)       │
│   └── Floating particles (25개)                │
├─────────────────────────────────────────────────┤
│ Layer 0: Background (absolute inset-0)         │
│   ├── Gradient overlay                         │
│   ├── Pattern overlay                          │
│   └── Base image/color                         │
└─────────────────────────────────────────────────┘
```

## 📱 반응형 브레이크포인트 전략

```
Mobile First Approach

    xs (< 640px)           sm (640px+)        md (768px+)         lg (1024px+)
┌──────────────┐      ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│              │      │              │   │              │   │              │
│  1 Column    │  →   │  1 Column    │ → │  2 Columns   │ → │  3 Columns   │
│              │      │              │   │              │   │              │
│ ┌──────────┐ │      │ ┌──────────┐ │   │ ┌────┐ ┌────┐│   │┌───┐┌───┐┌───┐
│ │   Card   │ │      │ │   Card   │ │   │ │Card│ │Card││   ││C1 ││C2 ││C3 │
│ └──────────┘ │      │ └──────────┘ │   │ └────┘ └────┘│   │└───┘└───┘└───┘
│              │      │              │   │              │   │              │
│ ┌──────────┐ │      │ ┌──────────┐ │   │ ┌────┐ ┌────┐│   │              │
│ │   Card   │ │      │ │   Card   │ │   │ │Card│ │Card││   │              │
│ └──────────┘ │      │ └──────────┘ │   │ └────┘ └────┘│   │              │
│              │      │              │   │              │   │              │
└──────────────┘      └──────────────┘   └──────────────┘   └──────────────┘

     p-4                  p-4                 p-6                 p-8
   gap-4                gap-4               gap-6               gap-8
```

## 🎪 이벤트 흐름도

```
User Action
    │
    ▼
┌─────────────────┐
│  onClick Event  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  setState       │
│  (뷰 변경)       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Conditional    │
│  Rendering      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Motion Animate │
│  (페이지 전환)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  New View       │
│  Displayed      │
└─────────────────┘
```

---

**이 구조도를 참고하여 전체 시스템의 흐름을 이해하세요!** 🚀
