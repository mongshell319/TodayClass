import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { BookOpen, Calculator, Globe, FlaskConical, Palette, Music } from 'lucide-react';

interface Subject {
  name: string;
  progress: number;
  grade: string;
  icon: React.ReactNode;
  color: string;
  nextMilestone: string;
  totalLessons: number;
  completedLessons: number;
}

function SubjectCard({ subject }: { subject: Subject }) {
  return (
    <Card className="p-6 bg-gray-800/50 border-gray-700 hover:bg-gray-800/80 transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-lg ${subject.color} flex items-center justify-center`}>
          {subject.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-white mb-1">{subject.name}</h3>
          <Badge className="bg-blue-600 text-white border-0 text-xs">
            {subject.grade}
          </Badge>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{subject.progress}%</div>
          <div className="text-sm text-gray-400">완료</div>
        </div>
      </div>
      
      <Progress value={subject.progress} className="h-3 bg-gray-700 mb-4" />
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-300">
          <span>완료한 수업</span>
          <span className="text-white">{subject.completedLessons}/{subject.totalLessons}</span>
        </div>
        <div className="text-gray-400">
          다음 목표: {subject.nextMilestone}
        </div>
      </div>
    </Card>
  );
}

export function ProgressSection() {
  const subjects: Subject[] = [
    {
      name: '수학',
      progress: 78,
      grade: 'A-',
      icon: <Calculator className="w-6 h-6 text-white" />,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      nextMilestone: '미분과 적분 완료',
      totalLessons: 45,
      completedLessons: 35
    },
    {
      name: '영어',
      progress: 65,
      grade: 'B+',
      icon: <Globe className="w-6 h-6 text-white" />,
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      nextMilestone: '토익 800점 달성',
      totalLessons: 40,
      completedLessons: 26
    },
    {
      name: '과학',
      progress: 82,
      grade: 'A',
      icon: <FlaskConical className="w-6 h-6 text-white" />,
      color: 'bg-gradient-to-r from-purple-500 to-indigo-500',
      nextMilestone: '화학 실험 보고서',
      totalLessons: 38,
      completedLessons: 31
    },
    {
      name: '국어',
      progress: 70,
      grade: 'A-',
      icon: <BookOpen className="w-6 h-6 text-white" />,
      color: 'bg-gradient-to-r from-red-500 to-pink-500',
      nextMilestone: '고전문학 분석',
      totalLessons: 42,
      completedLessons: 29
    },
    {
      name: '미술',
      progress: 90,
      grade: 'A+',
      icon: <Palette className="w-6 h-6 text-white" />,
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      nextMilestone: '개인 작품전 준비',
      totalLessons: 30,
      completedLessons: 27
    },
    {
      name: '음악',
      progress: 55,
      grade: 'B',
      icon: <Music className="w-6 h-6 text-white" />,
      color: 'bg-gradient-to-r from-pink-500 to-rose-500',
      nextMilestone: '피아노 연주 시험',
      totalLessons: 35,
      completedLessons: 19
    }
  ];

  const averageProgress = Math.round(subjects.reduce((acc, subject) => acc + subject.progress, 0) / subjects.length);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl text-white">학습 진행률</h2>
        <div className="flex items-center gap-4">
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
            전체 평균: {averageProgress}%
          </Badge>
        </div>
      </div>
      
      <Card className="p-6 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-indigo-500/30">
        <h3 className="text-white mb-4">전체 학습 현황</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">전체 진행률</span>
            <span className="text-white">{averageProgress}%</span>
          </div>
          <Progress value={averageProgress} className="h-4 bg-gray-700" />
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">5</div>
              <div className="text-sm text-gray-300">우수 과목</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">1</div>
              <div className="text-sm text-gray-300">주의 필요</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">245</div>
              <div className="text-sm text-gray-300">총 수업</div>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject, index) => (
          <SubjectCard key={index} subject={subject} />
        ))}
      </div>
    </div>
  );
}