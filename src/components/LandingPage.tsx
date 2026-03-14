import { useState, useEffect } from 'react';
import { MusicPlayer } from './MusicPlayer';
import {
  BookOpen,
  Users,
  Gamepad2,
  Heart,
  Sparkles,
  ArrowRight,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Thermometer,
  Send,
  Plane,
  X,
  Calendar,
  GraduationCap,
  AlertTriangle,
  Star,
  Coffee,
  Smile
} from 'lucide-react';

interface LandingPageProps {
  onNavigateToTeacherDashboard: () => void;
  onNavigateToSchoolQuest: () => void;
  onNavigateToSchoolLife: () => void;
  onNavigateToStudentRecord: () => void;
}

export function LandingPage({ onNavigateToTeacherDashboard, onNavigateToSchoolQuest, onNavigateToSchoolLife, onNavigateToStudentRecord }: LandingPageProps) {
  const encouragementMessages = [
    "오늘도 아이들을 위해 수고하시는 선생님께 감사합니다! 💕",
    "선생님의 열정이 아이들의 미래를 밝혀줍니다 ✨",
    "힘든 하루였지만 선생님 덕분에 아이들이 웃고 있어요 😊",
    "교육에 대한 선생님의 사랑을 느낄 수 있습니다 ❤️",
    "선생님이 계시기에 우리 아이들이 행복합니다 🌟",
    "매일 새로운 것을 가르쳐주시는 선생님께 박수를! 👏",
    "선생님의 따뜻한 마음이 교실을 빛내고 있어요 🌈",
    "늘 학생들을 먼저 생각하시는 선생님이 존경스럽습니다 🙏",
    "선생님 덕분에 오늘도 배움의 즐거움을 느껴요 📚",
    "힘내세요! 선생님을 응원하는 마음들이 가득해요 💪"
  ];

  const [flyingMessages, setFlyingMessages] = useState<Array<{
    id: number;
    message: string;
    isVisible: boolean;
    showMessage: boolean;
    author?: string;
  }>>([]);
  const [messageIdCounter, setMessageIdCounter] = useState(0);
  const [customMessages, setCustomMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showSentMessage, setShowSentMessage] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timeoutIds: ReturnType<typeof setTimeout>[] = [];

    const createFlyingMessage = () => {
      if (flyingMessages.length > 0) return;
      const allMessages = [...encouragementMessages, ...customMessages];
      const randomMessage = allMessages[Math.floor(Math.random() * allMessages.length)];
      const newMessage = {
        id: messageIdCounter,
        message: randomMessage,
        isVisible: true,
        showMessage: false,
        author: customMessages.includes(randomMessage) ? '다른 선생님' : '익명의 선생님'
      };
      setFlyingMessages([newMessage]);
      setMessageIdCounter(prev => prev + 1);
      const removeId = setTimeout(() => setFlyingMessages([]), 10000);
      timeoutIds.push(removeId);
    };

    const scheduleNext = () => {
      const randomInterval = Math.random() * 10000 + 15000;
      const id = setTimeout(() => {
        createFlyingMessage();
        scheduleNext();
      }, randomInterval);
      timeoutIds.push(id);
    };

    const initialId = setTimeout(() => {
      createFlyingMessage();
      scheduleNext();
    }, 5000);
    timeoutIds.push(initialId);

    return () => timeoutIds.forEach(clearTimeout);
  }, [messageIdCounter, customMessages]);

  const toggleMessageVisibility = (id: number) => {
    setFlyingMessages(prev =>
      prev.map(msg => msg.id === id ? { ...msg, showMessage: !msg.showMessage } : msg)
    );
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setCustomMessages(prev => [...prev, inputMessage.trim()]);
      setInputMessage('');
      setShowSentMessage(true);
      setTimeout(() => setShowSentMessage(false), 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const getWeatherInfo = () => {
    const mockWeatherData = [
      { condition: "맑음", temp: 23, icon: <Sun className="w-6 h-6 text-amber-400" />, bg: "from-amber-100 to-yellow-100", text: "text-amber-600" },
      { condition: "흐림", temp: 18, icon: <Cloud className="w-6 h-6 text-slate-400" />, bg: "from-slate-100 to-gray-100", text: "text-slate-500" },
      { condition: "비", temp: 15, icon: <CloudRain className="w-6 h-6 text-blue-400" />, bg: "from-blue-100 to-sky-100", text: "text-blue-500" },
      { condition: "눈", temp: -2, icon: <CloudSnow className="w-6 h-6 text-sky-300" />, bg: "from-sky-100 to-blue-100", text: "text-sky-500" },
    ];
    const index = Math.floor(new Date().getHours() / 6) % mockWeatherData.length;
    return mockWeatherData[index];
  };

  const weather = getWeatherInfo();

  const serviceCards = [
    {
      icon: <Users className="w-8 h-8" />,
      emoji: '🏫',
      title: '선생님 워크스페이스',
      description: '업무 일정 관리, 메모 작성,\n학생 정보 관리를 한 곳에서',
      buttonLabel: '워크스페이스 열기',
      onClick: onNavigateToTeacherDashboard,
      from: 'from-sky-200',
      to: 'to-blue-300',
      iconBg: 'bg-sky-100',
      iconColor: 'text-sky-500',
      btnColor: 'bg-sky-400 hover:bg-sky-500',
      border: 'border-sky-200',
      shadow: 'shadow-sky-200',
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      emoji: '🎮',
      title: 'School Quest',
      description: '학생들을 위한 게임화된 학습 시스템\n길드, 퀘스트, 랭킹으로 동기부여 UP!',
      buttonLabel: '퀘스트 관리하기',
      onClick: onNavigateToSchoolQuest,
      from: 'from-violet-200',
      to: 'to-purple-300',
      iconBg: 'bg-violet-100',
      iconColor: 'text-violet-500',
      btnColor: 'bg-violet-400 hover:bg-violet-500',
      border: 'border-violet-200',
      shadow: 'shadow-violet-200',
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      emoji: '📅',
      title: '학교 생활',
      description: '조 편성, 투표, 타이머, 회의 기록\n학급 운영에 필요한 도구들',
      buttonLabel: '학급 도구 사용하기',
      onClick: onNavigateToSchoolLife,
      from: 'from-emerald-200',
      to: 'to-green-300',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-500',
      btnColor: 'bg-emerald-400 hover:bg-emerald-500',
      border: 'border-emerald-200',
      shadow: 'shadow-emerald-200',
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      emoji: '📝',
      title: '생활기록부',
      description: 'AI 도움으로 생활기록부 작성\n학생별 활동 기록 체계적 관리',
      buttonLabel: '생활기록부 작성하기',
      onClick: onNavigateToStudentRecord,
      from: 'from-rose-200',
      to: 'to-pink-300',
      iconBg: 'bg-rose-100',
      iconColor: 'text-rose-500',
      btnColor: 'bg-rose-400 hover:bg-rose-500',
      border: 'border-rose-200',
      shadow: 'shadow-rose-200',
    },
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FFF5F7 0%, #FFF0FB 25%, #F5F0FF 50%, #F0F5FF 75%, #F0FFF5 100%)' }}
    >
      {/* 배경 동글동글 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, #FFB3C6, transparent)' }} />
        <div className="absolute -top-10 right-1/4 w-60 h-60 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #C4B5FD, transparent)' }} />
        <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full opacity-25" style={{ background: 'radial-gradient(circle, #BAE6FD, transparent)' }} />
        <div className="absolute bottom-1/4 -left-16 w-72 h-72 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #BBF7D0, transparent)' }} />
        <div className="absolute -bottom-20 right-1/3 w-80 h-80 rounded-full opacity-25" style={{ background: 'radial-gradient(circle, #FDE68A, transparent)' }} />
        {/* 작은 별 장식 */}
        {['top-16 left-1/4', 'top-32 right-1/3', 'bottom-1/3 left-1/5', 'bottom-20 right-1/4', 'top-1/2 left-1/2'].map((pos, i) => (
          <div key={i} className={`absolute ${pos} text-yellow-300 opacity-60`} style={{ fontSize: '20px', animation: `pulse ${2 + i * 0.5}s infinite` }}>
            ✦
          </div>
        ))}
      </div>

      {/* 비행기 메시지 */}
      {flyingMessages.map((msgData) => (
        <div
          key={msgData.id}
          className={`fixed top-4 right-4 z-50 transition-all duration-1000 ${msgData.isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <div className="relative">
            <div
              className="bg-gradient-to-br from-pink-400 to-rose-400 rounded-full p-3 shadow-xl cursor-pointer hover:scale-110 transition-transform duration-300 shadow-pink-200"
              onClick={() => toggleMessageVisibility(msgData.id)}
            >
              <Plane className="w-5 h-5 text-white transform rotate-45" />
            </div>
            {msgData.showMessage && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl p-4 shadow-xl border-2 border-pink-100">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-400" />
                    <span className="text-sm font-bold text-pink-500">응원 메시지</span>
                  </div>
                  <button onClick={() => toggleMessageVisibility(msgData.id)} className="text-gray-300 hover:text-gray-500">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">{msgData.message}</p>
                <div className="mt-2 text-right">
                  <span className="text-xs text-gray-400">{msgData.author}께서 💌</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* 헤더 */}
      <header className="relative z-10 px-6 pt-8 pb-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* 로고 영역 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-violet-400 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-200">
              <span className="text-white text-lg">🌸</span>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-700" style={{ fontFamily: "'Noto Serif KR', serif" }}>오늘의 수업</span>
              <div className="text-xs text-gray-400">선생님을 위한 스마트 교실</div>
            </div>
          </div>

          {/* 날씨 + 시간 */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 bg-gradient-to-r ${weather.bg} rounded-full px-4 py-2 shadow-sm border border-white`}>
              {weather.icon}
              <span className={`font-medium text-sm ${weather.text}`}>{weather.condition}</span>
              <div className={`flex items-center gap-1 ${weather.text}`}>
                <Thermometer className="w-3 h-3" />
                <span className="text-sm font-bold">{weather.temp}°</span>
              </div>
            </div>
            <div className="bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100 text-sm text-gray-500">
              {currentTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-8">

        {/* 히어로 섹션 */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/80 rounded-full px-5 py-2 mb-5 shadow-sm border border-pink-100">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-gray-500" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>항상 좋은 수업을 위해 노력하시는 선생님들을 응원합니다</span>
            <Heart className="w-4 h-4 text-pink-400" />
          </div>

          <h1
            className="text-6xl font-bold mb-4"
            style={{
              fontFamily: "'Noto Serif KR', serif",
              background: 'linear-gradient(135deg, #F472B6, #A78BFA, #60A5FA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            오늘의 수업
          </h1>

          <p className="text-gray-400 text-lg mb-8" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
            {currentTime.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
          </p>

          {/* 응원 메시지 입력 */}
          <div className="max-w-xl mx-auto">
            <div className="flex items-center bg-white rounded-2xl px-5 py-3 shadow-md border-2 border-pink-100 focus-within:border-pink-300 transition-colors">
              <Coffee className="w-5 h-5 text-pink-300 mr-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="다른 선생님께 응원 메시지를 보내보세요 ☕"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent text-gray-600 placeholder-gray-300 text-sm outline-none"
                style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
              />
              <button
                onClick={handleSendMessage}
                className="ml-3 w-8 h-8 bg-gradient-to-br from-pink-400 to-violet-400 rounded-xl flex items-center justify-center hover:scale-105 transition-transform shadow-md shadow-pink-200"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
            {showSentMessage && (
              <div className="mt-3 p-3 bg-green-50 border border-green-100 rounded-xl">
                <p className="text-green-500 text-sm text-center" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
                  💌 따뜻한 응원 메시지가 전송되었어요!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 서비스 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {serviceCards.map((card, idx) => (
            <div
              key={idx}
              onClick={card.onClick}
              className={`group cursor-pointer bg-white rounded-3xl p-6 border-2 ${card.border} shadow-lg ${card.shadow} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-start gap-4">
                {/* 아이콘 */}
                <div className={`w-16 h-16 ${card.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <span className={card.iconColor}>{card.icon}</span>
                </div>

                {/* 텍스트 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{card.emoji}</span>
                    <h3 className="text-lg font-bold text-gray-700" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 whitespace-pre-line" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
                    {card.description}
                  </p>
                  <button
                    className={`flex items-center gap-2 ${card.btnColor} text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors shadow-sm`}
                    onClick={(e) => { e.stopPropagation(); card.onClick(); }}
                  >
                    {card.buttonLabel}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 오늘의 명언 */}
        <div className="bg-white rounded-3xl p-6 border-2 border-amber-100 shadow-lg shadow-amber-100 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-400" />
            </div>
            <h4 className="font-bold text-gray-600" style={{ fontFamily: "'Noto Serif KR', serif" }}>오늘의 명언</h4>
          </div>
          <p className="text-gray-600 leading-relaxed text-base" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
            "교육은 세상을 바꿀 수 있는 가장 강력한 무기이다."
          </p>
          <p className="text-amber-400 text-sm mt-1" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>— 넬슨 만델라</p>
        </div>

        {/* 음악 플레이어 */}
        <MusicPlayer />

        {/* 데이터 저장 안내 */}
        <div className="mt-6 bg-amber-50 rounded-3xl p-5 border-2 border-amber-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <h4 className="font-bold text-amber-700 mb-1 text-sm" style={{ fontFamily: "'Noto Serif KR', serif" }}>💾 데이터 저장 안내</h4>
              <p className="text-amber-600 text-xs leading-relaxed" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
                <strong>School Quest</strong>를 제외한 모든 서비스의 데이터는 현재 브라우저에만 저장됩니다.
                다른 기기에서 접속하거나 브라우저 데이터를 삭제하면 내용이 사라질 수 있으니 중요한 데이터는 별도로 백업해 주세요.
              </p>
            </div>
          </div>
        </div>

        {/* 하단 여백용 */}
        <div className="h-8" />
      </main>

      {/* 하단 장식 */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-300 text-xs pointer-events-none">
        <Smile className="w-3 h-3" />
        <span style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>오늘도 수고하셨어요, 선생님!</span>
        <Smile className="w-3 h-3" />
      </div>
    </div>
  );
}
