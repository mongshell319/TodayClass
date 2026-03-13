import { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Coins, Star, Crown, Palette, Zap, Shield, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'coins' | 'gems';
  category: 'avatar' | 'effects' | 'powerups' | 'backgrounds';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: React.ReactNode;
  preview?: string;
  owned: boolean;
}

export function ItemShop() {
  const [selectedCategory, setSelectedCategory] = useState('avatar');
  const [userCurrency] = useState({ coins: 1250, gems: 45 });

  const shopItems: ShopItem[] = [
    // 아바타 아이템
    {
      id: '1',
      name: '마법사 모자',
      description: '지혜를 상징하는 특별한 마법사 모자입니다.',
      price: 500,
      currency: 'coins',
      category: 'avatar',
      rarity: 'rare',
      icon: <Crown className="w-6 h-6" />,
      owned: false
    },
    {
      id: '2',
      name: '레인보우 헤어',
      description: '무지개색으로 빛나는 특별한 헤어스타일입니다.',
      price: 15,
      currency: 'gems',
      category: 'avatar',
      rarity: 'epic',
      icon: <Palette className="w-6 h-6" />,
      owned: false
    },
    {
      id: '3',
      name: '현자의 안경',
      description: '학습 효율을 높여주는 신비한 안경입니다.',
      price: 300,
      currency: 'coins',
      category: 'avatar',
      rarity: 'common',
      icon: <Sparkles className="w-6 h-6" />,
      owned: true
    },

    // 이펙트 아이템
    {
      id: '4',
      name: '경험치 불꽃',
      description: '레벨업시 화려한 불꽃 이펙트가 나타납니다.',
      price: 800,
      currency: 'coins',
      category: 'effects',
      rarity: 'epic',
      icon: <Zap className="w-6 h-6" />,
      owned: false
    },
    {
      id: '5',
      name: '승리의 별빛',
      description: '퀘스트 완료시 별빛이 쏟아지는 이펙트입니다.',
      price: 25,
      currency: 'gems',
      category: 'effects',
      rarity: 'legendary',
      icon: <Star className="w-6 h-6" />,
      owned: false
    },

    // 파워업 아이템
    {
      id: '6',
      name: '경험치 부스터',
      description: '24시간 동안 경험치 획득량이 50% 증가합니다.',
      price: 200,
      currency: 'coins',
      category: 'powerups',
      rarity: 'common',
      icon: <Zap className="w-6 h-6" />,
      owned: false
    },
    {
      id: '7',
      name: '행운의 부적',
      description: '12시간 동안 보상 획득 확률이 두 배가 됩니다.',
      price: 10,
      currency: 'gems',
      category: 'powerups',
      rarity: 'rare',
      icon: <Shield className="w-6 h-6" />,
      owned: false
    },

    // 배경 아이템
    {
      id: '8',
      name: '우주 테마',
      description: '신비로운 우주를 배경으로 한 특별 테마입니다.',
      price: 30,
      currency: 'gems',
      category: 'backgrounds',
      rarity: 'legendary',
      icon: <Sparkles className="w-6 h-6" />,
      owned: false
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-400 bg-gray-400/10';
      case 'rare': return 'border-blue-400 bg-blue-400/10';
      case 'epic': return 'border-purple-400 bg-purple-400/10';
      case 'legendary': return 'border-yellow-400 bg-yellow-400/10';
      default: return 'border-gray-400 bg-gray-400/10';
    }
  };

  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case 'common': return '일반';
      case 'rare': return '레어';
      case 'epic': return '에픽';
      case 'legendary': return '전설';
      default: return '일반';
    }
  };

  const filteredItems = shopItems.filter(item => item.category === selectedCategory);

  const canAfford = (item: ShopItem) => {
    return userCurrency[item.currency] >= item.price;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">아이템 상점</h2>
          <p className="text-gray-400">코인과 젬으로 특별한 아이템을 구매하세요</p>
        </div>
        
        {/* 보유 화폐 */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-800/60 px-4 py-2 rounded-xl">
            <Coins className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-medium">{userCurrency.coins.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/60 px-4 py-2 rounded-xl">
            <Star className="w-5 h-5 text-purple-400" />
            <span className="text-white font-medium">{userCurrency.gems}</span>
          </div>
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/60 border-slate-600/50">
          <TabsTrigger value="avatar" className="data-[state=active]:bg-purple-500">
            아바타
          </TabsTrigger>
          <TabsTrigger value="effects" className="data-[state=active]:bg-purple-500">
            이펙트
          </TabsTrigger>
          <TabsTrigger value="powerups" className="data-[state=active]:bg-purple-500">
            파워업
          </TabsTrigger>
          <TabsTrigger value="backgrounds" className="data-[state=active]:bg-purple-500">
            배경
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className={`bg-slate-800/60 border-2 ${getRarityColor(item.rarity)} backdrop-blur-sm relative overflow-hidden`}>
                  {/* 소유 여부 표시 */}
                  {item.owned && (
                    <div className="absolute top-2 right-2 z-10">
                      <Badge className="bg-green-500 text-white border-0">
                        소유중
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-white/10">
                      <div className="text-white">
                        {item.icon}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <h3 className="font-bold text-white mb-1">{item.name}</h3>
                      <Badge className={`${getRarityColor(item.rarity)} border text-xs`}>
                        {getRarityText(item.rarity)}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-300 text-center leading-relaxed">
                      {item.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2">
                        {item.currency === 'coins' ? (
                          <Coins className="w-4 h-4 text-yellow-400" />
                        ) : (
                          <Star className="w-4 h-4 text-purple-400" />
                        )}
                        <span className="font-bold text-white">{item.price.toLocaleString()}</span>
                      </div>

                      <Button
                        className={`w-full ${
                          item.owned
                            ? 'bg-gray-600 hover:bg-gray-600 cursor-not-allowed'
                            : canAfford(item)
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                            : 'bg-gray-600 hover:bg-gray-600 cursor-not-allowed'
                        }`}
                        disabled={item.owned || !canAfford(item)}
                      >
                        {item.owned ? (
                          '이미 소유중'
                        ) : canAfford(item) ? (
                          <>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            구매하기
                          </>
                        ) : (
                          '화폐 부족'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}