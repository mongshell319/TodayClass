import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, School, Users, Bell, Settings, Sparkles, Star } from 'lucide-react';

import { StudentProfileCard } from './quest/StudentProfileCard';
import { QuestMenuCard } from './quest/QuestMenuCard';
import { ClassQuestView } from './quest/ClassQuestView';
import { SchoolQuestView } from './quest/SchoolQuestView';
import { StudyRaidView } from './quest/StudyRaidView';

import type { StudentProfile, QuestCategory } from './types/questTypes';

interface SchoolQuestProps {
  onBack: () => void;
}

const mockStudentProfile: StudentProfile = {
  id: 'student1',
  name: '김민수',
  studentId: '20241015',
  class: '3학년 2반',
  level: 15,
  experience: 2340,
  maxExperience: 3000,
  avatar: 'https://images.unsplash.com/photo-1638012107344-3ed0f994d8d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwYW5pbWUlMjBjaGFyYWN0ZXIlMjBhdmF0YXJ8ZW58MXx8fHwxNzU5MzE5NjA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  totalQuests: 50,
  completedQuests: 38,
  achievements: [
    { id: 'ach1', title: '수학 마스터', description: '수학 퀘스트 10개 완료', icon: '🏆', earnedAt: new Date(), category: 'class' },
    { id: 'ach2', title: '청소 달인', description: '청소 퀘스트 완벽 수행', icon: '🧹', earnedAt: new Date(), category: 'school' },
    { id: 'ach3', title: '협력왕', description: '레이드 5회 참여', icon: '🤝', earnedAt: new Date(), category: 'study-raid' },
  ],
  stats: { classQuests: 25, schoolQuests: 8, studyRaids: 5 }
};

type ViewType = 'main' | 'class-quest' | 'school-quest' | 'study-raid';

export function SchoolQuest({ onBack }: SchoolQuestProps) {
  const [currentView, setCurrentView] = useState<ViewType>('main');
  const [studentProfile] = useState<StudentProfile>(mockStudentProfile);

  const handleViewChange = (view: ViewType) => setCurrentView(view);
  const handleBackToMain = () => setCurrentView('main');

  if (currentView === 'class-quest') return <ClassQuestView onBack={handleBackToMain} />;
  if (currentView === 'school-quest') return <SchoolQuestView onBack={handleBackToMain} />;
  if (currentView === 'study-raid') return <StudyRaidView onBack={handleBackToMain} />;

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FFF0F5 0%, #FDF4FF 30%, #F0F4FF 60%, #F0FFF8 100%)' }}
    >
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #C4B5FD, transparent)' }} />
        <div className="absolute top-1/3 -left-20 w-72 h-72 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #FCA5A5, transparent)' }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #6EE7B7, transparent)' }} />
        {[
          'top-20 left-[15%]', 'top-40 right-[20%]', 'top-[45%] left-[8%]',
          'bottom-[30%] right-[10%]', 'bottom-20 left-[35%]'
        ].map((pos, i) => (
          <div key={i} className={`absolute ${pos} text-pink-200 opacity-70 text-2xl`} style={{ animation: `pulse ${2.5 + i * 0.4}s infinite` }}>
            {['✦', '✿', '♡', '✦', '✿'][i]}
          </div>
        ))}
      </div>

      {/* 상단 네비게이션 */}
      <nav className="relative z-20 bg-white/80 backdrop-blur-md border-b-2 border-pink-100 sticky top-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-pink-400 to-violet-400 rounded-xl flex items-center justify-center shadow-md shadow-pink-200">
                <span className="text-white text-sm">🎮</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-700 text-base" style={{ fontFamily: "'Noto Serif KR', serif" }}>School Quest</h1>
                <p className="text-xs text-gray-400" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>학습과 성장의 여정</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-100 flex items-center justify-center transition-colors">
                <Bell className="w-4 h-4 text-pink-400" />
              </button>
              <button className="w-9 h-9 rounded-xl bg-violet-50 hover:bg-violet-100 border border-violet-100 flex items-center justify-center transition-colors">
                <Settings className="w-4 h-4 text-violet-400" />
              </button>
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border-2 border-gray-200 hover:border-pink-200 text-gray-600 hover:text-pink-500 text-sm font-medium transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                홈으로
              </button>

              {/* 학생 아바타 */}
              <div className="flex items-center gap-2 pl-3 border-l-2 border-gray-100 ml-1">
                <div className="w-8 h-8 rounded-xl overflow-hidden border-2 border-pink-200 shadow-sm">
                  <img src={studentProfile.avatar} alt={studentProfile.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-sm">
                  <div className="font-bold text-gray-700">{studentProfile.name}</div>
                  <div className="text-xs text-violet-400">Lv.{studentProfile.level} 🌟</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* 학생 프로필 카드 */}
        <StudentProfileCard profile={studentProfile} />

        {/* 퀘스트 선택 섹션 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="mb-5 flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-100 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-violet-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-700" style={{ fontFamily: "'Noto Serif KR', serif" }}>퀘스트 선택</h2>
              <p className="text-sm text-gray-400" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>원하는 활동을 골라서 시작해보세요 ✨</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <QuestMenuCard
              category="class"
              title="수업 퀘스트"
              description="실시간 수업 중 문제 해결과 학습 활동"
              emoji="📚"
              icon={<BookOpen className="w-7 h-7" />}
              stats={{ active: 3, completed: studentProfile.stats.classQuests }}
              colorScheme="blue"
              onClick={() => handleViewChange('class-quest')}
            />
            <QuestMenuCard
              category="school"
              title="학교 퀘스트"
              description="청소, 안전점검 등 학교생활 전반의 책임 활동"
              emoji="🏫"
              icon={<School className="w-7 h-7" />}
              stats={{ active: 2, completed: studentProfile.stats.schoolQuests }}
              colorScheme="green"
              onClick={() => handleViewChange('school-quest')}
            />
            <QuestMenuCard
              category="study-raid"
              title="공부 레이드"
              description="친구들과 함께하는 협력 학습 프로젝트"
              emoji="🤝"
              icon={<Users className="w-7 h-7" />}
              stats={{ active: 1, completed: studentProfile.stats.studyRaids }}
              colorScheme="purple"
              onClick={() => handleViewChange('study-raid')}
            />
          </div>
        </motion.div>

        {/* 오늘의 목표 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-white rounded-3xl p-6 border-2 border-amber-100 shadow-lg shadow-amber-100"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-700" style={{ fontFamily: "'Noto Serif KR', serif" }}>오늘의 목표</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: '수업 퀘스트 완료하기', count: '2', emoji: '📚', bg: 'bg-sky-50', border: 'border-sky-100', text: 'text-sky-500', done: true },
              { label: '학교 퀘스트 참여하기', count: '1', emoji: '🏫', bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-500', done: false },
              { label: '레이드 진행하기', count: '1', emoji: '🤝', bg: 'bg-violet-50', border: 'border-violet-100', text: 'text-violet-500', done: false },
            ].map((goal, i) => (
              <div key={i} className={`${goal.bg} border-2 ${goal.border} rounded-2xl p-4 flex items-center gap-3`}>
                <div className="text-2xl">{goal.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xl font-bold ${goal.text}`}>{goal.count}개</div>
                  <div className="text-sm text-gray-500 truncate" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>{goal.label}</div>
                </div>
                {goal.done && (
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-5 text-center"
        >
          <p className="text-gray-400 text-sm" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
            매일 퀘스트를 완료하여 경험치를 쌓고 새로운 업적을 달성해보세요! 🎯
          </p>
        </motion.div>
      </div>
    </div>
  );
}
