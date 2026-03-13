import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Crown, Heart, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import type { Student } from '../types/schoolQuest';
import { getRoleInfo } from '../utils/schoolQuestUtils';

interface PlayerCardProps {
  student: Student;
  isMainPlayer?: boolean;
}

export function PlayerCard({ student, isMainPlayer = false }: PlayerCardProps) {
  const roleInfo = getRoleInfo(student.role);
  const IconComponent = roleInfo.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Card className={`bg-black/40 backdrop-blur-sm ${
        isMainPlayer ? 'border-purple-500/50 lg:col-span-2' : 'border-white/20'
      }`}>
        <CardHeader>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className={`${isMainPlayer ? 'w-24 h-24' : 'w-16 h-16'} border-4 border-purple-400`}>
                <AvatarImage src={student.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                  {student.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-2 py-1">
                <span className="text-white text-xs font-medium">Lv.{student.level}</span>
              </div>
            </div>
            
            <div className="flex-1">
              <CardTitle className={`${isMainPlayer ? 'text-2xl' : 'text-lg'} text-white mb-2`}>
                {student.name}
              </CardTitle>
              <div className="flex items-center gap-4 mb-3">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${roleInfo.color}`}>
                  <IconComponent className="w-4 h-4" />
                  <span className="text-white text-sm font-medium">{roleInfo.name}</span>
                </div>
                {isMainPlayer && (
                  <Badge className="bg-yellow-500 text-white">
                    <Crown className="w-3 h-3 mr-1" />
                    파티장
                  </Badge>
                )}
                {!student.isOnline && (
                  <span className="text-xs text-red-400">오프라인</span>
                )}
              </div>
              
              {/* 경험치 바 */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">경험치</span>
                  <span className="text-gray-300">{student.experience} / {student.maxExperience}</span>
                </div>
                <Progress 
                  value={(student.experience / student.maxExperience) * 100} 
                  className="h-3 bg-gray-700"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* HP */}
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-red-300 font-medium">생명력</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white">{student.hp}</span>
                <span className="text-gray-300">/ {student.maxHp}</span>
              </div>
              <Progress value={(student.hp / student.maxHp) * 100} className="h-2 bg-gray-700" />
            </div>
            
            {/* MP */}
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 font-medium">마나</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white">{student.mp}</span>
                <span className="text-gray-300">/ {student.maxMp}</span>
              </div>
              <Progress value={(student.mp / student.maxMp) * 100} className="h-2 bg-gray-700" />
            </div>
          </div>
          
          {/* 성과 통계 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">{student.contributions}</div>
              <div className="text-sm text-gray-300">완료 퀘스트</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400 mb-1">{student.penalties}</div>
              <div className="text-sm text-gray-300">받은 패널티</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                {Math.round((student.contributions / (student.contributions + student.penalties)) * 100)}%
              </div>
              <div className="text-sm text-gray-300">성공률</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}