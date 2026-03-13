import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Trophy, Star, Target, BookOpen, Award, Zap, Clock, Calendar } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  earnedDate?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: string;
}

function AchievementBadge({ achievement }: { achievement: Achievement }) {
  const rarityColors = {
    common: 'from-gray-600 to-gray-700',
    rare: 'from-blue-600 to-blue-700',
    epic: 'from-purple-600 to-purple-700',
    legendary: 'from-yellow-600 to-orange-600'
  };
  
  const rarityBorders = {
    common: 'border-gray-500',
    rare: 'border-blue-500',
    epic: 'border-purple-500',
    legendary: 'border-yellow-500'
  };

  return (
    <Card className={`p-4 ${achievement.earned ? `bg-gradient-to-br ${rarityColors[achievement.rarity]} border-2 ${rarityBorders[achievement.rarity]}` : 'bg-gray-800/30 border-gray-700'} relative overflow-hidden`}>
      {achievement.earned && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
      )}
      
      <div className="relative z-10 text-center">
        <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${achievement.earned ? 'bg-white/20' : 'bg-gray-700'}`}>
          <div className={achievement.earned ? 'text-white' : 'text-gray-500'}>
            {achievement.icon}
          </div>
        </div>
        
        <h3 className={`mb-2 ${achievement.earned ? 'text-white' : 'text-gray-500'}`}>
          {achievement.title}
        </h3>
        
        <p className={`text-sm mb-3 ${achievement.earned ? 'text-gray-200' : 'text-gray-600'}`}>
          {achievement.description}
        </p>
        
        <div className="flex flex-col gap-2 items-center">
          <Badge className={`text-xs ${achievement.earned ? rarityColors[achievement.rarity] : 'bg-gray-700'} border-0`}>
            {achievement.rarity === 'common' ? '일반' : 
             achievement.rarity === 'rare' ? '레어' :
             achievement.rarity === 'epic' ? '에픽' : '전설'}
          </Badge>
          
          {achievement.earned && achievement.earnedDate && (
            <span className="text-xs text-gray-300">{achievement.earnedDate}</span>
          )}
        </div>
      </div>
    </Card>
  );
}

export function AchievementSection() {
  const achievements: Achievement[] = [
    {
      id: '1',
      title: '첫 퀘스트 완료',
      description: '첫 번째 퀘스트를 완료했습니다',
      icon: <Star className="w-6 h-6" />,
      earned: true,
      earnedDate: '2024-01-15',
      rarity: 'common',
      category: '시작'
    },
    {
      id: '2',
      title: '연속 출석 7일',
      description: '7일 연속으로 출석했습니다',
      icon: <Calendar className="w-6 h-6" />,
      earned: true,
      earnedDate: '2024-01-20',
      rarity: 'rare',
      category: '출석'
    },
    {
      id: '3',
      title: '수학 마스터',
      description: '수학 문제 100개를 완료했습니다',
      icon: <Target className="w-6 h-6" />,
      earned: true,
      earnedDate: '2024-01-25',
      rarity: 'epic',
      category: '학습'
    },
    {
      id: '4',
      title: '독서왕',
      description: '10권의 책을 읽었습니다',
      icon: <BookOpen className="w-6 h-6" />,
      earned: false,
      rarity: 'epic',
      category: '독서'
    },
    {
      id: '5',
      title: '시간 관리자',
      description: '모든 과제를 기한 내에 제출했습니다',
      icon: <Clock className="w-6 h-6" />,
      earned: false,
      rarity: 'rare',
      category: '시간관리'
    },
    {
      id: '6',
      title: '전설의 학습자',
      description: '모든 과목에서 90점 이상을 달성했습니다',
      icon: <Trophy className="w-6 h-6" />,
      earned: false,
      rarity: 'legendary',
      category: '성적'
    },
    {
      id: '7',
      title: '에너지 충전',
      description: '경험치 1000을 획득했습니다',
      icon: <Zap className="w-6 h-6" />,
      earned: true,
      earnedDate: '2024-01-22',
      rarity: 'rare',
      category: '경험치'
    },
    {
      id: '8',
      title: '완벽주의자',
      description: '과제를 100% 완성도로 제출했습니다',
      icon: <Award className="w-6 h-6" />,
      earned: false,
      rarity: 'epic',
      category: '완성도'
    }
  ];

  const earnedAchievements = achievements.filter(a => a.earned);
  const unearnedAchievements = achievements.filter(a => !a.earned);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl text-white">성취 배지</h2>
        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-0">
          {earnedAchievements.length}/{achievements.length} 획득
        </Badge>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg text-green-400">획득한 배지</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {earnedAchievements.map(achievement => (
            <AchievementBadge key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg text-gray-400">미획득 배지</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {unearnedAchievements.map(achievement => (
            <AchievementBadge key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </div>
  );
}