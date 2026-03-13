import { useState } from 'react';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, School, Users, Settings, Bell } from 'lucide-react';

// 컴포넌트 임포트
import { StudentProfileCard } from './quest/StudentProfileCard';
import { QuestMenuCard } from './quest/QuestMenuCard';
import { ClassQuestView } from './quest/ClassQuestView';
import { SchoolQuestView } from './quest/SchoolQuestView';
import { StudyRaidView } from './quest/StudyRaidView';

// 타입 임포트
import type { StudentProfile, QuestCategory } from './types/questTypes';

interface SchoolQuestProps {
  onBack: () => void;
}

// 목업 학생 프로필 데이터
const mockStudentProfile: StudentProfile = {
  id: 'student1',
  name: '김민수',
  studentId: '20241015',
  class: '3학년 2반',
  level: 15,
  experience: 2340,
  maxExperience: 3000,
  avatar: 'https://images.unsplash.com/photo-1638012107344-3ed0f994d8d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwYW5pbWUlMjBjaGFyYWN0ZXIlMjBhdmF0YXJ8ZW58MXx8fHwxNzU5MzE5NjA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  totalQuests: 50,
  completedQuests: 38,
  achievements: [
    {
      id: 'ach1',
      title: '수학 마스터',
      description: '수학 퀘스트 10개 완료',
      icon: '🏆',
      earnedAt: new Date(),
      category: 'class'
    },
    {
      id: 'ach2',
      title: '청소 달인',
      description: '청소 퀘스트 완벽 수행',
      icon: '🧹',
      earnedAt: new Date(),
      category: 'school'
    }
  ],
  stats: {
    classQuests: 25,
    schoolQuests: 8,
    studyRaids: 5
  }
};

type ViewType = 'main' | 'class-quest' | 'school-quest' | 'study-raid';

export function SchoolQuest({ onBack }: SchoolQuestProps) {
  const [currentView, setCurrentView] = useState<ViewType>('main');
  const [studentProfile] = useState<StudentProfile>(mockStudentProfile);

  // 뷰 전환 함수들
  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  // 개별 뷰 렌더링
  if (currentView === 'class-quest') {
    return <ClassQuestView onBack={handleBackToMain} />;
  }

  if (currentView === 'school-quest') {
    return <SchoolQuestView onBack={handleBackToMain} />;
  }

  if (currentView === 'study-raid') {
    return <StudyRaidView onBack={handleBackToMain} />;
  }

  // 메인 뷰 렌더링
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 via-blue-900 to-cyan-900 relative overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 via-blue-500/10 to-cyan-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(236,72,153,0.1)_1px,transparent_0)] bg-[length:40px_40px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(59,130,246,0.1)_1px,transparent_0)] bg-[length:60px_60px]"></div>
      </div>

      {/* 파티클 효과 */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 25 }, (_, i) => {
          const colors = ['bg-pink-400/40', 'bg-purple-400/40', 'bg-blue-400/40', 'bg-cyan-400/40', 'bg-yellow-400/40', 'bg-green-400/40'];
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

      {/* 상단 네비게이션 */}
      <nav className="bg-black/30 border-b border-white/10 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Logo size="sm" />
              <div>
                <h1 style={{ fontFamily: "'Noto Serif KR', serif" }} className="text-white">
                  School Quest
                </h1>
                <p className="text-sm text-gray-300">학습과 성장의 여정</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                <Bell className="w-4 h-4" />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                <Settings className="w-4 h-4" />
              </Button>

              <Button size="sm" variant="outline" onClick={onBack} className="border-white/20 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                홈으로
              </Button>

              <div className="flex items-center gap-2 pl-4 border-l border-white/20">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={studentProfile.avatar} />
                  <AvatarFallback className="bg-purple-500 text-white">
                    {studentProfile.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm text-white">
                  <div>{studentProfile.name}</div>
                  <div className="text-gray-300">Lv.{studentProfile.level}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* 학생 프로필 카드 */}
        <StudentProfileCard profile={studentProfile} />

        {/* 퀘스트 메뉴 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">퀘스트 선택</h2>
            <p className="text-gray-300">원하는 활동을 선택하여 시작하세요</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 수업 퀘스트 */}
            <QuestMenuCard
              category="class"
              title="수업 퀘스트"
              description="실시간 수업 중 문제 해결과 학습 활동"
              icon={<BookOpen className="w-8 h-8 text-white" />}
              stats={{
                active: 3,
                completed: studentProfile.stats.classQuests
              }}
              gradient="bg-gradient-to-br from-cyan-600/80 via-blue-600/70 to-indigo-700/60"
              onClick={() => handleViewChange('class-quest')}
            />

            {/* 학교 퀘스트 */}
            <QuestMenuCard
              category="school"
              title="학교 퀘스트"
              description="청소, 안전점검 등 학교생활 전반의 책임 활동"
              icon={<School className="w-8 h-8 text-white" />}
              stats={{
                active: 2,
                completed: studentProfile.stats.schoolQuests
              }}
              gradient="bg-gradient-to-br from-emerald-600/80 via-green-600/70 to-teal-700/60"
              onClick={() => handleViewChange('school-quest')}
            />

            {/* 공부 레이드 */}
            <QuestMenuCard
              category="study-raid"
              title="공부 레이드"
              description="친구들과 함께하는 협력 학습 프로젝트"
              icon={<Users className="w-8 h-8 text-white" />}
              stats={{
                active: 1,
                completed: studentProfile.stats.studyRaids
              }}
              gradient="bg-gradient-to-br from-pink-600/80 via-purple-600/70 to-violet-700/60"
              onClick={() => handleViewChange('study-raid')}
            />
          </div>
        </motion.div>

        {/* 최근 활동 요약 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-black/40 border border-white/20 backdrop-blur-sm rounded-lg p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">오늘의 목표</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-cyan-600/40 to-blue-600/30 border border-cyan-400/50 rounded-lg p-4 text-center shadow-lg shadow-cyan-500/20">
              <div className="text-2xl font-bold text-cyan-300 mb-1">2</div>
              <div className="text-sm text-gray-200">수업 퀘스트 완료하기</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-600/40 to-green-600/30 border border-emerald-400/50 rounded-lg p-4 text-center shadow-lg shadow-emerald-500/20">
              <div className="text-2xl font-bold text-emerald-300 mb-1">1</div>
              <div className="text-sm text-gray-200">학교 퀘스트 참여하기</div>
            </div>
            <div className="bg-gradient-to-br from-pink-600/40 to-purple-600/30 border border-pink-400/50 rounded-lg p-4 text-center shadow-lg shadow-pink-500/20">
              <div className="text-2xl font-bold text-pink-300 mb-1">1</div>
              <div className="text-sm text-gray-200">레이드 진행하기</div>
            </div>
          </div>
        </motion.div>

        {/* 추가 정보 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-400 text-sm">
            매일 퀘스트를 완료하여 경험치를 쌓고 새로운 업적을 달성해보세요! 🎯
          </p>
        </motion.div>
      </div>
    </div>
  );
}