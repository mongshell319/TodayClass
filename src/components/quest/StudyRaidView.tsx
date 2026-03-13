import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ArrowLeft, Users, Crown, Clock, Target, BookOpen, Sword, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import type { StudyRaid } from '../types/questTypes';

interface StudyRaidViewProps {
  onBack: () => void;
}

// 목업 데이터
const mockStudyRaids: StudyRaid[] = [
  {
    id: 'sr1',
    title: '수학 종합 문제집 마스터하기',
    subject: '수학',
    description: '2차함수, 확률, 통계 단원의 심화 문제들을 팀원들과 함께 해결하세요',
    assignedBy: '김수학 선생님',
    participants: ['김민수', '박지영', '이철수'],
    maxParticipants: 5,
    difficulty: 'hard',
    rewards: {
      experience: 500,
      items: ['수학 마스터 배지', '문제집 완료 인증서', '특별 보상 포인트 100P']
    },
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5일 후
    isActive: true,
    progress: 60,
    content: {
      assignments: [
        {
          id: 'a1',
          title: '이차함수 그래프 그리기',
          description: '주어진 10개 함수의 그래프를 정확히 그리고 특성 분석하기',
          type: 'individual',
          isCompleted: true,
          completedBy: ['김민수', '박지영']
        },
        {
          id: 'a2',
          title: '확률 문제 해결',
          description: '복합 확률 문제 15문제 해결하기',
          type: 'collaborative',
          isCompleted: false,
          completedBy: ['이철수']
        },
        {
          id: 'a3',
          title: '통계 데이터 분석',
          description: '실제 데이터를 활용한 통계 분석 프로젝트',
          type: 'collaborative',
          isCompleted: false,
          completedBy: []
        }
      ]
    }
  },
  {
    id: 'sr2',
    title: '영어 토론 대회 준비',
    subject: '영어',
    description: '환경 보호를 주제로 한 영어 토론 대회 준비',
    assignedBy: 'Sarah Johnson 선생님',
    participants: ['최영희', '정민호'],
    maxParticipants: 4,
    difficulty: 'medium',
    rewards: {
      experience: 300,
      items: ['토론 전문가 배지', '영어 회화 레벨업']
    },
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10일 후
    isActive: true,
    progress: 25,
    content: {
      assignments: [
        {
          id: 'b1',
          title: '주제 리서치',
          description: '환경 보호 관련 영어 자료 조사 및 정리',
          type: 'individual',
          isCompleted: true,
          completedBy: ['최영희']
        },
        {
          id: 'b2',
          title: '논리 구성',
          description: '찬성/반대 논리 구성 및 근거 마련',
          type: 'collaborative',
          isCompleted: false,
          completedBy: []
        }
      ]
    }
  }
];

export function StudyRaidView({ onBack }: StudyRaidViewProps) {
  const [selectedRaid, setSelectedRaid] = useState<StudyRaid | null>(null);

  const activeRaids = mockStudyRaids.filter(r => r.isActive);

  const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
    }
  };

  const formatDeadline = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return `${days}일 후`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-800 via-violet-900 to-indigo-900">
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
              <Users className="w-6 h-6 text-purple-400" />
              공부 레이드
            </h1>
            <p className="text-gray-300">팀원들과 함께 도전하는 협력 학습 미션</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 활성 레이드 목록 */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">참여 중인 레이드</h2>
            
            {activeRaids.map((raid) => (
              <motion.div key={raid.id} whileHover={{ scale: 1.02 }}>
                <Card 
                  className="bg-black/40 border-white/20 backdrop-blur-sm cursor-pointer hover:border-purple-400/50 transition-colors"
                  onClick={() => setSelectedRaid(raid)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-purple-400" />
                          {raid.title}
                        </CardTitle>
                        <p className="text-sm text-gray-300 mt-1">{raid.subject}</p>
                      </div>
                      <Badge className={`${getDifficultyColor(raid.difficulty)} text-white`}>
                        {raid.difficulty === 'easy' ? '쉬움' : 
                         raid.difficulty === 'medium' ? '보통' : '어려움'}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-300 text-sm mb-4">{raid.description}</p>
                    
                    {/* 진행률 */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">진행률</span>
                        <span className="text-purple-400">{raid.progress}%</span>
                      </div>
                      <Progress value={raid.progress} className="h-2" />
                    </div>

                    {/* 참여자 정보 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">
                          {raid.participants.length}/{raid.maxParticipants}명 참여
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        {formatDeadline(raid.deadline)}
                      </div>
                    </div>

                    {/* 참여자 아바타 */}
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-xs text-gray-400">팀원:</span>
                      <div className="flex -space-x-2">
                        {raid.participants.map((participant, index) => (
                          <Avatar key={index} className="w-6 h-6 border-2 border-gray-600">
                            <AvatarFallback className="bg-purple-500 text-white text-xs">
                              {participant.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* 레이드 상세 정보 */}
          <div>
            {selectedRaid ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">{selectedRaid.title}</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedRaid(null)}
                        className="border-white/20 text-white"
                      >
                        닫기
                      </Button>
                    </div>
                    <p className="text-gray-300">{selectedRaid.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* 레이드 정보 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="text-sm text-gray-300">담당 선생님</div>
                        <div className="text-white font-medium">{selectedRaid.assignedBy}</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="text-sm text-gray-300">마감일</div>
                        <div className="text-white font-medium">{formatDeadline(selectedRaid.deadline)}</div>
                      </div>
                    </div>

                    {/* 과제 목록 */}
                    <div>
                      <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                        <Target className="w-5 h-5 text-purple-400" />
                        과제 목록
                      </h4>
                      <div className="space-y-3">
                        {selectedRaid.content.assignments.map((assignment) => (
                          <div
                            key={assignment.id}
                            className={`rounded-lg p-3 border ${
                              assignment.isCompleted 
                                ? 'bg-green-900/20 border-green-500/30' 
                                : 'bg-white/10 border-white/20'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-white font-medium flex items-center gap-2">
                                {assignment.type === 'individual' ? (
                                  <Sword className="w-4 h-4 text-red-400" />
                                ) : (
                                  <Shield className="w-4 h-4 text-blue-400" />
                                )}
                                {assignment.title}
                              </h5>
                              <Badge className={assignment.isCompleted ? 'bg-green-500' : 'bg-gray-500'}>
                                {assignment.isCompleted ? '완료' : '진행중'}
                              </Badge>
                            </div>
                            <p className="text-gray-300 text-sm mb-2">{assignment.description}</p>
                            
                            {assignment.completedBy && assignment.completedBy.length > 0 && (
                              <div className="flex items-center gap-2 text-xs">
                                <span className="text-gray-400">완료:</span>
                                <div className="flex gap-1">
                                  {assignment.completedBy.map((name, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {name}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 보상 정보 */}
                    <div className="bg-gradient-to-br from-yellow-600/40 to-orange-600/30 border border-yellow-400/50 rounded-lg p-4 shadow-lg shadow-yellow-500/20">
                      <h4 className="text-yellow-200 font-medium mb-3 flex items-center gap-2">
                        <Crown className="w-5 h-5 text-yellow-300" />
                        레이드 완료 보상
                      </h4>
                      <div className="space-y-2">
                        <div className="text-white">
                          <span className="text-yellow-300 font-bold">+{selectedRaid.rewards.experience}</span> 경험치
                        </div>
                        {selectedRaid.rewards.items.map((item, index) => (
                          <div key={index} className="text-yellow-100 text-sm">
                            🎁 {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="bg-black/20 border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">레이드를 선택하여 상세 정보를 확인하세요</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}