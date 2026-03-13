import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Gamepad2, Users, Target, Trophy } from 'lucide-react';

interface QuickActionsProps {
  onTabChange: (tab: string) => void;
}

export function QuickActions({ onTabChange }: QuickActionsProps) {
  return (
    <Card className="bg-black/40 border-white/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">빠른 액션</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          onClick={() => onTabChange('dungeon')}
        >
          <Gamepad2 className="w-4 h-4 mr-2" />
          던전 입장
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
          onClick={() => onTabChange('party')}
        >
          <Users className="w-4 h-4 mr-2" />
          파티 관리
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full border-green-500/50 text-green-400 hover:bg-green-500/10"
          onClick={() => onTabChange('quests')}
        >
          <Target className="w-4 h-4 mr-2" />
          진행 중인 퀘스트
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
          onClick={() => onTabChange('stats')}
        >
          <Trophy className="w-4 h-4 mr-2" />
          통계 보기
        </Button>
      </CardContent>
    </Card>
  );
}