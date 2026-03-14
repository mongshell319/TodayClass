import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Send, Lightbulb, BookOpen, Target, TrendingUp, X, Sparkles, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface AIMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AIInsight {
  id: string;
  type: 'weakness' | 'strength' | 'recommendation' | 'goal';
  title: string;
  description: string;
  icon: React.ReactNode;
  priority: 'high' | 'medium' | 'low';
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: '안녕하세요! 저는 여러분의 학습을 도와드리는 AI 도우미입니다. 💡 무엇을 도와드릴까요?',
      timestamp: new Date(Date.now() - 300000),
      suggestions: ['학습 계획 세우기', '어려운 문제 해결', '성적 분석', '동기부여']
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, []);

  const aiInsights: AIInsight[] = [
    {
      id: '1',
      type: 'weakness',
      title: '이차방정식 약점 발견',
      description: '판별식 관련 문제에서 정답률이 65%입니다. 추가 연습을 권장합니다.',
      icon: <Target className="w-5 h-5" />,
      priority: 'high'
    },
    {
      id: '2',
      type: 'strength',
      title: '일차함수 마스터',
      description: '일차함수 영역에서 95% 정답률을 달성했습니다! 훌륭해요!',
      icon: <TrendingUp className="w-5 h-5" />,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'recommendation',
      title: '최적 학습시간 추천',
      description: '분석 결과, 오후 2-4시가 집중력이 가장 높습니다.',
      icon: <Brain className="w-5 h-5" />,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'goal',
      title: '이번 주 목표 달성률',
      description: '목표 대비 78% 달성했습니다. 조금만 더 화이팅!',
      icon: <Sparkles className="w-5 h-5" />,
      priority: 'low'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // AI 응답 시뮬레이션
    typingTimerRef.current = setTimeout(() => {
      const aiResponse = generateAIResponse(newMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): AIMessage => {
    const responses = {
      '학습': {
        content: '학습에 대해 궁금하시군요! 📚 현재 진도에 따르면 이차방정식 복습을 권장드립니다. 단계별로 접근해보세요: 1) 기본 공식 복습 2) 예제 문제 풀이 3) 응용 문제 도전',
        suggestions: ['이차방정식 공식', '예제 문제 추천', '학습 계획표']
      },
      '문제': {
        content: '어려운 문제를 만나셨나요? 🤔 문제를 단계별로 나누어 해결해보세요. 먼저 문제에서 주어진 조건을 정리하고, 어떤 공식이나 개념을 사용해야 할지 생각해보세요.',
        suggestions: ['문제 해결 단계', '관련 개념 설명', '비슷한 문제']
      },
      '동기': {
        content: '학습 동기가 필요하시군요! 💪 지금까지 15레벨까지 올라오신 걸 보면 정말 열심히 하고 계세요! 작은 목표부터 하나씩 달성해가며 성취감을 느껴보세요.',
        suggestions: ['작은 목표 설정', '성취 기록', '친구와 경쟁']
      },
      default: {
        content: '죄송하지만 정확히 이해하지 못했어요. 😅 더 구체적으로 말씀해 주시면 더 정확한 도움을 드릴 수 있습니다!',
        suggestions: ['학습 방법', '문제 해결', '성적 향상', '동기부여']
      }
    };

    const input = userInput.toLowerCase();
    let response = responses.default;

    if (input.includes('학습') || input.includes('공부')) {
      response = responses['학습'];
    } else if (input.includes('문제') || input.includes('어려')) {
      response = responses['문제'];
    } else if (input.includes('동기') || input.includes('의욕')) {
      response = responses['동기'];
    }

    return {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: response.content,
      timestamp: new Date(),
      suggestions: response.suggestions
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setNewMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-400 bg-red-400/10';
      case 'medium': return 'border-yellow-400 bg-yellow-400/10';
      case 'low': return 'border-blue-400 bg-blue-400/10';
      default: return 'border-gray-400 bg-gray-400/10';
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'weakness': return 'text-red-400';
      case 'strength': return 'text-green-400';
      case 'recommendation': return 'text-blue-400';
      case 'goal': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-4 md:inset-auto md:bottom-4 md:right-4 md:w-[480px] md:h-[700px] z-50"
    >
      <Card className="h-full bg-slate-900/95 border-slate-700/50 backdrop-blur-sm flex flex-col">
        <CardHeader className="pb-3 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-white">AI 학습 도우미</CardTitle>
                <p className="text-sm text-gray-400">똑똑한 개인 맞춤 도우미</p>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <div className="flex-1 flex flex-col min-h-0">
          {/* AI 인사이트 */}
          <div className="p-4 border-b border-slate-700/50">
            <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              AI 분석 인사이트
            </h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {aiInsights.map((insight) => (
                <div
                  key={insight.id}
                  className={`p-2 rounded-lg border ${getPriorityColor(insight.priority)} text-xs`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={getInsightColor(insight.type)}>
                      {insight.icon}
                    </div>
                    <span className="font-medium text-white">{insight.title}</span>
                  </div>
                  <p className="text-gray-300 text-xs">{insight.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 채팅 영역 */}
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4 py-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'ai' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}>
                      {message.type === 'ai' ? (
                        <Bot className="w-4 h-4 text-white" />
                      ) : (
                        <span className="text-white text-sm font-medium">김</span>
                      )}
                    </div>
                  </div>
                  <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block p-3 rounded-xl max-w-xs ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-slate-800 text-gray-200 border border-slate-700/50'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString('ko-KR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                    
                    {message.suggestions && message.type === 'ai' && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            size="sm"
                            variant="outline"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs h-6 bg-slate-800/50 border-slate-600/50 text-gray-300 hover:bg-slate-700/50"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-slate-800 border border-slate-700/50 p-3 rounded-xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* 메시지 입력 */}
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="AI에게 질문하세요..."
                  className="w-full p-3 bg-slate-800 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  rows={2}
                  maxLength={300}
                />
              </div>
              <Button
                onClick={sendMessage}
                disabled={!newMessage.trim() || isTyping}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}