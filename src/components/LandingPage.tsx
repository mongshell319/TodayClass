import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Logo } from './Logo';
import { ImageWithFallback } from './figma/ImageWithFallback';
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
  Lightbulb,
  Thermometer,
  Send,
  Plane,
  X,
  Calendar,
  FileText,
  GraduationCap,
  Trophy,
  AlertTriangle
} from 'lucide-react';

// 컴포넌트 외부에 정의 (매 렌더링마다 재생성 방지)
const FONTS = [
  "'Arial', sans-serif",
  "'Times New Roman', serif",
  "'Courier New', monospace",
  "'Helvetica', sans-serif",
  "'Georgia', serif",
  "'Trebuchet MS', sans-serif",
  "'Comic Sans MS', cursive",
  "'Impact', sans-serif",
  "'Palatino', serif",
  "'Tahoma', sans-serif",
  "'Verdana', sans-serif",
  "'Noto Serif KR', serif",
  "'Noto Sans KR', sans-serif"
];

const ENCOURAGEMENT_MESSAGES = [
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

// 날씨 Mock 데이터 (시간대별, 실제 날씨 API 미연동 - 샘플 데이터)
const WEATHER_DATA = [
  { condition: "맑음", temp: 23, icon: <Sun className="w-7 h-7 text-amber-400" />, color: "text-amber-400" },
  { condition: "흐림", temp: 18, icon: <Cloud className="w-7 h-7 text-gray-400" />, color: "text-gray-400" },
  { condition: "비", temp: 15, icon: <CloudRain className="w-7 h-7 text-blue-400" />, color: "text-blue-400" },
  { condition: "눈", temp: -2, icon: <CloudSnow className="w-7 h-7 text-sky-300" />, color: "text-sky-300" },
];

interface LandingPageProps {
  onNavigateToTeacherDashboard: () => void;
  onNavigateToSchoolQuest: () => void;
  onNavigateToSchoolLife: () => void;
  onNavigateToStudentRecord: () => void;
}

export function LandingPage({ onNavigateToTeacherDashboard, onNavigateToSchoolQuest, onNavigateToSchoolLife, onNavigateToStudentRecord }: LandingPageProps) {
  // 슬롯머신 폰트 효과
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  // 실시간 시계
  const [currentTime, setCurrentTime] = useState(() => new Date());

  // 비행기 메시지 시스템
  const [flyingMessages, setFlyingMessages] = useState<Array<{
    id: number;
    message: string;
    isVisible: boolean;
    showMessage: boolean;
    author?: string;
  }>>([]);
  const messageIdCounterRef = useRef(0);
  const [customMessages, setCustomMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showSentMessage, setShowSentMessage] = useState(false);

  // 실시간 시계 업데이트 (1분마다)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // 슬롯머신 폰트 애니메이션
  useEffect(() => {
    if (!isAnimating) return;

    const animationDuration = 3000;
    const intervalTime = 100;
    const totalIntervals = Math.floor(animationDuration / intervalTime);
    let intervalCount = 0;

    const interval = setInterval(() => {
      intervalCount++;
      if (intervalCount >= totalIntervals) {
        setCurrentFontIndex(Math.floor(Math.random() * FONTS.length));
        setIsAnimating(false);
        clearInterval(interval);
      } else {
        setCurrentFontIndex(Math.floor(Math.random() * FONTS.length));
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isAnimating]);

  // 비행기 메시지 시스템 - 메모리 누수 수정
  useEffect(() => {
    const timeoutIds: ReturnType<typeof setTimeout>[] = [];

    const createFlyingMessage = () => {
      if (flyingMessages.length > 0) return;

      const allMessages = [...ENCOURAGEMENT_MESSAGES, ...customMessages];
      const randomMessage = allMessages[Math.floor(Math.random() * allMessages.length)];
      const id = messageIdCounterRef.current++;

      const newMessage = {
        id,
        message: randomMessage,
        isVisible: true,
        showMessage: false,
        author: customMessages.includes(randomMessage) ? '다른 선생님' : '익명의 선생님'
      };

      setFlyingMessages([newMessage]);

      const removeTimeout = setTimeout(() => {
        setFlyingMessages([]);
      }, 10000);
      timeoutIds.push(removeTimeout);
    };

    const scheduleNext = () => {
      const randomInterval = Math.random() * 10000 + 15000;
      const id = setTimeout(() => {
        createFlyingMessage();
        scheduleNext();
      }, randomInterval);
      timeoutIds.push(id);
    };

    const initialTimeout = setTimeout(() => {
      createFlyingMessage();
      scheduleNext();
    }, 5000);
    timeoutIds.push(initialTimeout);

    // 모든 timeout을 정리
    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customMessages]);

  const toggleMessageVisibility = (id: number) => {
    setFlyingMessages(prev =>
      prev.map(msg =>
        msg.id === id ? { ...msg, showMessage: !msg.showMessage } : msg
      )
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // 샘플 날씨 데이터 (시간대에 따라 변경)
  const currentHour = new Date().getHours();
  const weather = WEATHER_DATA[Math.floor(currentHour / 6) % WEATHER_DATA.length];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1593588332695-cd49488a8ec8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBzdW5zZXQlMjBjbGFzc3Jvb20lMjB3aW5kb3d8ZW58MXx8fHwxNzU5MTQwODM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="따뜻한 교실 풍경"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-slate-900/60 to-purple-900/50"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-amber-300/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-300/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-pink-300/25 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-blue-300/20 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Flying Messages */}
      {flyingMessages.map((msgData) => (
        <div
          key={msgData.id}
          className={`fixed top-4 right-4 z-50 transition-all duration-1000 ${
            msgData.isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            animation: msgData.isVisible ? 'flyInFromTopRight 1.5s ease-out' : undefined
          }}
        >
          <div className="relative">
            {/* 비행기 아이콘 */}
            <button
              type="button"
              aria-label="응원 메시지 열기"
              className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-3 shadow-2xl cursor-pointer hover:scale-110 transition-transform duration-300"
              onClick={() => toggleMessageVisibility(msgData.id)}
            >
              <Plane className="w-6 h-6 text-white transform rotate-45" aria-hidden="true" />
            </button>

            {/* 응원 메시지 */}
            {msgData.showMessage && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-white/30 animate-in slide-in-from-top-2">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-500" aria-hidden="true" />
                    <span className="text-sm font-medium text-gray-600">응원 메시지</span>
                  </div>
                  <button
                    type="button"
                    aria-label="메시지 닫기"
                    onClick={() => toggleMessageVisibility(msgData.id)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
                <p className="text-gray-800 leading-relaxed" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
                  {msgData.message}
                </p>
                <div className="mt-3 text-right">
                  <span className="text-xs text-gray-500">{msgData.author}께서</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-6xl mx-auto text-center">

          {/* Weather and Title */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              {/* 샘플 날씨 표시 (실제 날씨 API 미연동) */}
              <div
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
                title="샘플 날씨 데이터 (실제 날씨와 다를 수 있습니다)"
              >
                {weather.icon}
                <span className="text-white font-medium">{weather.condition}</span>
                <div className="flex items-center gap-1 text-white">
                  <Thermometer className="w-4 h-4" aria-hidden="true" />
                  <span className="font-medium">{weather.temp}°C</span>
                </div>
                <span className="text-white/40 text-xs">(샘플)</span>
              </div>
            </div>

            <div className="mb-4" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              <h1 className="text-[70px] bg-gradient-to-r from-slate-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-medium text-center leading-tight" style={{ fontFamily: FONTS[currentFontIndex] }}>
                오늘의 수업
              </h1>
            </div>

            <div className="flex items-center justify-center gap-2 text-xl mb-2 relative" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
              <div className="relative" aria-hidden="true">
                <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
                <div className="absolute inset-0 w-5 h-5 bg-amber-300/30 rounded-full animate-ping"></div>
              </div>
              <span className="bg-gradient-to-r from-amber-100 via-yellow-100 to-pink-100 bg-clip-text text-transparent font-medium relative">
                항상 좋은 수업을 위해 노력하시는 선생님들을 응원합니다
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-300/50 to-transparent animate-pulse"></div>
              </span>
              <div className="relative" aria-hidden="true">
                <Heart className="w-5 h-5 text-pink-400 animate-bounce" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* 응원 메시지 입력창 */}
            <div className="max-w-2xl mx-auto mt-8 mb-8">
              <div className="relative">
                <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl hover:bg-white/15 transition-all duration-300">
                  <input
                    type="text"
                    placeholder="응원의 메세지를 남겨주세요..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-white placeholder-white/50 text-lg outline-none"
                    style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
                    aria-label="응원 메시지 입력"
                  />
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    aria-label="응원 메시지 전송"
                    className="ml-4 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Send className="w-5 h-5 text-white" aria-hidden="true" />
                  </button>
                </div>

                {showSentMessage && (
                  <div className="mt-4 p-3 bg-green-500/20 backdrop-blur-md border border-green-400/30 rounded-xl animate-in slide-in-from-bottom-2" role="status">
                    <p className="text-green-200 text-center" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
                      💝 따뜻한 응원 메시지가 전송되었습니다!
                    </p>
                  </div>
                )}
              </div>
            </div>

            <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">

            {/* Teacher Dashboard Card */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-500 group cursor-pointer overflow-hidden">
              <CardContent className="p-8 text-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-400/20 to-purple-400/20 backdrop-blur-sm rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                    <Users className="w-10 h-10 text-blue-200" />
                  </div>

                  <h3 className="text-2xl font-medium text-white mb-3" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                    선생님 워크스페이스
                  </h3>

                  <p className="text-white/70 mb-6 leading-relaxed" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
                    업무 일정 관리, 메모 작성,<br />
                    학생 정보 관리를 한 곳에서
                  </p>

                  <Button
                    onClick={onNavigateToTeacherDashboard}
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm group-hover:border-white/50 transition-all duration-300"
                    size="lg"
                  >
                    <Users className="w-5 h-5 mr-2" aria-hidden="true" />
                    워크스페이스 열기
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* School Quest Card */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-500 group cursor-pointer overflow-hidden">
              <CardContent className="p-8 text-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-400/20 to-pink-400/20 backdrop-blur-sm rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                    <Gamepad2 className="w-10 h-10 text-purple-200" />
                  </div>

                  <h3 className="text-2xl font-medium text-white mb-3" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                    School Quest
                  </h3>

                  <p className="text-white/70 mb-6 leading-relaxed" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
                    학생들을 위한 게임화된 학습 시스템<br />
                    길드, 퀘스트, 랭킹으로 동기부여 UP!
                  </p>

                  <Button
                    onClick={onNavigateToSchoolQuest}
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm group-hover:border-white/50 transition-all duration-300"
                    size="lg"
                  >
                    <Gamepad2 className="w-5 h-5 mr-2" aria-hidden="true" />
                    퀘스트 관리하기
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* School Life Card */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-500 group cursor-pointer overflow-hidden">
              <CardContent className="p-8 text-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 backdrop-blur-sm rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                    <Calendar className="w-10 h-10 text-emerald-200" />
                  </div>

                  <h3 className="text-2xl font-medium text-white mb-3" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                    학교 생활
                  </h3>

                  <p className="text-white/70 mb-6 leading-relaxed" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
                    조 편성, 투표, 타이머, 회의 기록<br />
                    학급 운영에 필요한 도구들
                  </p>

                  <Button
                    onClick={onNavigateToSchoolLife}
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm group-hover:border-white/50 transition-all duration-300"
                    size="lg"
                  >
                    <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />
                    학급 도구 사용하기
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Student Record Card */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-500 group cursor-pointer overflow-hidden">
              <CardContent className="p-8 text-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-400/20 to-violet-400/20 backdrop-blur-sm rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                    <GraduationCap className="w-10 h-10 text-indigo-200" />
                  </div>

                  <h3 className="text-2xl font-medium text-white mb-3" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                    생활기록부
                  </h3>

                  <p className="text-white/70 mb-6 leading-relaxed" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
                    AI 도움으로 생활기록부 작성<br />
                    학생별 활동 기록 체계적 관리
                  </p>

                  <Button
                    onClick={onNavigateToStudentRecord}
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm group-hover:border-white/50 transition-all duration-300"
                    size="lg"
                  >
                    <GraduationCap className="w-5 h-5 mr-2" aria-hidden="true" />
                    생활기록부 작성하기
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Philosophy Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-amber-300" aria-hidden="true" />
              <h4 className="text-xl font-medium text-white" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                오늘의 명언
              </h4>
              <BookOpen className="w-6 h-6 text-amber-300" aria-hidden="true" />
            </div>

            <p className="text-white/80 leading-relaxed text-lg" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
              "교육은 세상을 바꿀 수 있는 가장 강력한 무기이다."<br />
              <span className="text-amber-200/60 text-base">- 넬슨 만델라</span>
            </p>
          </div>

          {/* Music Player */}
          <MusicPlayer />

          {/* Data Storage Notice */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mt-8">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <AlertTriangle className="w-5 h-5 text-amber-300" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                  💾 데이터 저장 안내
                </h4>
                <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
                  모든 서비스(선생님 워크스페이스, 학교 생활, 생활기록부)의 데이터는
                  현재 사용하고 계신 컴퓨터(브라우저)의 <strong>로컬 저장소(localStorage)</strong>에 저장됩니다.
                  다른 기기에서 접속하거나 브라우저 데이터를 삭제하면 저장된 내용이 사라질 수 있으니
                  중요한 데이터는 별도로 백업해 주세요.
                </p>
              </div>
            </div>
          </div>

          {/* 실시간 시간 표시 */}
          <div className="mt-8 text-white/60" style={{ fontFamily: "'Noto Sans KR', sans-serif" }} aria-live="off">
            {currentTime.toLocaleString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
