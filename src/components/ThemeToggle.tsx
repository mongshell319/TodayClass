import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Palette, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface ThemeOption {
  id: string;
  name: string;
  description: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  icon: React.ReactNode;
}

interface ThemeToggleProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ThemeToggle({ isOpen, onClose }: ThemeToggleProps) {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [seasonalTheme, setSeasonalTheme] = useState('default');

  const themes: ThemeOption[] = [
    {
      id: 'dark',
      name: '다크 모드',
      description: '집중력을 높이는 어두운 테마',
      preview: 'bg-gradient-to-br from-slate-900 to-gray-900',
      colors: {
        primary: 'from-purple-500 to-pink-500',
        secondary: 'from-blue-500 to-cyan-500',
        accent: 'from-emerald-500 to-teal-500'
      },
      icon: <Moon className="w-5 h-5" />
    },
    {
      id: 'light',
      name: '라이트 모드',
      description: '밝고 깔끔한 화이트 테마',
      preview: 'bg-gradient-to-br from-gray-50 to-white',
      colors: {
        primary: 'from-purple-600 to-pink-600',
        secondary: 'from-blue-600 to-cyan-600',
        accent: 'from-emerald-600 to-teal-600'
      },
      icon: <Sun className="w-5 h-5" />
    },
    {
      id: 'cosmic',
      name: '코스믹 모드',
      description: '우주를 테마로 한 신비로운 디자인',
      preview: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900',
      colors: {
        primary: 'from-indigo-400 to-purple-400',
        secondary: 'from-pink-400 to-rose-400',
        accent: 'from-cyan-400 to-blue-400'
      },
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      id: 'nature',
      name: '네이처 모드',
      description: '자연을 닮은 편안한 그린 테마',
      preview: 'bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900',
      colors: {
        primary: 'from-emerald-400 to-teal-400',
        secondary: 'from-green-400 to-lime-400',
        accent: 'from-cyan-400 to-blue-400'
      },
      icon: <Palette className="w-5 h-5" />
    }
  ];

  const seasonalThemes = [
    {
      id: 'default',
      name: '기본',
      description: '기본 테마',
      season: '🎨'
    },
    {
      id: 'spring',
      name: '봄 테마',
      description: '따뜻한 봄의 감성',
      season: '🌸'
    },
    {
      id: 'summer', 
      name: '여름 테마',
      description: '시원한 여름의 활력',
      season: '🌊'
    },
    {
      id: 'autumn',
      name: '가을 테마',
      description: '감성적인 가을의 정취',
      season: '🍂'
    },
    {
      id: 'winter',
      name: '겨울 테마',
      description: '깨끗한 겨울의 순수함',
      season: '❄️'
    }
  ];

  useEffect(() => {
    // 현재 계절에 따른 자동 테마 추천
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) setSeasonalTheme('spring');
    else if (month >= 5 && month <= 7) setSeasonalTheme('summer');
    else if (month >= 8 && month <= 10) setSeasonalTheme('autumn');
    else setSeasonalTheme('winter');
  }, []);

  const applyTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    
    // 실제 테마 적용 로직 (예시)
    const root = document.documentElement;
    const theme = themes.find(t => t.id === themeId);
    
    if (theme) {
      if (themeId === 'light') {
        root.classList.remove('dark');
      } else {
        root.classList.add('dark');
      }
      
      // 커스텀 CSS 변수 설정
      root.style.setProperty('--theme-primary-from', theme.colors.primary.split(' ')[0].replace('from-', ''));
      root.style.setProperty('--theme-primary-to', theme.colors.primary.split(' ')[1].replace('to-', ''));
    }
    
    // 로컬 스토리지에 저장
    localStorage.setItem('school-quest-theme', themeId);
  };

  const applySeasonalTheme = (seasonId: string) => {
    setSeasonalTheme(seasonId);
    localStorage.setItem('school-quest-seasonal-theme', seasonId);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-4 md:inset-auto md:top-20 md:right-4 md:w-[400px] md:max-h-[600px] z-50"
    >
      <Card className="bg-slate-900/95 border-slate-700/50 backdrop-blur-sm">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">테마 설정</h3>
              <p className="text-sm text-gray-400">나만의 스타일로 School Quest를 꾸며보세요</p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </Button>
          </div>

          {/* 기본 테마 */}
          <div>
            <h4 className="font-medium text-white mb-3 flex items-center gap-2">
              <Palette className="w-4 h-4 text-purple-400" />
              기본 테마
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {themes.map((theme) => (
                <motion.div
                  key={theme.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => applyTheme(theme.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${
                    currentTheme === theme.id 
                      ? 'border-purple-500 bg-purple-500/10' 
                      : 'border-slate-600/50 bg-slate-800/30 hover:border-purple-500/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg ${theme.preview} flex items-center justify-center text-white shadow-lg`}>
                      {theme.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-medium text-white">{theme.name}</h5>
                        {currentTheme === theme.id && (
                          <Badge className="bg-purple-500 text-white border-0 text-xs">
                            적용중
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{theme.description}</p>
                    </div>
                  </div>
                  
                  {/* 색상 프리뷰 */}
                  <div className="flex gap-2 mt-3">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${theme.colors.primary} shadow-sm`}></div>
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${theme.colors.secondary} shadow-sm`}></div>
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${theme.colors.accent} shadow-sm`}></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 시즌별 테마 */}
          <div>
            <h4 className="font-medium text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              시즌별 테마
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-xs">
                특별 에디션
              </Badge>
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {seasonalThemes.map((seasonal) => (
                <motion.div
                  key={seasonal.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => applySeasonalTheme(seasonal.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-all text-center border ${
                    seasonalTheme === seasonal.id
                      ? 'border-yellow-500 bg-yellow-500/10'
                      : 'border-slate-600/50 bg-slate-800/30 hover:border-yellow-500/50'
                  }`}
                >
                  <div className="text-2xl mb-1">{seasonal.season}</div>
                  <div className="text-sm font-medium text-white">{seasonal.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{seasonal.description}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 미리보기 */}
          <div className="p-4 bg-slate-800/30 rounded-xl">
            <h4 className="font-medium text-white mb-3">미리보기</h4>
            <div className="space-y-2">
              <div className={`h-3 rounded-full bg-gradient-to-r ${themes.find(t => t.id === currentTheme)?.colors.primary}`}></div>
              <div className={`h-2 rounded-full bg-gradient-to-r ${themes.find(t => t.id === currentTheme)?.colors.secondary} w-3/4`}></div>
              <div className={`h-2 rounded-full bg-gradient-to-r ${themes.find(t => t.id === currentTheme)?.colors.accent} w-1/2`}></div>
            </div>
          </div>

          {/* 적용 버튼 */}
          <div className="flex gap-2">
            <Button 
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              적용하기
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setCurrentTheme('dark');
                setSeasonalTheme('default');
                applyTheme('dark');
                applySeasonalTheme('default');
              }}
              className="border-slate-600/50 text-gray-300 hover:bg-slate-700/50"
            >
              초기화
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}