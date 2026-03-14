import { motion } from 'motion/react';
import { Trophy, Star, Zap, Target, BookOpen, School, Users, Crown } from 'lucide-react';
import type { StudentProfile } from '../types/questTypes';

interface StudentProfileCardProps {
  profile: StudentProfile;
}

export function StudentProfileCard({ profile }: StudentProfileCardProps) {
  const completionRate = Math.round((profile.completedQuests / profile.totalQuests) * 100);
  const xpPercent = Math.round((profile.experience / profile.maxExperience) * 100);

  const rankLabel =
    profile.level >= 20 ? { label: '전설', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', icon: '👑' } :
    profile.level >= 15 ? { label: '영웅', color: 'text-violet-500', bg: 'bg-violet-50', border: 'border-violet-200', icon: '⚡' } :
    profile.level >= 10 ? { label: '용사', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200', icon: '🛡️' } :
    { label: '모험가', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: '🌱' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="bg-white rounded-3xl border-2 border-pink-100 shadow-xl shadow-pink-100 overflow-hidden">
        {/* 상단 배너 */}
        <div
          className="h-24 relative"
          style={{ background: 'linear-gradient(135deg, #FBCFE8, #DDD6FE, #BAE6FD)' }}
        >
          {/* 배너 장식 */}
          <div className="absolute inset-0 overflow-hidden">
            {['top-2 left-[10%]', 'top-4 left-[30%]', 'top-1 right-[25%]', 'top-5 right-[10%]', 'bottom-2 left-[50%]'].map((pos, i) => (
              <span key={i} className={`absolute ${pos} text-white/40 text-lg`}>
                {['✦', '✿', '♡', '✦', '✿'][i]}
              </span>
            ))}
          </div>
          {/* 랭크 뱃지 */}
          <div className={`absolute top-3 right-4 flex items-center gap-1.5 px-3 py-1.5 ${rankLabel.bg} border-2 ${rankLabel.border} rounded-full`}>
            <span>{rankLabel.icon}</span>
            <span className={`text-sm font-bold ${rankLabel.color}`}>{rankLabel.label}</span>
          </div>
        </div>

        <div className="px-6 pb-6">
          {/* 아바타 + 기본 정보 */}
          <div className="flex items-end gap-5 -mt-10 mb-5">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg overflow-hidden">
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
              </div>
              {/* 레벨 뱃지 */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-400 rounded-xl border-2 border-white flex items-center justify-center shadow-md">
                <span className="text-white text-xs font-bold">{profile.level}</span>
              </div>
            </div>

            <div className="flex-1 min-w-0 pt-10">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: "'Noto Serif KR', serif" }}>{profile.name}</h2>
                <Crown className="w-4 h-4 text-amber-400" />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 bg-sky-100 text-sky-600 rounded-full text-xs font-bold border border-sky-200">
                  {profile.class}
                </span>
                <span className="px-2.5 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs border border-gray-200">
                  #{profile.studentId}
                </span>
              </div>
            </div>
          </div>

          {/* XP 바 */}
          <div className="mb-5 bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-bold text-gray-600">레벨 {profile.level}</span>
              </div>
              <span className="text-xs text-gray-400">{profile.experience.toLocaleString()} / {profile.maxExperience.toLocaleString()} XP</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpPercent}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #A78BFA, #EC4899)' }}
              />
            </div>
            <div className="text-right text-xs text-violet-400 mt-1 font-medium">
              다음 레벨까지 {(profile.maxExperience - profile.experience).toLocaleString()} XP
            </div>
          </div>

          {/* 통계 3칸 */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: '완료 퀘스트', value: profile.completedQuests, emoji: '✅', bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-600' },
              { label: '완료율', value: `${completionRate}%`, emoji: '🎯', bg: 'bg-sky-50', border: 'border-sky-100', text: 'text-sky-600' },
              { label: '업적 수', value: profile.achievements.length, emoji: '🏆', bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-600' },
            ].map((stat, i) => (
              <div key={i} className={`${stat.bg} border-2 ${stat.border} rounded-2xl p-3 text-center`}>
                <div className="text-xl mb-0.5">{stat.emoji}</div>
                <div className={`text-xl font-bold ${stat.text}`}>{stat.value}</div>
                <div className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* 카테고리별 퀘스트 */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: '수업 퀘스트', value: profile.stats.classQuests, icon: <BookOpen className="w-4 h-4" />, bg: 'bg-sky-50', border: 'border-sky-100', iconColor: 'text-sky-500' },
              { label: '학교 퀘스트', value: profile.stats.schoolQuests, icon: <School className="w-4 h-4" />, bg: 'bg-emerald-50', border: 'border-emerald-100', iconColor: 'text-emerald-500' },
              { label: '공부 레이드', value: profile.stats.studyRaids, icon: <Users className="w-4 h-4" />, bg: 'bg-violet-50', border: 'border-violet-100', iconColor: 'text-violet-500' },
            ].map((cat, i) => (
              <div key={i} className={`${cat.bg} border-2 ${cat.border} rounded-2xl p-3`}>
                <div className={`flex items-center gap-1.5 mb-1 ${cat.iconColor}`}>
                  {cat.icon}
                  <span className="text-xs font-bold" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>{cat.label}</span>
                </div>
                <div className={`text-2xl font-bold ${cat.iconColor}`}>{cat.value}</div>
                <div className="text-xs text-gray-400">완료</div>
              </div>
            ))}
          </div>

          {/* 최근 업적 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-4 h-4 text-amber-400" />
              <h4 className="font-bold text-gray-600 text-sm" style={{ fontFamily: "'Noto Serif KR', serif" }}>최근 업적</h4>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {profile.achievements.slice(0, 5).map((ach) => (
                <div
                  key={ach.id}
                  className="flex-shrink-0 bg-amber-50 border-2 border-amber-100 rounded-2xl px-4 py-3 min-w-[160px]"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{ach.icon}</span>
                    <span className="text-sm font-bold text-amber-700">{ach.title}</span>
                  </div>
                  <p className="text-xs text-gray-400" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>{ach.description}</p>
                </div>
              ))}
              {profile.achievements.length === 0 && (
                <p className="text-gray-400 text-sm" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>아직 획득한 업적이 없어요 🌱</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
