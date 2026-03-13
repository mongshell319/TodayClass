import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Crown, Medal, Award, Star, Zap, Coins } from 'lucide-react';

interface RankingStudent {
  rank: number;
  name: string;
  level: number;
  experience: number;
  coins: number;
  avatar: string;
  isCurrentUser?: boolean;
}

function RankingCard({ student }: { student: RankingStudent }) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
            <span className="text-sm font-bold text-white">#{rank}</span>
          </div>
        );
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-500/20 to-amber-500/20 border-yellow-500/50';
      case 2:
        return 'from-gray-500/20 to-slate-500/20 border-gray-500/50';
      case 3:
        return 'from-amber-600/20 to-orange-600/20 border-amber-600/50';
      default:
        return 'from-gray-700/20 to-gray-800/20 border-gray-600/30';
    }
  };

  return (
    <Card className={`p-4 bg-gradient-to-r ${getRankColor(student.rank)} ${student.isCurrentUser ? 'ring-2 ring-blue-500' : ''} transition-all duration-300 hover:scale-[1.02]`}>
      <div className="flex items-center gap-4">
        {/* Rank Icon */}
        <div className="flex-shrink-0">
          {getRankIcon(student.rank)}
        </div>

        {/* Avatar */}
        <div className="relative">
          <div className={`w-12 h-12 rounded-full border-2 ${student.rank <= 3 ? 'border-yellow-400' : 'border-gray-500'} p-0.5`}>
            <ImageWithFallback 
              src={student.avatar}
              alt={student.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          {student.isCurrentUser && (
            <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1">
              <Star className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        {/* Student Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-white font-medium">{student.name}</h3>
            {student.isCurrentUser && (
              <Badge className="bg-blue-600 text-white border-0 text-xs">나</Badge>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <span>레벨 {student.level}</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span>XP {student.experience}</span>
            </div>
            <div className="flex items-center gap-1">
              <Coins className="w-3 h-3 text-amber-400" />
              <span>코인 {student.coins}</span>
            </div>
          </div>
        </div>

        {/* Rank Number */}
        <div className="text-right">
          <div className={`text-2xl font-bold ${student.rank <= 3 ? 'text-yellow-400' : 'text-gray-400'}`}>
            #{student.rank}
          </div>
        </div>
      </div>
    </Card>
  );
}

export function RankingSection() {
  const rankingData: RankingStudent[] = [
    {
      rank: 1,
      name: "신민성",
      level: 5,
      experience: 1620,
      coins: 62,
      avatar: "https://images.unsplash.com/photo-1729824186570-4d4aede00043?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwYXZhdGFyJTIwcHJvZmlsZXxlbnwxfHx8fDE3NTkwMTc4MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      isCurrentUser: true
    },
    {
      rank: 2,
      name: "교사 희연과 동양한 이름",
      level: 1,
      experience: 0,
      coins: 0,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      rank: 3,
      name: "김서연",
      level: 4,
      experience: 980,
      coins: 45,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b25c2d9e?w=100&h=100&fit=crop&crop=face"
    },
    {
      rank: 4,
      name: "이준호",
      level: 3,
      experience: 756,
      coins: 32,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      rank: 5,
      name: "박지민",
      level: 3,
      experience: 642,
      coins: 28,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      rank: 6,
      name: "최수영",
      level: 2,
      experience: 425,
      coins: 19,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
    },
    {
      rank: 7,
      name: "정민재",
      level: 2,
      experience: 310,
      coins: 15,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face"
    },
    {
      rank: 8,
      name: "한유진",
      level: 1,
      experience: 156,
      coins: 8,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const topThree = rankingData.slice(0, 3);
  const restOfRanking = rankingData.slice(3);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl text-white">랭킹</h2>
        <p className="text-gray-300">경험치 순으로 상위 학생들을 확인하세요.</p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topThree.map((student) => (
          <div key={student.rank} className="relative">
            <RankingCard student={student} />
            {student.rank === 1 && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  👑 1등
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Rest of Rankings */}
      <div className="space-y-3">
        <h3 className="text-lg text-gray-300">전체 랭킹</h3>
        <div className="space-y-2">
          {restOfRanking.map((student) => (
            <RankingCard key={student.rank} student={student} />
          ))}
        </div>
      </div>

      {/* Ranking Info */}
      <Card className="p-4 bg-blue-900/20 border-blue-500/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <Star className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-white font-medium">랭킹 시스템 안내</h4>
            <p className="text-gray-300 text-sm">경험치(XP)를 기준으로 순위가 결정됩니다. 퀘스트를 완료하고 활동에 참여해서 순위를 올려보세요!</p>
          </div>
        </div>
      </Card>
    </div>
  );
}