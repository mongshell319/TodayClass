import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Clock, Star, Zap, CheckCircle2, Circle, BookOpen, Target, Users, Presentation, Brush, HandHeart, GraduationCap, Sword } from 'lucide-react';

interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'special';
  difficulty: 'easy' | 'medium' | 'hard';
  reward: number;
  progress: number;
  maxProgress: number;
  completed: boolean;
  timeLeft?: string;
}

function QuestCard({ quest }: { quest: Quest }) {
  const progressPercentage = (quest.progress / quest.maxProgress) * 100;
  
  const typeColors = {
    daily: 'bg-green-600',
    weekly: 'bg-blue-600',
    special: 'bg-purple-600'
  };
  
  const difficultyColors = {
    easy: 'text-green-400',
    medium: 'text-yellow-400',
    hard: 'text-red-400'
  };

  return (
    <Card className="p-4 bg-gray-800/50 border-gray-700 hover:bg-gray-800/80 transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {quest.completed ? (
            <CheckCircle2 className="w-5 h-5 text-green-400" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400" />
          )}
          <Badge className={`${typeColors[quest.type]} text-white border-0 text-xs`}>
            {quest.type === 'daily' ? '일일' : quest.type === 'weekly' ? '주간' : '특별'}
          </Badge>
        </div>
        
        <div className="flex items-center gap-1">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-400 text-sm">{quest.reward} XP</span>
        </div>
      </div>
      
      <h3 className="text-white mb-2">{quest.title}</h3>
      <p className="text-gray-400 text-sm mb-3">{quest.description}</p>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-300">진행도</span>
          <span className="text-white">{quest.progress}/{quest.maxProgress}</span>
        </div>
        <Progress value={progressPercentage} className="h-2 bg-gray-700" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className={`w-4 h-4 ${difficultyColors[quest.difficulty]}`} />
            <span className={`text-sm ${difficultyColors[quest.difficulty]}`}>
              {quest.difficulty === 'easy' ? '쉬움' : quest.difficulty === 'medium' ? '보통' : '어려움'}
            </span>
          </div>
          
          {quest.timeLeft && (
            <div className="flex items-center gap-1 text-orange-400 text-sm">
              <Clock className="w-4 h-4" />
              {quest.timeLeft}
            </div>
          )}
        </div>
        
        {!quest.completed && (
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
            size="sm"
          >
            퀘스트 시작
          </Button>
        )}
      </div>
    </Card>
  );
}

export function QuestSection() {
  const quests: Quest[] = [
    {
      id: '1',
      title: '수학 문제 5개 풀기',
      description: '오늘의 수학 연산 문제를 풀어보세요',
      type: 'daily',
      difficulty: 'easy',
      reward: 50,
      progress: 3,
      maxProgress: 5,
      completed: false,
      timeLeft: '6시간 남음'
    },
    {
      id: '2',
      title: '영어 단어 20개 암기',
      description: '새로운 영어 단어들을 학습하고 암기하세요',
      type: 'daily',
      difficulty: 'medium',
      reward: 75,
      progress: 12,
      maxProgress: 20,
      completed: false,
      timeLeft: '8시간 남음'
    },
    {
      id: '3',
      title: '과학 실험 보고서 작성',
      description: '이번 주 과학 실험에 대한 보고서를 완성하세요',
      type: 'weekly',
      difficulty: 'hard',
      reward: 200,
      progress: 1,
      maxProgress: 1,
      completed: false,
      timeLeft: '3일 남음'
    },
    {
      id: '4',
      title: '독서 감상문 작성',
      description: '선택한 도서를 읽고 감상문을 작성하세요',
      type: 'special',
      difficulty: 'medium',
      reward: 150,
      progress: 1,
      maxProgress: 1,
      completed: true
    }
  ];

  const activeQuests = quests.filter(q => !q.completed);
  const completedQuests = quests.filter(q => q.completed);

  const activities = [
    { name: '수업 완주', icon: <GraduationCap className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
    { name: '과제 격파', icon: <Sword className="w-6 h-6" />, color: 'from-red-500 to-orange-500' },
    { name: '청소 당번', icon: <Brush className="w-6 h-6" />, color: 'from-green-500 to-emerald-500' },
    { name: '발표 당번', icon: <Presentation className="w-6 h-6" />, color: 'from-purple-500 to-indigo-500' },
    { name: '팀 레이드', icon: <Users className="w-6 h-6" />, color: 'from-pink-500 to-rose-500' },
    { name: '역할 임무', icon: <Target className="w-6 h-6" />, color: 'from-yellow-500 to-amber-500' },
    { name: '도움 당번', icon: <HandHeart className="w-6 h-6" />, color: 'from-teal-500 to-cyan-500' },
    { name: '독서 당번', icon: <BookOpen className="w-6 h-6" />, color: 'from-indigo-500 to-purple-500' }
  ];

  return (
    <div className="space-y-8">
      {/* 활동 선택 섹션 */}
      <Card className="p-6 bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-amber-500/30">
        <div className="space-y-4">
          <h2 className="text-xl text-white">활동 선택</h2>
          <p className="text-gray-300">원하는 활동을 선택하여 요청을 생성하세요. 선생님이 승인을 받으면 됩니다.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {activities.map((activity, index) => (
              <Button
                key={index}
                className={`h-16 bg-gradient-to-r ${activity.color} hover:scale-105 transition-all duration-300 text-white border-0 flex flex-col gap-2`}
                onClick={() => {
                  // 여기에 활동 선택 로직 추가
                }}
              >
                {activity.icon}
                <span className="text-sm">{activity.name}</span>
              </Button>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
            <p className="text-gray-400 text-sm">💡 활동을 선택하여 요청을 생성하세요.</p>
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-xl text-white">진행 중인 퀘스트</h2>
        <Badge className="bg-blue-600 text-white border-0">
          {activeQuests.length}개 진행중
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeQuests.map(quest => (
          <QuestCard key={quest.id} quest={quest} />
        ))}
      </div>
      
      {completedQuests.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-white">완료된 퀘스트</h3>
            <Badge className="bg-green-600 text-white border-0">
              {completedQuests.length}개 완료
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedQuests.map(quest => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}