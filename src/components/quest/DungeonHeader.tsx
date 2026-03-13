import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Gamepad2, Skull, Clock, Target, Users } from 'lucide-react';
import { motion } from 'motion/react';
import type { Dungeon, Student } from '../types/schoolQuest';
import { getDifficultyColor, getDifficultyText } from '../utils/schoolQuestUtils';

interface DungeonHeaderProps {
  dungeon: Dungeon;
  partyMembers: Student[];
}

export function DungeonHeader({ dungeon, partyMembers }: DungeonHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Card className="bg-black/40 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Gamepad2 className="w-6 h-6 text-purple-400" />
                {dungeon.subject} - {dungeon.chapter}
              </CardTitle>
              <CardDescription className="text-gray-300 mt-1">
                {dungeon.title}
              </CardDescription>
            </div>
            <Badge className={`${getDifficultyColor(dungeon.difficulty)} text-white`}>
              {getDifficultyText(dungeon.difficulty)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          {/* 보스 HP */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <Skull className="w-5 h-5 text-red-400" />
                최종 보스: {dungeon.title} 마왕
              </h3>
              <span className="text-sm text-gray-300">
                {dungeon.bossHp} / {dungeon.maxBossHp} HP
              </span>
            </div>
            <Progress 
              value={(dungeon.bossHp / dungeon.maxBossHp) * 100} 
              className="h-6 bg-gray-700"
            />
          </div>

          {/* 던전 진행 상황 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 text-white mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">남은 시간</span>
              </div>
              <div className="text-2xl font-bold text-yellow-400">
                {Math.floor(dungeon.timeRemaining)}분
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 text-white mb-2">
                <Target className="w-4 h-4" />
                <span className="text-sm">퀘스트 진행</span>
              </div>
              <div className="text-2xl font-bold text-green-400">
                {dungeon.questsCompleted}/{dungeon.totalQuests}
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 text-white mb-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">파티원</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">
                {partyMembers.filter(m => m.isOnline).length + 1}/{partyMembers.length + 1}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}