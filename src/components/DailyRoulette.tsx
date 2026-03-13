import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, Gift, Coins, Star, Trophy, Zap, Heart, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface RouletteReward {
  id: string;
  name: string;
  type: 'coins' | 'gems' | 'xp' | 'item' | 'boost';
  amount?: number;
  icon: React.ReactNode;
  color: string;
  rarity: number; // 1-100, 낮을수록 희귀
}

export function DailyRoulette() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastSpin, setLastSpin] = useState<Date | null>(null);
  const [selectedReward, setSelectedReward] = useState<RouletteReward | null>(null);
  const [rotation, setRotation] = useState(0);
  const rouletteRef = useRef<HTMLDivElement>(null);

  const rewards: RouletteReward[] = [
    {
      id: '1',
      name: '100 코인',
      type: 'coins',
      amount: 100,
      icon: <Coins className="w-6 h-6" />,
      color: 'from-yellow-400 to-yellow-600',
      rarity: 40
    },
    {
      id: '2', 
      name: '경험치 부스터',
      type: 'boost',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-blue-400 to-blue-600',
      rarity: 25
    },
    {
      id: '3',
      name: '5 젬',
      type: 'gems',
      amount: 5,
      icon: <Star className="w-6 h-6" />,
      color: 'from-purple-400 to-purple-600',
      rarity: 30
    },
    {
      id: '4',
      name: '50 XP',
      type: 'xp',
      amount: 50,
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-emerald-400 to-emerald-600',
      rarity: 45
    },
    {
      id: '5',
      name: '레어 아이템',
      type: 'item',
      icon: <Gift className="w-6 h-6" />,
      color: 'from-pink-400 to-pink-600',
      rarity: 15
    },
    {
      id: '6',
      name: '200 코인',
      type: 'coins',
      amount: 200,
      icon: <Coins className="w-6 h-6" />,
      color: 'from-yellow-400 to-yellow-600',
      rarity: 20
    },
    {
      id: '7',
      name: '행운의 하트',
      type: 'boost',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-red-400 to-red-600',
      rarity: 10
    },
    {
      id: '8',
      name: '10 젬',
      type: 'gems',
      amount: 10,
      icon: <Star className="w-6 h-6" />,
      color: 'from-purple-400 to-purple-600',
      rarity: 5
    }
  ];

  const canSpin = () => {
    if (!lastSpin) return true;
    const now = new Date();
    const timeDiff = now.getTime() - lastSpin.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);
    return hoursDiff >= 24;
  };

  const getTimeUntilNextSpin = () => {
    if (!lastSpin) return null;
    const now = new Date();
    const nextSpin = new Date(lastSpin.getTime() + 24 * 60 * 60 * 1000);
    const timeDiff = nextSpin.getTime() - now.getTime();
    
    if (timeDiff <= 0) return null;
    
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}시간 ${minutes}분`;
  };

  const spinRoulette = () => {
    if (!canSpin() || isSpinning) return;
    
    setIsSpinning(true);
    setSelectedReward(null);
    
    // 확률에 따른 보상 선택
    const random = Math.random() * 100;
    let cumulativeRarity = 0;
    let selectedRewardItem = rewards[0];
    
    for (const reward of rewards.sort((a, b) => a.rarity - b.rarity)) {
      cumulativeRarity += reward.rarity;
      if (random <= cumulativeRarity) {
        selectedRewardItem = reward;
        break;
      }
    }
    
    // 선택된 보상의 인덱스 찾기
    const selectedIndex = rewards.findIndex(r => r.id === selectedRewardItem.id);
    const segmentAngle = 360 / rewards.length;
    const targetAngle = (selectedIndex * segmentAngle) + (segmentAngle / 2);
    
    // 여러 바퀴 돌린 후 목표 각도에 정지
    const spins = 5 + Math.random() * 3; // 5-8바퀴
    const finalRotation = rotation + (360 * spins) + (360 - targetAngle);
    
    setRotation(finalRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedReward(selectedRewardItem);
      setLastSpin(new Date());
    }, 3000);
  };

  const segmentAngle = 360 / rewards.length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">일일 행운의 룰렛</h2>
        <p className="text-gray-400">매일 한 번씩 돌려서 특별한 보상을 받으세요!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 룰렛 */}
        <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="relative flex items-center justify-center">
              {/* 룰렛 원반 */}
              <div className="relative w-80 h-80">
                <motion.div
                  ref={rouletteRef}
                  className="w-full h-full rounded-full border-4 border-white/20 shadow-2xl overflow-hidden"
                  animate={{ rotate: rotation }}
                  transition={{ 
                    duration: isSpinning ? 3 : 0,
                    ease: isSpinning ? "easeOut" : "linear"
                  }}
                >
                  {rewards.map((reward, index) => {
                    const angle = index * segmentAngle;
                    return (
                      <div
                        key={reward.id}
                        className={`absolute w-full h-full bg-gradient-to-r ${reward.color}`}
                        style={{
                          clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((angle + segmentAngle) * Math.PI / 180)}% ${50 - 50 * Math.sin((angle + segmentAngle) * Math.PI / 180)}%)`
                        }}
                      >
                        <div 
                          className="absolute flex items-center justify-center text-white"
                          style={{
                            top: '20px',
                            left: '50%',
                            transform: `translateX(-50%) rotate(${angle + segmentAngle/2}deg)`,
                            width: '60px',
                            height: '60px'
                          }}
                        >
                          {reward.icon}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>

                {/* 중앙 포인터 */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-white"></div>
                </div>

                {/* 중앙 버튼 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    onClick={spinRoulette}
                    disabled={!canSpin() || isSpinning}
                    className={`w-20 h-20 rounded-full ${
                      canSpin() && !isSpinning
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                        : 'bg-gray-600 cursor-not-allowed'
                    } shadow-lg`}
                  >
                    <RotateCcw className={`w-8 h-8 ${isSpinning ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
              </div>
            </div>

            {/* 스핀 상태 정보 */}
            <div className="text-center mt-6">
              {!canSpin() && !isSpinning && (
                <p className="text-yellow-400">
                  다음 스핀까지: {getTimeUntilNextSpin()}
                </p>
              )}
              {isSpinning && (
                <p className="text-purple-400 animate-pulse">
                  룰렛이 돌아가고 있습니다...
                </p>
              )}
              {canSpin() && !isSpinning && (
                <p className="text-green-400">
                  룰렛을 돌릴 수 있습니다!
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 보상 목록 & 결과 */}
        <div className="space-y-6">
          {/* 결과 표시 */}
          <AnimatePresence>
            {selectedReward && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <Card className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border-yellow-400/50">
                  <CardHeader>
                    <CardTitle className="text-center text-white flex items-center justify-center gap-2">
                      <Trophy className="w-6 h-6 text-yellow-400" />
                      축하합니다!
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${selectedReward.color} text-white`}>
                      {selectedReward.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{selectedReward.name}</h3>
                      {selectedReward.amount && (
                        <p className="text-gray-300">{selectedReward.amount} 획득!</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 보상 목록 */}
          <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">가능한 보상</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {rewards.map((reward) => (
                <div key={reward.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${reward.color} flex items-center justify-center text-white`}>
                      {reward.icon}
                    </div>
                    <span className="text-white font-medium">{reward.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {reward.rarity}% 확률
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}