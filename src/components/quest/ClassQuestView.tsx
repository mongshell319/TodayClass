import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { ArrowLeft, BookOpen, Clock, Target, HelpCircle, Calculator, Brain } from 'lucide-react';
import { motion } from 'motion/react';
import type { ClassQuest } from '../types/questTypes';

interface ClassQuestViewProps {
  onBack: () => void;
}

// 목업 데이터
const mockClassQuests: ClassQuest[] = [
  {
    id: 'cq1',
    title: '이차함수의 기본 개념',
    subject: '수학',
    description: '이차함수의 일반형과 표준형을 이해하고 그래프를 그려보세요',
    difficulty: 'medium',
    points: 150,
    timeLimit: 600, // 10분
    isActive: true,
    isCompleted: false,
    content: {
      question: 'f(x) = 2x² - 8x + 3을 표준형으로 나타내면?',
      options: [
        'f(x) = 2(x - 2)² - 5',
        'f(x) = 2(x - 2)² + 5', 
        'f(x) = 2(x + 2)² - 5',
        'f(x) = 2(x + 2)² + 5'
      ],
      hints: ['완전제곱식을 만들어보세요', '계수 2를 밖으로 빼내세요']
    }
  },
  {
    id: 'cq2',
    title: '영어 단어 암기 퀘스트',
    subject: '영어',
    description: '이번 주 필수 영단어 20개를 암기하고 문장에 활용해보세요',
    difficulty: 'easy',
    points: 100,
    timeLimit: 300,
    isActive: true,
    isCompleted: false,
    content: {
      problem: 'accomplish를 사용한 문장을 만들어보세요'
    }
  },
  {
    id: 'cq3',
    title: '화학 실험 결과 분석',
    subject: '화학',
    description: '산과 염기의 중화반응 실험 결과를 분석하고 결론을 도출하세요',
    difficulty: 'hard',
    points: 200,
    timeLimit: 900,
    isActive: false,
    isCompleted: true,
    content: {
      problem: '실험에서 얻은 데이터를 바탕으로 중화점을 찾아보세요'
    }
  }
];

export function ClassQuestView({ onBack }: ClassQuestViewProps) {
  const [selectedQuest, setSelectedQuest] = useState<ClassQuest | null>(null);

  const activeQuests = mockClassQuests.filter(q => q.isActive);
  const completedQuests = mockClassQuests.filter(q => q.isCompleted);

  const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
    }
  };

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case '수학': return <Calculator className="w-5 h-5" />;
      case '영어': return <BookOpen className="w-5 h-5" />;
      case '화학': return <Brain className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-800 via-indigo-900 to-purple-900">
      {/* 헤더 */}
      <div className="bg-black/30 border-b border-white/10 backdrop-blur-sm p-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            뒤로가기
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-400" />
              수업 퀘스트
            </h1>
            <p className="text-gray-300">수업 중 실시간으로 해결하는 학습 퀘스트</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 진행 중인 퀘스트 */}
          <Card className="bg-black/40 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-green-400" />
                진행 중인 퀘스트 ({activeQuests.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeQuests.map((quest) => (
                <motion.div
                  key={quest.id}
                  className="bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors"
                  onClick={() => setSelectedQuest(quest)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getSubjectIcon(quest.subject)}
                      <div>
                        <h4 className="text-white font-medium">{quest.title}</h4>
                        <p className="text-sm text-gray-300">{quest.subject}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={`${getDifficultyColor(quest.difficulty)} text-white shadow-lg`}>
                        {quest.points}P
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">{quest.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{Math.floor(quest.timeLimit / 60)}분</span>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/30">
                      시작하기
                    </Button>
                  </div>
                </motion.div>
              ))}
              
              {activeQuests.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  현재 진행 중인 수업 퀘스트가 없습니다.
                </div>
              )}
            </CardContent>
          </Card>

          {/* 완료된 퀘스트 */}
          <Card className="bg-black/40 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-yellow-400" />
                완료된 퀘스트 ({completedQuests.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {completedQuests.map((quest) => (
                <div
                  key={quest.id}
                  className="bg-green-900/20 border border-green-500/30 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {getSubjectIcon(quest.subject)}
                      <div>
                        <h4 className="text-white font-medium">{quest.title}</h4>
                        <p className="text-sm text-gray-300">{quest.subject}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500 text-white">
                      +{quest.points} EXP
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm">{quest.description}</p>
                </div>
              ))}
              
              {completedQuests.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  완료된 퀘스트가 없습니다.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 퀘스트 상세 정보 */}
        {selectedQuest && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    {getSubjectIcon(selectedQuest.subject)}
                    {selectedQuest.title}
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedQuest(null)}
                    className="border-white/20 text-white"
                  >
                    닫기
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-300">{selectedQuest.description}</p>
                  
                  {selectedQuest.content.question && (
                    <div className="bg-white/10 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5" />
                        문제
                      </h4>
                      <p className="text-white mb-3">{selectedQuest.content.question}</p>
                      
                      {selectedQuest.content.options && (
                        <div className="space-y-2">
                          {selectedQuest.content.options.map((option, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="w-full justify-start border-white/20 text-white hover:bg-white/10"
                            >
                              {String.fromCharCode(65 + index)}. {option}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {selectedQuest.content.hints && (
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                      <h4 className="text-blue-300 font-medium mb-2">💡 힌트</h4>
                      <ul className="space-y-1">
                        {selectedQuest.content.hints.map((hint, index) => (
                          <li key={index} className="text-blue-200 text-sm">
                            • {hint}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}