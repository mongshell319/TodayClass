import { motion } from 'motion/react';
import { ChevronRight, Flame } from 'lucide-react';
import type { QuestCategory } from '../types/questTypes';

type ColorScheme = 'blue' | 'green' | 'purple';

interface QuestMenuCardProps {
  category: QuestCategory;
  title: string;
  description: string;
  emoji: string;
  icon: React.ReactNode;
  stats: {
    active: number;
    completed: number;
  };
  colorScheme: ColorScheme;
  onClick: () => void;
}

const colorMap: Record<ColorScheme, {
  bg: string;
  border: string;
  shadow: string;
  iconBg: string;
  iconColor: string;
  activeBg: string;
  activeText: string;
  completedBg: string;
  completedText: string;
  btn: string;
  badge: string;
  badgeText: string;
}> = {
  blue: {
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    shadow: 'shadow-sky-100',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-500',
    activeBg: 'bg-sky-100',
    activeText: 'text-sky-600',
    completedBg: 'bg-white',
    completedText: 'text-sky-500',
    btn: 'bg-sky-400 hover:bg-sky-500',
    badge: 'bg-sky-200',
    badgeText: 'text-sky-700',
  },
  green: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    shadow: 'shadow-emerald-100',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-500',
    activeBg: 'bg-emerald-100',
    activeText: 'text-emerald-600',
    completedBg: 'bg-white',
    completedText: 'text-emerald-500',
    btn: 'bg-emerald-400 hover:bg-emerald-500',
    badge: 'bg-emerald-200',
    badgeText: 'text-emerald-700',
  },
  purple: {
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    shadow: 'shadow-violet-100',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-500',
    activeBg: 'bg-violet-100',
    activeText: 'text-violet-600',
    completedBg: 'bg-white',
    completedText: 'text-violet-500',
    btn: 'bg-violet-400 hover:bg-violet-500',
    badge: 'bg-violet-200',
    badgeText: 'text-violet-700',
  },
};

export function QuestMenuCard({
  title,
  description,
  emoji,
  icon,
  stats,
  colorScheme,
  onClick
}: QuestMenuCardProps) {
  const c = colorMap[colorScheme];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={`${c.bg} border-2 ${c.border} rounded-3xl p-5 shadow-lg ${c.shadow} cursor-pointer hover:shadow-xl transition-all duration-300`}
        onClick={onClick}
      >
        {/* 아이콘 + 제목 */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 ${c.iconBg} rounded-2xl flex items-center justify-center shadow-sm`}>
              <span className={c.iconColor}>{icon}</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-base">{emoji}</span>
                <h3 className="font-bold text-gray-700 text-base" style={{ fontFamily: "'Noto Serif KR', serif" }}>{title}</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>{description}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0 mt-1" />
        </div>

        {/* 진행중 뱃지 */}
        {stats.active > 0 && (
          <div className={`flex items-center gap-1.5 ${c.activeBg} rounded-xl px-3 py-1.5 mb-3 w-fit`}>
            <Flame className={`w-3.5 h-3.5 ${c.activeText}`} />
            <span className={`text-xs font-bold ${c.activeText}`}>진행중 {stats.active}개</span>
          </div>
        )}

        {/* 통계 + 버튼 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`${c.completedBg} border-2 ${c.border} rounded-xl px-3 py-1.5 text-center`}>
              <div className={`text-lg font-bold ${c.completedText}`}>{stats.completed}</div>
              <div className="text-xs text-gray-400">완료</div>
            </div>
          </div>

          <button
            className={`${c.btn} text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors shadow-md flex items-center gap-1.5`}
            onClick={(e) => { e.stopPropagation(); onClick(); }}
          >
            시작하기
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
