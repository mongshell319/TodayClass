import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Crown, Shield, Star, Trophy, Target, MessageSquare, UserPlus, Settings, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GuildMember {
  id: string;
  name: string;
  level: number;
  role: 'leader' | 'officer' | 'member';
  contribution: number;
  status: 'online' | 'offline' | 'studying';
  avatar: string;
  joinDate: Date;
}

interface GuildQuest {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  rewards: string[];
  difficulty: number;
  timeLeft: string;
  participants: number;
}

export function GuildSystem() {
  const [currentGuild] = useState({
    id: '1',
    name: '수학 마스터즈',
    description: '함께 수학의 정점을 향해 나아가는 학습 길드입니다.',
    level: 8,
    members: 24,
    maxMembers: 30,
    experience: 15600,
    maxExperience: 20000,
    rank: 7,
    badge: '🧮',
    createdDate: new Date('2024-01-15')
  });

  const guildMembers: GuildMember[] = [
    {
      id: '1',
      name: '김민수',
      level: 15,
      role: 'member',
      contribution: 1240,
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1729824186570-4d4aede00043?w=100',
      joinDate: new Date('2024-01-15')
    },
    {
      id: '2',
      name: '박지영',
      level: 18,
      role: 'leader',
      contribution: 2850,
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c14c?w=100',
      joinDate: new Date('2024-01-15')
    },
    {
      id: '3',
      name: '이철수',
      level: 16,
      role: 'officer',
      contribution: 2100,
      status: 'studying',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      joinDate: new Date('2024-01-20')
    },
    {
      id: '4',
      name: '최영희',
      level: 14,
      role: 'member',
      contribution: 980,
      status: 'offline',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      joinDate: new Date('2024-02-01')
    }
  ];

  const guildQuests: GuildQuest[] = [
    {
      id: '1',
      title: '집단 방정식 도전',
      description: '길드원들이 힘을 합쳐 100개의 이차방정식을 해결하세요.',
      progress: 67,
      maxProgress: 100,
      rewards: ['길드 경험치 500', '전체 멤버 경험치 부스터', '특별 길드 배지'],
      difficulty: 3,
      timeLeft: '2일 14시간',
      participants: 18
    },
    {
      id: '2',
      title: '학습 시간 마라톤',
      description: '길드 전체가 이번 주에 총 500시간의 학습 시간을 달성하세요.',
      progress: 320,
      maxProgress: 500,
      rewards: ['길드 경험치 800', '레어 아이템 상자', '길드 스킨'],
      difficulty: 4,
      timeLeft: '4일 6시간',
      participants: 22
    }
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'leader': return <Crown className="w-4 h-4 text-yellow-400" />;
      case 'officer': return <Shield className="w-4 h-4 text-blue-400" />;
      default: return <Users className="w-4 h-4 text-gray-400" />;
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'leader': return '길드장';
      case 'officer': return '운영진';
      default: return '멤버';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'studying': return 'bg-blue-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return '온라인';
      case 'studying': return '학습중';
      case 'offline': return '오프라인';
      default: return '알 수 없음';
    }
  };

  return (
    <div className="space-y-6">
      {/* 길드 헤더 */}
      <Card className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-purple-500/30 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                {currentGuild.badge}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{currentGuild.name}</h2>
                <p className="text-gray-300 mb-2">{currentGuild.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    레벨 {currentGuild.level}
                  </Badge>
                  <span className="text-gray-400">랭킹 #{currentGuild.rank}</span>
                  <span className="text-gray-400">{currentGuild.members}/{currentGuild.maxMembers}명</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-400 mb-1">길드 경험치</div>
              <div className="text-xl font-bold text-white mb-2">
                {currentGuild.experience.toLocaleString()} / {currentGuild.maxExperience.toLocaleString()}
              </div>
              <Progress 
                value={(currentGuild.experience / currentGuild.maxExperience) * 100} 
                className="w-40"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="members" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/60 border-slate-600/50">
          <TabsTrigger value="members" className="data-[state=active]:bg-purple-500">
            <Users className="w-4 h-4 mr-2" />
            멤버
          </TabsTrigger>
          <TabsTrigger value="quests" className="data-[state=active]:bg-purple-500">
            <Target className="w-4 h-4 mr-2" />
            길드 퀘스트
          </TabsTrigger>
          <TabsTrigger value="chat" className="data-[state=active]:bg-purple-500">
            <MessageSquare className="w-4 h-4 mr-2" />
            길드 채팅
          </TabsTrigger>
        </TabsList>

        {/* 멤버 탭 */}
        <TabsContent value="members">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">길드 멤버</CardTitle>
                  <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                    <UserPlus className="w-4 h-4 mr-2" />
                    초대하기
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {guildMembers.map((member) => (
                  <motion.div
                    key={member.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg"
                  >
                    <div className="relative">
                      <ImageWithFallback
                        src={member.avatar}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-slate-800`}></div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white">{member.name}</span>
                        {getRoleIcon(member.role)}
                        <Badge size="sm" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          Lv.{member.level}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{getRoleText(member.role)}</span>
                        <span className="text-gray-400">기여도: {member.contribution}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge size="sm" className={`${getStatusColor(member.status)} text-white border-0`}>
                        {getStatusText(member.status)}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* 길드 통계 */}
            <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">길드 통계</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                    <div className="text-2xl font-bold text-white mb-1">24</div>
                    <div className="text-sm text-gray-400">총 멤버</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                    <div className="text-2xl font-bold text-green-400 mb-1">18</div>
                    <div className="text-sm text-gray-400">활성 멤버</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400 mb-1">342</div>
                    <div className="text-sm text-gray-400">완료 퀘스트</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-400 mb-1">#7</div>
                    <div className="text-sm text-gray-400">서버 랭킹</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-white">이번 주 활동</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">퀘스트 완료</span>
                      <span className="text-white">28/30</span>
                    </div>
                    <Progress value={93} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">학습 목표</span>
                      <span className="text-white">156/200시간</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 길드 퀘스트 탭 */}
        <TabsContent value="quests">
          <div className="space-y-4">
            {guildQuests.map((quest) => (
              <Card key={quest.id} className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-white">{quest.title}</h3>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: quest.difficulty }, (_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300 mb-4">{quest.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">진행률</span>
                          <span className="text-white">{quest.progress}/{quest.maxProgress}</span>
                        </div>
                        <Progress value={(quest.progress / quest.maxProgress) * 100} className="h-3" />
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 mb-2">
                        {quest.timeLeft} 남음
                      </Badge>
                      <p className="text-sm text-gray-400">{quest.participants}명 참여중</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-700/50 pt-4">
                    <h4 className="font-medium text-white mb-2">보상</h4>
                    <div className="flex flex-wrap gap-2">
                      {quest.rewards.map((reward, index) => (
                        <Badge key={index} variant="outline" className="text-purple-300 border-purple-500/30">
                          <Award className="w-3 h-3 mr-1" />
                          {reward}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 길드 채팅 탭 */}
        <TabsContent value="chat">
          <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <MessageSquare className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">길드 채팅</h3>
              <p className="text-gray-400 mb-4">
                길드원들과 소통하고 함께 학습 목표를 달성하세요!
              </p>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                채팅방 입장
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}