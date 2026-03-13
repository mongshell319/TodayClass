import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Calendar, BookOpen, Target, Clock, Award, TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  progress?: number;
  change?: string;
  color: string;
}

function StatCard({ title, value, icon, progress, change, color }: StatCardProps) {
  return (
    <Card className={`p-4 bg-gradient-to-br ${color} border-0 relative overflow-hidden shadow-lg`}>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="text-white/80 text-sm">{title}</div>
          <div className="text-white/90">{icon}</div>
        </div>
        
        <div className="text-2xl font-bold text-white mb-2">{value}</div>
        
        {progress !== undefined && (
          <Progress value={progress} className="h-2 bg-white/20 mb-2" />
        )}
        
        {change && (
          <div className="flex items-center text-sm text-green-300">
            <TrendingUp className="w-3 h-3 mr-1" />
            {change}
          </div>
        )}
      </div>
    </Card>
  );
}

export function StatsGrid() {
  const stats = [
    {
      title: "출석률",
      value: "95%",
      icon: <Calendar className="w-5 h-5" />,
      progress: 95,
      change: "+5% 이번 달",
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "과제 완료",
      value: "8/10",
      icon: <BookOpen className="w-5 h-5" />,
      progress: 80,
      color: "from-blue-500 to-cyan-600"
    },
    {
      title: "목표 달성",
      value: "12",
      icon: <Target className="w-5 h-5" />,
      change: "+3 이번 주",
      color: "from-violet-500 to-purple-600"
    },
    {
      title: "학습 시간",
      value: "24시간",
      icon: <Clock className="w-5 h-5" />,
      change: "+2시간",
      color: "from-orange-500 to-amber-600"
    },
    {
      title: "획득 배지",
      value: "15",
      icon: <Award className="w-5 h-5" />,
      color: "from-yellow-400 to-orange-500"
    },
    {
      title: "평균 점수",
      value: "87점",
      icon: <TrendingUp className="w-5 h-5" />,
      progress: 87,
      change: "+5점 향상",
      color: "from-pink-500 to-rose-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}