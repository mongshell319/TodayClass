import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Logo } from './Logo';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  BookOpen, 
  Users, 
  Gamepad2, 
  BarChart3, 
  Sparkles, 
  ArrowRight,
  Brain,
  Target,
  Clock,
  MessageCircle
} from 'lucide-react';

interface HomePageProps {
  onNavigateToSchoolQuest: () => void;
}

export function HomePage({ onNavigateToSchoolQuest }: HomePageProps) {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI 개인화 학습",
      description: "각 학생의 학습 패턴을 분석하여 맞춤형 학습 경로를 제공합니다."
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "게임화된 학습",
      description: "퀘스트, 레벨업, 성취 배지 시스템으로 학습 동기를 높입니다."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "실시간 분석",
      description: "학습 진도와 성과를 실시간으로 추적하고 분석합니다."
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "AI 튜터링",
      description: "24시간 언제든지 질문하고 도움을 받을 수 있는 AI 튜터입니다."
    }
  ];

  const modules = [
    {
      title: "School Quest",
      description: "게임화된 학습 대시보드",
      image: "https://images.unsplash.com/photo-1520569495996-b5e1219cb625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzU5MTM4ODA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "인기",
      badgeColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      onClick: onNavigateToSchoolQuest
    },
    {
      title: "AI 튜터",
      description: "개인 맞춤 학습 지원",
      image: "https://images.unsplash.com/photo-1758685733907-42e9651721f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwaGVscGluZyUyMHN0dWRlbnR8ZW58MXx8fHwxNzU5MTIyMjk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "새로움",
      badgeColor: "bg-gradient-to-r from-emerald-500 to-teal-500"
    },
    {
      title: "스마트 클래스",
      description: "지능형 교실 관리",
      image: "https://images.unsplash.com/photo-1690079374922-7f50d5c1a102?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjbGFzc3Jvb20lMjBBSSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU5MTM4ODAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "출시 예정",
      badgeColor: "bg-gradient-to-r from-blue-500 to-cyan-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation */}
      <nav className="border-b border-slate-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo size="md" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  오늘의 수업
                </h1>
                <p className="text-sm text-slate-500">AI 보조교사 서비스</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-emerald-200">
                <Sparkles className="w-3 h-3 mr-1" />
                Beta 서비스
              </Badge>
              <Button variant="outline" size="sm">
                로그인
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.1)_1px,transparent_0)] bg-[length:24px_24px]"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 px-4 py-2 rounded-full border border-purple-200 mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI 기반 개인화 학습 플랫폼</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent">
              학습이 즐거워지는
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI 교육 혁명
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            개인 맞춤형 AI 튜터와 게임화된 학습 시스템으로 
            모든 학생이 자신만의 속도로 성장할 수 있도록 돕습니다.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              onClick={onNavigateToSchoolQuest}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Gamepad2 className="w-5 h-5 mr-2" />
              School Quest 체험하기
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 rounded-xl"
            >
              <Clock className="w-5 h-5 mr-2" />
              데모 영상 보기
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                10,000+
              </div>
              <p className="text-slate-600">활성 학습자</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                95%
              </div>
              <p className="text-slate-600">학습 만족도</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                24/7
              </div>
              <p className="text-slate-600">AI 튜터 지원</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              핵심 기능
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              AI 기술과 교육 전문성이 만나 만들어낸 혁신적인 학습 경험
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-200 group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform duration-200">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-slate-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              학습 모듈
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              다양한 학습 스타일과 목표에 맞는 특화된 모듈들
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 group overflow-hidden cursor-pointer"
                onClick={module.onClick}
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={module.image}
                    alt={module.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${module.badgeColor} text-white border-0 shadow-lg`}>
                      {module.badge}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {module.title}
                    {module.onClick && (
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-200" />
                    )}
                  </CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            지금 바로 시작해보세요
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            AI와 함께하는 새로운 학습 여정을 경험해보세요
          </p>
          <Button 
            size="lg"
            onClick={onNavigateToSchoolQuest}
            className="bg-white text-purple-700 hover:bg-slate-50 px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Target className="w-5 h-5 mr-2" />
            무료로 시작하기
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Logo size="sm" />
              <div>
                <h3 className="font-bold">오늘의 수업</h3>
                <p className="text-sm text-slate-400">AI 보조교사 서비스</p>
              </div>
            </div>
            <div className="text-sm text-slate-400">
              © 2024 오늘의 수업. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}