import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift, Trophy, Users, Zap, Heart, Star } from 'lucide-react';
import { Button } from './ui/button';

interface Notification {
  id: string;
  type: 'levelup' | 'achievement' | 'reward' | 'social' | 'quest' | 'special';
  title: string;
  message: string;
  timestamp: Date;
  icon: React.ReactNode;
  color: string;
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // 실시간 알림 시뮬레이션
  useEffect(() => {
    const mockNotifications = [
      {
        id: '1',
        type: 'levelup' as const,
        title: '레벨 업! 🎉',
        message: '15레벨에 도달했습니다! 새로운 퀘스트가 해제되었어요.',
        timestamp: new Date(),
        icon: <Star className="w-5 h-5" />,
        color: 'from-yellow-400 to-orange-500'
      },
      {
        id: '2', 
        type: 'achievement' as const,
        title: '새로운 배지 획득!',
        message: '"수학 마스터" 배지를 획득했습니다!',
        timestamp: new Date(Date.now() - 30000),
        icon: <Trophy className="w-5 h-5" />,
        color: 'from-purple-400 to-pink-500'
      },
      {
        id: '3',
        type: 'social' as const, 
        title: '친구 요청',
        message: '박지영님이 친구 요청을 보냈습니다.',
        timestamp: new Date(Date.now() - 60000),
        icon: <Users className="w-5 h-5" />,
        color: 'from-blue-400 to-cyan-500'
      }
    ];

    // 알림을 순차적으로 추가
    mockNotifications.forEach((notification, index) => {
      setTimeout(() => {
        setNotifications(prev => [notification, ...prev]);
      }, index * 2000);
    });
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`bg-gradient-to-r ${notification.color} p-4 rounded-xl shadow-lg text-white backdrop-blur-sm border border-white/20`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {notification.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm mb-1">{notification.title}</h4>
                <p className="text-xs text-white/90 leading-relaxed">{notification.message}</p>
                <p className="text-xs text-white/70 mt-1">
                  {notification.timestamp.toLocaleTimeString('ko-KR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeNotification(notification.id)}
                className="h-6 w-6 p-0 text-white/70 hover:text-white hover:bg-white/20"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {notifications.length > 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Button
            size="sm"
            variant="outline"
            onClick={clearAllNotifications}
            className="bg-slate-800/80 border-slate-600/50 text-gray-300 hover:bg-slate-700/80"
          >
            모든 알림 지우기
          </Button>
        </motion.div>
      )}
    </div>
  );
}