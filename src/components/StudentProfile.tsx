import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Star, Trophy, Zap } from 'lucide-react';

interface StudentProfileProps {
  name: string;
  level: number;
  experience: number;
  maxExperience: number;
  avatar: string;
  rank: string;
}

export function StudentProfile({ 
  name, 
  level, 
  experience, 
  maxExperience, 
  avatar, 
  rank 
}: StudentProfileProps) {
  const progressPercentage = (experience / maxExperience) * 100;

  return (
    <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 rounded-2xl p-6 border border-slate-700/50 overflow-hidden backdrop-blur-sm">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl"></div>
      
      <div className="relative z-10 flex items-center gap-6">
        {/* Avatar */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-gradient-to-r from-purple-400 to-pink-500 p-1 shadow-xl">
            <ImageWithFallback 
              src={avatar}
              alt={name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full p-2 shadow-lg">
            <Star className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-white">{name}</h2>
            <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 border-0 shadow-lg">
              <Trophy className="w-3 h-3 mr-1" />
              {rank}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-lg text-purple-400">레벨 {level}</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">경험치</span>
              <span className="text-white">{experience} / {maxExperience} XP</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-3 bg-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}