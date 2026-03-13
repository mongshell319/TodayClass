import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Users, Crown, Heart, Smile, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: Date;
  level: number;
  rank: string;
  avatar: string;
  isOwn?: boolean;
}

interface ChatSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatSystem({ isOpen, onClose }: ChatSystemProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      userId: '2',
      username: '박지영',
      message: '오늘 수학 퀘스트 어떻게 풀어야 할지 모르겠어요 😅',
      timestamp: new Date(Date.now() - 300000),
      level: 12,
      rank: '실버',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c14c?w=100'
    },
    {
      id: '2', 
      userId: '3',
      username: '이철수',
      message: '저도 도와드릴게요! 이차방정식 공식 쓰면 돼요',
      timestamp: new Date(Date.now() - 240000),
      level: 18,
      rank: '골드',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    {
      id: '3',
      userId: '1',
      username: '김민수',
      message: '감사합니다! 이해했어요 👍',
      timestamp: new Date(Date.now() - 180000),
      level: 15,
      rank: '골드',
      avatar: 'https://images.unsplash.com/photo-1729824186570-4d4aede00043?w=100',
      isOwn: true
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers] = useState([
    { username: '박지영', level: 12, status: 'online' },
    { username: '이철수', level: 18, status: 'online' },
    { username: '최영희', level: 14, status: 'studying' },
    { username: '정민호', level: 16, status: 'offline' }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: '1',
      username: '김민수',
      message: newMessage,
      timestamp: new Date(),
      level: 15,
      rank: '골드',
      avatar: 'https://images.unsplash.com/photo-1729824186570-4d4aede00043?w=100',
      isOwn: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case '브론즈': return 'bg-amber-600';
      case '실버': return 'bg-gray-400';
      case '골드': return 'bg-yellow-500';
      case '플래티넘': return 'bg-cyan-400';
      case '다이아': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'studying': return 'bg-blue-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-4 md:inset-auto md:bottom-4 md:right-4 md:w-96 md:h-[600px] z-50"
    >
      <Card className="h-full bg-slate-900/95 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-400" />
              <h3 className="font-medium text-white">학급 채팅</h3>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                {onlineUsers.filter(u => u.status === 'online').length}명 온라인
              </Badge>
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

        <CardContent className="flex flex-col h-full pb-4 space-y-4">
          {/* 온라인 사용자 */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {onlineUsers.map((user, index) => (
              <div key={index} className="flex-shrink-0 text-center">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {user.username[0]}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-900 ${getStatusColor(user.status)}`}></div>
                </div>
                <p className="text-xs text-gray-400 mt-1 max-w-[40px] truncate">{user.username}</p>
              </div>
            ))}
          </div>

          {/* 메시지 영역 */}
          <ScrollArea className="flex-1 px-2">
            <div className="space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.isOwn ? 'flex-row-reverse' : ''}`}
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {message.username[0]}
                    </div>
                  </div>
                  <div className={`flex-1 ${message.isOwn ? 'text-right' : ''}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">{message.username}</span>
                      <Badge size="sm" className={`${getRankColor(message.rank)} text-white border-0 text-xs`}>
                        Lv.{message.level}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString('ko-KR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <div className={`inline-block p-3 rounded-xl max-w-xs ${
                      message.isOwn 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                        : 'bg-slate-800 text-gray-200'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* 메시지 입력 */}
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="메시지를 입력하세요..."
                className="w-full p-3 bg-slate-800 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                rows={2}
                maxLength={200}
              />
            </div>
            <Button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}