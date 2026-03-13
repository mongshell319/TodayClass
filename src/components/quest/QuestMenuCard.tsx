import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import type { QuestCategory } from '../types/questTypes';

interface QuestMenuCardProps {
  category: QuestCategory;
  title: string;
  description: string;
  icon: React.ReactNode;
  stats: {
    active: number;
    completed: number;
  };
  gradient: string;
  onClick: () => void;
}

export function QuestMenuCard({ 
  category, 
  title, 
  description, 
  icon, 
  stats, 
  gradient, 
  onClick 
}: QuestMenuCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className={`${gradient} border-white/30 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-white/60 hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-105`}
        onClick={onClick}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-lg">
                {icon}
              </div>
              <div>
                <CardTitle className="text-white text-xl">{title}</CardTitle>
                <p className="text-gray-300 text-sm mt-1">{description}</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-white/60" />
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{stats.active}</div>
                <div className="text-xs text-gray-300">진행중</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{stats.completed}</div>
                <div className="text-xs text-gray-300">완료</div>
              </div>
            </div>

            <Button 
              variant="outline" 
              size="sm"
              className="border-white/40 text-white hover:bg-white/20 hover:border-white/60 shadow-lg backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              시작하기
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}