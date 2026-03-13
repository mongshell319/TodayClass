import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ArrowLeft, School, CheckCircle, Clock, MapPin, Camera, Users } from 'lucide-react';
import { motion } from 'motion/react';
import type { SchoolQuest } from '../types/questTypes';

interface SchoolQuestViewProps {
  onBack: () => void;
}

// 목업 데이터
const mockSchoolQuests: SchoolQuest[] = [
  {
    id: 'sq1',
    title: '교실 청소 완벽하게 하기',
    category: 'cleaning',
    description: '교실 바닥 청소, 칠판 정리, 쓰레기통 비우기를 완료하세요',
    points: 50,
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2일 후
    isCompleted: false,
    verificationRequired: true,
    instructions: [
      '바닥을 깨끗하게 쓸고 걸레질하기',
      '칠판과 화이트보드 깨끗하게 닦기',
      '쓰레기통 비우고 새 봉투 넣기',
      '책상과 의자 정리정돈하기',
      '완료 후 사진 촬영하여 제출'
    ]
  },
  {
    id: 'sq2',
    title: '복도 안전 점검하기',
    category: 'safety',
    description: '복도의 안전 위험 요소를 점검하고 보고하세요',
    points: 75,
    deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1일 후
    isCompleted: false,
    verificationRequired: true,
    instructions: [
      '복도 바닥 미끄러운 곳 확인',
      '비상구 출입로 확인',
      '전기 콘센트 상태 점검',
      '창문 잠금장치 확인',
      '위험 요소 발견 시 즉시 보고'
    ]
  },
  {
    id: 'sq3',
    title: '학교 환경 보호 캠페인',
    category: 'environment',
    description: '분리수거 실천하고 친환경 활동에 참여하세요',
    points: 100,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7일 후
    isCompleted: true,
    verificationRequired: false,
    instructions: [
      '일주일간 분리수거 실천하기',
      '친구들에게 환경보호 중요성 알리기',
      '플라스틱 사용 줄이기 실천',
      '학교 내 환경보호 포스터 제작',
      '환경 동아리 활동 참여'
    ]
  }
];

export function SchoolQuestView({ onBack }: SchoolQuestViewProps) {
  const [selectedQuest, setSelectedQuest] = useState<SchoolQuest | null>(null);

  const activeQuests = mockSchoolQuests.filter(q => !q.isCompleted);
  const completedQuests = mockSchoolQuests.filter(q => q.isCompleted);

  const getCategoryInfo = (category: SchoolQuest['category']) => {
    switch (category) {
      case 'cleaning':
        return { name: '청소', color: 'bg-blue-500', icon: '🧹' };
      case 'safety':
        return { name: '안전', color: 'bg-red-500', icon: '🛡️' };
      case 'community':
        return { name: '공동체', color: 'bg-green-500', icon: '🤝' };
      case 'environment':
        return { name: '환경', color: 'bg-emerald-500', icon: '🌱' };
    }
  };

  const formatDeadline = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return '오늘까지';
    if (days === 1) return '내일까지';
    return `${days}일 후`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 via-teal-900 to-cyan-900">
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
              <School className="w-6 h-6 text-green-400" />
              학교 퀘스트
            </h1>
            <p className="text-gray-300">학교 생활 전반의 책임감 있는 활동</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 진행 중인 퀘스트 */}
          <Card className="bg-black/40 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-400" />
                진행 중인 퀘스트 ({activeQuests.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeQuests.map((quest) => {
                const categoryInfo = getCategoryInfo(quest.category);
                
                return (
                  <motion.div
                    key={quest.id}
                    className="bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors"
                    onClick={() => setSelectedQuest(quest)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{categoryInfo.icon}</div>
                        <div>
                          <h4 className="text-white font-medium">{quest.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={`${categoryInfo.color} text-white text-xs`}>
                              {categoryInfo.name}
                            </Badge>
                            <span className="text-xs text-gray-400">
                              {formatDeadline(quest.deadline)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-yellow-500 text-white">
                        {quest.points}P
                      </Badge>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-3">{quest.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        {quest.verificationRequired && (
                          <span className="text-orange-300 flex items-center gap-1">
                            <Camera className="w-3 h-3" />
                            인증 필요
                          </span>
                        )}
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 shadow-lg shadow-emerald-500/30">
                        시작하기
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
              
              {activeQuests.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  현재 진행 중인 학교 퀘스트가 없습니다.
                </div>
              )}
            </CardContent>
          </Card>

          {/* 완료된 퀘스트 */}
          <Card className="bg-black/40 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                완료된 퀘스트 ({completedQuests.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {completedQuests.map((quest) => {
                const categoryInfo = getCategoryInfo(quest.category);
                
                return (
                  <div
                    key={quest.id}
                    className="bg-green-900/20 border border-green-500/30 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{categoryInfo.icon}</div>
                        <div>
                          <h4 className="text-white font-medium">{quest.title}</h4>
                          <Badge className={`${categoryInfo.color} text-white text-xs mt-1`}>
                            {categoryInfo.name}
                          </Badge>
                        </div>
                      </div>
                      <Badge className="bg-green-500 text-white">
                        +{quest.points} EXP
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm">{quest.description}</p>
                  </div>
                );
              })}
              
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
            <Card className="bg-black/40 border-green-500/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <span className="text-2xl">{getCategoryInfo(selectedQuest.category).icon}</span>
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
                  
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      수행 방법
                    </h4>
                    <ol className="space-y-2">
                      {selectedQuest.instructions.map((instruction, index) => (
                        <li key={index} className="text-white flex items-start gap-2">
                          <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                            {index + 1}
                          </span>
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  <div className="flex items-center justify-between bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                    <div>
                      <h4 className="text-orange-300 font-medium">마감 기한</h4>
                      <p className="text-white">{formatDeadline(selectedQuest.deadline)}</p>
                    </div>
                    <div className="text-right">
                      <h4 className="text-yellow-300 font-medium">보상</h4>
                      <p className="text-white">{selectedQuest.points} EXP</p>
                    </div>
                  </div>

                  {selectedQuest.verificationRequired && (
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                      <h4 className="text-blue-300 font-medium mb-2 flex items-center gap-2">
                        <Camera className="w-5 h-5" />
                        인증 필요
                      </h4>
                      <p className="text-blue-200 text-sm">
                        완료 후 사진을 촬영하여 선생님께 제출해야 합니다.
                      </p>
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