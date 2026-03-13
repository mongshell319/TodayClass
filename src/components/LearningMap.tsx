import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, Lock, Star, BookOpen, Trophy, Target, Zap } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface MapNode {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'locked';
  type: 'lesson' | 'quest' | 'boss' | 'checkpoint';
  difficulty: number;
  rewards: string[];
  position: { x: number; y: number };
  connections: string[];
}

export function LearningMap() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const mapNodes: MapNode[] = [
    {
      id: '1',
      title: '기본 대수',
      description: '대수의 기초 개념을 학습합니다.',
      status: 'completed',
      type: 'lesson',
      difficulty: 1,
      rewards: ['50 XP', '대수 입문자 배지'],
      position: { x: 10, y: 80 },
      connections: ['2']
    },
    {
      id: '2', 
      title: '일차방정식',
      description: '일차방정식의 해법을 익힙니다.',
      status: 'completed',
      type: 'lesson',
      difficulty: 2,
      rewards: ['75 XP', '방정식 해결사 배지'],
      position: { x: 25, y: 65 },
      connections: ['3', '4']
    },
    {
      id: '3',
      title: '연립방정식 퀘스트',
      description: '연립방정식 문제를 해결하는 특별 퀘스트입니다.',
      status: 'current',
      type: 'quest',
      difficulty: 3,
      rewards: ['100 XP', '연립방정식 마스터', '특별 아이템'],
      position: { x: 40, y: 50 },
      connections: ['5']
    },
    {
      id: '4',
      title: '그래프와 함수',
      description: '함수의 그래프를 그리고 분석합니다.',
      status: 'current',
      type: 'lesson',
      difficulty: 3,
      rewards: ['90 XP', '그래프 분석가 배지'],
      position: { x: 25, y: 35 },
      connections: ['5']
    },
    {
      id: '5',
      title: '이차방정식 보스',
      description: '이차방정식의 모든 해법을 마스터하는 보스 퀘스트입니다.',
      status: 'locked',
      type: 'boss',
      difficulty: 5,
      rewards: ['200 XP', '이차방정식 정복자', '전설 아이템', '특별 스킨'],
      position: { x: 55, y: 40 },
      connections: ['6']
    },
    {
      id: '6',
      title: '고급 함수',
      description: '지수함수와 로그함수를 학습합니다.',
      status: 'locked',
      type: 'lesson', 
      difficulty: 4,
      rewards: ['120 XP', '함수 마스터 배지'],
      position: { x: 70, y: 25 },
      connections: ['7']
    },
    {
      id: '7',
      title: '최종 도전',
      description: '모든 수학 지식을 활용하는 최종 도전입니다.',
      status: 'locked',
      type: 'checkpoint',
      difficulty: 6,
      rewards: ['500 XP', '수학 마스터', '레전더리 아이템'],
      position: { x: 85, y: 15 },
      connections: []
    }
  ];

  const getNodeIcon = (type: string, status: string) => {
    if (status === 'locked') return <Lock className="w-4 h-4" />;
    
    switch (type) {
      case 'lesson': return <BookOpen className="w-4 h-4" />;
      case 'quest': return <Target className="w-4 h-4" />;
      case 'boss': return <Zap className="w-4 h-4" />;
      case 'checkpoint': return <Trophy className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  const getNodeColor = (type: string, status: string) => {
    if (status === 'locked') return 'bg-gray-600 border-gray-500';
    if (status === 'completed') return 'bg-green-500 border-green-400';
    
    switch (type) {
      case 'lesson': return 'bg-blue-500 border-blue-400';
      case 'quest': return 'bg-purple-500 border-purple-400';
      case 'boss': return 'bg-red-500 border-red-400';
      case 'checkpoint': return 'bg-yellow-500 border-yellow-400';
      default: return 'bg-gray-500 border-gray-400';
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < difficulty ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  const selectedNodeData = selectedNode ? mapNodes.find(n => n.id === selectedNode) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">학습 여정 맵</h2>
          <p className="text-gray-400">당신의 수학 모험을 시각적으로 확인하세요</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">전체 진행률</div>
          <div className="text-xl font-bold text-white">28%</div>
          <Progress value={28} className="w-32 mt-1" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 학습 맵 */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="relative w-full h-96 bg-gradient-to-br from-slate-900/50 to-purple-900/20 rounded-xl overflow-hidden">
                {/* 연결선 그리기 */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {mapNodes.map(node => 
                    node.connections.map(targetId => {
                      const target = mapNodes.find(n => n.id === targetId);
                      if (!target) return null;
                      
                      return (
                        <line
                          key={`${node.id}-${targetId}`}
                          x1={`${node.position.x}%`}
                          y1={`${node.position.y}%`}
                          x2={`${target.position.x}%`}
                          y2={`${target.position.y}%`}
                          stroke={node.status === 'completed' ? '#10b981' : '#475569'}
                          strokeWidth="2"
                          strokeDasharray={node.status === 'completed' ? '0' : '5,5'}
                          className="opacity-60"
                        />
                      );
                    })
                  )}
                </svg>

                {/* 노드들 */}
                {mapNodes.map((node) => (
                  <motion.div
                    key={node.id}
                    className="absolute cursor-pointer"
                    style={{
                      left: `${node.position.x}%`,
                      top: `${node.position.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                  >
                    <div className={`w-12 h-12 rounded-full border-2 ${getNodeColor(node.type, node.status)} flex items-center justify-center text-white shadow-lg`}>
                      {node.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        getNodeIcon(node.type, node.status)
                      )}
                    </div>
                    
                    {/* 노드 라벨 */}
                    <div className="absolute top-14 left-1/2 transform -translate-x-1/2 text-center">
                      <div className="text-xs font-medium text-white bg-slate-900/80 px-2 py-1 rounded whitespace-nowrap">
                        {node.title}
                      </div>
                    </div>

                    {/* 현재 노드 표시 */}
                    {node.status === 'current' && (
                      <motion.div
                        className="absolute inset-0 border-2 border-white rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 노드 상세 정보 */}
        <div>
          <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-6">
              {selectedNodeData ? (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-full ${getNodeColor(selectedNodeData.type, selectedNodeData.status)} flex items-center justify-center text-white`}>
                        {getNodeIcon(selectedNodeData.type, selectedNodeData.status)}
                      </div>
                      <h3 className="font-bold text-white">{selectedNodeData.title}</h3>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Badge 
                        className={`${
                          selectedNodeData.type === 'lesson' ? 'bg-blue-500' :
                          selectedNodeData.type === 'quest' ? 'bg-purple-500' :
                          selectedNodeData.type === 'boss' ? 'bg-red-500' : 'bg-yellow-500'
                        } text-white border-0`}
                      >
                        {selectedNodeData.type === 'lesson' ? '수업' :
                         selectedNodeData.type === 'quest' ? '퀘스트' :
                         selectedNodeData.type === 'boss' ? '보스' : '체크포인트'}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {getDifficultyStars(selectedNodeData.difficulty)}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed">
                    {selectedNodeData.description}
                  </p>

                  <div>
                    <h4 className="font-medium text-white mb-2">보상</h4>
                    <div className="space-y-1">
                      {selectedNodeData.rewards.map((reward, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                          <Star className="w-3 h-3 text-yellow-400" />
                          {reward}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    {selectedNodeData.status === 'locked' ? (
                      <Button disabled className="w-full bg-gray-600 text-gray-400">
                        <Lock className="w-4 h-4 mr-2" />
                        잠금됨
                      </Button>
                    ) : selectedNodeData.status === 'completed' ? (
                      <Button variant="outline" className="w-full border-green-500 text-green-400">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        완료됨
                      </Button>
                    ) : (
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        <Target className="w-4 h-4 mr-2" />
                        시작하기
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>노드를 클릭하여 상세 정보를 확인하세요</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}