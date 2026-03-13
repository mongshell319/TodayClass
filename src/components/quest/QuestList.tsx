import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { motion } from 'motion/react';
import type { Quest } from '../types/schoolQuest';
import { getQuestIcon, getRoleInfo, getDifficultyColor, formatTime } from '../utils/schoolQuestUtils';

interface QuestListProps {
  quests: Quest[];
  onQuestClick: (quest: Quest) => void;
  title: string;
  emptyMessage?: string;
}

export function QuestList({ quests, onQuestClick, title, emptyMessage = "현재 진행 중인 퀘스트가 없습니다." }: QuestListProps) {
  return (
    <Card className="bg-black/40 border-white/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {quests.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            {emptyMessage}
          </div>
        ) : (
          quests.map((quest) => {
            const IconComponent = getQuestIcon(quest.type);
            
            return (
              <motion.div
                key={quest.id}
                className="bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors"
                onClick={() => onQuestClick(quest)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4 text-purple-400" />
                    <h4 className="text-white font-medium">{quest.title}</h4>
                  </div>
                  <Badge className={`${getDifficultyColor(quest.difficulty)} text-white`}>
                    {quest.points}P
                  </Badge>
                </div>
                
                <p className="text-gray-300 text-sm mb-3">{quest.description}</p>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {quest.assignedRole && (
                      <div className="flex items-center gap-1">
                        <div className={`w-3 h-3 rounded-full ${getRoleInfo(quest.assignedRole).color}`}></div>
                        <span className="text-xs text-gray-400">{getRoleInfo(quest.assignedRole).name}</span>
                      </div>
                    )}
                  </div>
                  {quest.isActive && (
                    <div className="text-xs text-gray-400">
                      {formatTime(quest.timeRemaining)}
                    </div>
                  )}
                </div>

                {quest.isActive && (
                  <Progress 
                    value={(quest.timeRemaining / quest.timeLimit) * 100} 
                    className="h-2 mt-2" 
                  />
                )}
              </motion.div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}