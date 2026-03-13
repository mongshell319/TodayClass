import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Trophy, Star, Target, BookOpen, School, Users } from 'lucide-react';
import { motion } from 'motion/react';
import type { StudentProfile } from '../types/questTypes';

interface StudentProfileCardProps {
  profile: StudentProfile;
}

export function StudentProfileCard({ profile }: StudentProfileCardProps) {
  const completionRate = Math.round((profile.completedQuests / profile.totalQuests) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <Card className="bg-gradient-to-br from-rose-600/50 via-purple-600/40 via-blue-600/40 to-cyan-600/50 border border-white/30 backdrop-blur-sm shadow-2xl shadow-purple-500/20">
        <CardHeader>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-purple-400">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-4xl">
                  {profile.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full px-3 py-1">
                <span className="text-white font-bold">Lv.{profile.level}</span>
              </div>
            </div>
            
            <div className="flex-1">
              <CardTitle className="text-3xl text-white mb-2">{profile.name}</CardTitle>
              <div className="flex items-center gap-4 mb-3">
                <Badge className="bg-blue-500 text-white px-3 py-1">
                  {profile.class}
                </Badge>
                <Badge className="bg-gray-600 text-white px-3 py-1">
                  학번: {profile.studentId}
                </Badge>
              </div>
              
              {/* 경험치 바 */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">경험치</span>
                  <span className="text-gray-300">{profile.experience} / {profile.maxExperience}</span>
                </div>
                <Progress 
                  value={(profile.experience / profile.maxExperience) * 100} 
                  className="h-4 bg-gray-700"
                />
              </div>

              {/* 성과 통계 */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-green-400 mb-1">{profile.completedQuests}</div>
                  <div className="text-sm text-gray-300">완료한 퀘스트</div>
                </div>
                <div className="text-center bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">{completionRate}%</div>
                  <div className="text-sm text-gray-300">완료율</div>
                </div>
                <div className="text-center bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-purple-400 mb-1">{profile.achievements.length}</div>
                  <div className="text-sm text-gray-300">업적</div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* 카테고리별 통계 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-cyan-600/40 to-blue-600/30 border border-cyan-400/50 rounded-lg p-4 shadow-lg shadow-cyan-500/20">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-5 h-5 text-cyan-300" />
                <h4 className="text-white font-medium">수업 퀘스트</h4>
              </div>
              <div className="text-2xl font-bold text-cyan-300 mb-1">{profile.stats.classQuests}</div>
              <div className="text-sm text-cyan-100">완료</div>
            </div>

            <div className="bg-gradient-to-br from-emerald-600/40 to-green-600/30 border border-emerald-400/50 rounded-lg p-4 shadow-lg shadow-emerald-500/20">
              <div className="flex items-center gap-3 mb-2">
                <School className="w-5 h-5 text-emerald-300" />
                <h4 className="text-white font-medium">학교 퀘스트</h4>
              </div>
              <div className="text-2xl font-bold text-emerald-300 mb-1">{profile.stats.schoolQuests}</div>
              <div className="text-sm text-emerald-100">완료</div>
            </div>

            <div className="bg-gradient-to-br from-pink-600/40 to-purple-600/30 border border-pink-400/50 rounded-lg p-4 shadow-lg shadow-pink-500/20">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-pink-300" />
                <h4 className="text-white font-medium">공부 레이드</h4>
              </div>
              <div className="text-2xl font-bold text-pink-300 mb-1">{profile.stats.studyRaids}</div>
              <div className="text-sm text-pink-100">참여</div>
            </div>
          </div>

          {/* 최근 업적 */}
          <div>
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              최근 업적
            </h4>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {profile.achievements.slice(0, 5).map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex-shrink-0 bg-gradient-to-br from-yellow-600/40 to-orange-600/30 border border-yellow-400/50 rounded-lg p-3 min-w-[200px] shadow-lg shadow-yellow-500/20"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-white font-medium text-sm">{achievement.title}</span>
                  </div>
                  <p className="text-gray-300 text-xs">{achievement.description}</p>
                </div>
              ))}
              {profile.achievements.length === 0 && (
                <div className="text-gray-400 text-sm">아직 획득한 업적이 없습니다.</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}