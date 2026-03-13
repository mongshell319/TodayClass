import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  GraduationCap, 
  Sword, 
  Presentation, 
  Users,
  Brush,
  HandHeart,
  Target,
  BookOpen,
  Link,
  Zap,
  TrendingUp,
  Star,
  Coins
} from 'lucide-react';

interface StatItemProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
}

function StatItem({ label, value, icon }: StatItemProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
      <div className="flex items-center gap-2">
        {icon && <div className="text-gray-400">{icon}</div>}
        <span className="text-gray-300">{label}</span>
      </div>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}

function CircularProgress({ value, label }: { value: number; label: string }) {
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(75, 85, 99, 0.3)"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgb(59, 130, 246)"
            strokeWidth="8"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{value}%</span>
        </div>
      </div>
      <span className="text-gray-300 mt-2">{label}</span>
    </div>
  );
}

export function StudentInfo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl text-white">학생 정보</h2>
        <Badge className="bg-indigo-600 text-white border-0">
          모든 데이터는 카드로트 전반영행정요.
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 성장 현황 */}
        <Card className="p-6 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30">
          <h3 className="text-lg text-white mb-4">성장 현황</h3>
          <p className="text-gray-300 text-sm mb-4">레벨업 정확하고, 코인 흥금을 확인하세요.</p>
          
          <div className="space-y-3">
            <StatItem label="레벨" value="5" icon={<Star className="w-4 h-4" />} />
            <StatItem label="경험치" value="1620" icon={<Zap className="w-4 h-4" />} />
            <StatItem label="코인" value="62" icon={<Coins className="w-4 h-4" />} />
            <StatItem label="사토 포인트" value="5" icon={<Target className="w-4 h-4" />} />
          </div>
          
          <div className="mt-4 p-3 bg-amber-900/30 rounded-lg border border-amber-500/30">
            <p className="text-amber-200 text-sm">최고 레벨로 달성 시 어떤 메타뱃지를 수 있습니다.</p>
          </div>
        </Card>

        {/* 수업 & 도전 */}
        <Card className="p-6 bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/30">
          <h3 className="text-lg text-white mb-4">수업 & 도전</h3>
          <p className="text-gray-300 text-sm mb-4">교실 속 모험을 통해서 성장해도록 실무해세요.</p>
          
          <div className="space-y-3">
            <StatItem label="수업 완주" value="30" icon={<GraduationCap className="w-4 h-4" />} />
            <StatItem label="과제 격파" value="0" icon={<Sword className="w-4 h-4" />} />
            <StatItem label="발표 당번" value="0" icon={<Presentation className="w-4 h-4" />} />
            <StatItem label="팀 레이드" value="0" icon={<Users className="w-4 h-4" />} />
          </div>
        </Card>

        {/* 생활 & 커뮤니티 */}
        <Card className="p-6 bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/30">
          <h3 className="text-lg text-white mb-4">생활 & 커뮤니티</h3>
          <p className="text-gray-300 text-sm mb-4">교실을 돌보는 활동과 채와 수업 참여합니다.</p>
          
          <div className="space-y-3">
            <StatItem label="청소 당번" value="0" icon={<Brush className="w-4 h-4" />} />
            <StatItem label="도움 당번" value="1" icon={<HandHeart className="w-4 h-4" />} />
            <StatItem label="역할 임무" value="1" icon={<Target className="w-4 h-4" />} />
            <StatItem label="독서 당번" value="0" icon={<BookOpen className="w-4 h-4" />} />
            <StatItem label="특목 매칭" value="2" icon={<Link className="w-4 h-4" />} />
          </div>
          
          <div className="mt-4 p-3 bg-orange-900/30 rounded-lg border border-orange-500/30">
            <p className="text-orange-200 text-sm">전체 시즌 5.3, 오늘의 아이템디 테마에 오늘날 연구 실 때타틀을 만날니다.</p>
          </div>
        </Card>

        {/* 학습 인사이트 */}
        <Card className="p-6 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500/30">
          <h3 className="text-lg text-white mb-4">학습 인사이트</h3>
          <p className="text-gray-300 text-sm mb-6">출석률과 활동 점수, 활동 포인트를 한눈에 확인하세요.</p>
          
          <div className="space-y-6">
            {/* 출석률 */}
            <div className="flex justify-center">
              <CircularProgress value={0} label="출석률" />
            </div>
            
            {/* 해금 점수 */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">해금 점수</span>
                <span className="text-white">0점</span>
              </div>
              <Progress value={0} className="h-3 bg-gray-700" />
            </div>
            
            {/* 활동 포인트 */}
            <div className="flex items-center justify-center p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-yellow-400 text-lg font-bold">5</div>
                  <div className="text-yellow-200 text-sm">활동 포인트</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}