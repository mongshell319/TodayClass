import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Music,
  Heart,
  Shuffle,
  RotateCcw
} from 'lucide-react';

// YouTube IFrame API 타입 정의
interface YTPlayer {
  destroy(): void;
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
}

interface YTPlayerOptions {
  height: string;
  width: string;
  videoId: string;
  playerVars?: Record<string, number | string>;
  events?: {
    onReady?: () => void;
    onStateChange?: (event: { data: number }) => void;
  };
}

declare global {
  interface Window {
    YT: {
      Player: new (elementId: string, options: YTPlayerOptions) => YTPlayer;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  category: 'focus' | 'healing' | 'energy';
}

const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: '1',
    title: '차분한 피아노 - 수업 준비',
    artist: '힐링 뮤직',
    youtubeId: 'jfKfPfyJRdk',
    category: 'focus'
  },
  {
    id: '2',
    title: '자연의 소리 - 집중력 향상',
    artist: '네이처 사운드',
    youtubeId: '5qap5aO4i9A',
    category: 'focus'
  },
  {
    id: '3',
    title: '따뜻한 카페 음악',
    artist: '릴렉스 뮤직',
    youtubeId: 'rUxyKA_-grg',
    category: 'healing'
  },
  {
    id: '4',
    title: '클래식 - 마음의 평화',
    artist: '클래식 컬렉션',
    youtubeId: 'B7KHKksJtPU',
    category: 'healing'
  },
  {
    id: '5',
    title: '활력 넘치는 모닝 뮤직',
    artist: '에너지 뮤직',
    youtubeId: '36YnV9STBqc',
    category: 'energy'
  }
];

export function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);

  const currentTrack = MUSIC_TRACKS[currentTrackIndex];

  const nextTrack = () => {
    setCurrentTrackIndex((prev) =>
      prev === MUSIC_TRACKS.length - 1 ? 0 : prev + 1
    );
    setIsPlaying(false);
  };

  useEffect(() => {
    // YouTube IFrame API 로드 (중복 로드 방지)
    if (!document.getElementById('youtube-iframe-api')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      setIsPlayerReady(true);
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isPlayerReady && showPlayer) {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }

      playerRef.current = new window.YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: currentTrack.youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0
        },
        events: {
          onReady: () => {
            // 플레이어 준비 완료
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              nextTrack();
            }
          }
        }
      });
    }
  // nextTrack을 의존성에 포함하면 무한루프 발생 가능하므로 제외
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlayerReady, showPlayer, currentTrackIndex]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) =>
      prev === 0 ? MUSIC_TRACKS.length - 1 : prev - 1
    );
    setIsPlaying(false);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
    } else {
      playerRef.current.mute();
    }
    setIsMuted(!isMuted);
  };

  const getCategoryColor = (category: MusicTrack['category']) => {
    switch (category) {
      case 'focus': return 'from-blue-400/20 to-indigo-400/20';
      case 'healing': return 'from-green-400/20 to-emerald-400/20';
      case 'energy': return 'from-orange-400/20 to-red-400/20';
    }
  };

  const getCategoryEmoji = (category: MusicTrack['category']) => {
    switch (category) {
      case 'focus': return '🎯';
      case 'healing': return '🌿';
      case 'energy': return '⚡';
    }
  };

  const getCategoryLabel = (category: MusicTrack['category']) => {
    switch (category) {
      case 'focus': return '집중';
      case 'healing': return '힐링';
      case 'energy': return '활력';
    }
  };

  if (!showPlayer) {
    return (
      <div className="mt-8">
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 group cursor-pointer overflow-hidden">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Music className="w-6 h-6 text-purple-300" aria-hidden="true" />
              <h4 className="text-xl font-medium text-white" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                선생님을 위한 힐링 뮤직
              </h4>
              <Heart className="w-6 h-6 text-pink-300" aria-hidden="true" />
            </div>

            <p className="text-white/70 mb-4 leading-relaxed" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
              수업 준비와 마음의 평화를 위한 음악을 들어보세요
            </p>

            <Button
              onClick={() => setShowPlayer(true)}
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 text-white border border-white/20 backdrop-blur-sm transition-all duration-300"
              size="lg"
            >
              <Music className="w-5 h-5 mr-2" aria-hidden="true" />
              음악 플레이어 열기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
        <CardContent className="p-6">
          {/* Hidden YouTube Player */}
          <div id="youtube-player" style={{ display: 'none' }} aria-hidden="true"></div>

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryColor(currentTrack.category)} flex items-center justify-center`} aria-hidden="true">
                <span className="text-2xl">{getCategoryEmoji(currentTrack.category)}</span>
              </div>
              <div>
                <h4 className="text-lg font-medium text-white" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                  선생님을 위한 힐링 뮤직
                </h4>
                <p className="text-white/60 text-sm" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
                  마음을 편안하게 해주는 음악
                </p>
              </div>
            </div>

            <Button
              onClick={() => setShowPlayer(false)}
              variant="ghost"
              size="sm"
              aria-label="음악 플레이어 닫기"
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              ✕
            </Button>
          </div>

          {/* Current Track Info */}
          <div className="text-center mb-6">
            <h5 className="text-xl font-medium text-white mb-1" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              {currentTrack.title}
            </h5>
            <p className="text-white/70" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
              {currentTrack.artist}
            </p>
            <div className="mt-2">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-gradient-to-r ${getCategoryColor(currentTrack.category)} text-white/80 border border-white/10`}>
                {getCategoryEmoji(currentTrack.category)}
                {getCategoryLabel(currentTrack.category)}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              onClick={prevTrack}
              variant="ghost"
              size="sm"
              aria-label="이전 곡"
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-full w-10 h-10"
            >
              <SkipBack className="w-5 h-5" aria-hidden="true" />
            </Button>

            <Button
              onClick={togglePlay}
              aria-label={isPlaying ? '일시정지' : '재생'}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full w-14 h-14 shadow-lg hover:scale-105 transition-all duration-300"
            >
              {isPlaying
                ? <Pause className="w-6 h-6" aria-hidden="true" />
                : <Play className="w-6 h-6 ml-1" aria-hidden="true" />
              }
            </Button>

            <Button
              onClick={nextTrack}
              variant="ghost"
              size="sm"
              aria-label="다음 곡"
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-full w-10 h-10"
            >
              <SkipForward className="w-5 h-5" aria-hidden="true" />
            </Button>
          </div>

          {/* Additional Controls */}
          <div className="flex items-center justify-center gap-6">
            <Button
              onClick={toggleMute}
              variant="ghost"
              size="sm"
              aria-label={isMuted ? '음소거 해제' : '음소거'}
              className="text-white/60 hover:text-white hover:bg-white/10 rounded-full w-8 h-8"
            >
              {isMuted
                ? <VolumeX className="w-4 h-4" aria-hidden="true" />
                : <Volume2 className="w-4 h-4" aria-hidden="true" />
              }
            </Button>

            <Button
              onClick={() => {
                setCurrentTrackIndex(Math.floor(Math.random() * MUSIC_TRACKS.length));
                setIsPlaying(false);
              }}
              variant="ghost"
              size="sm"
              aria-label="랜덤 재생"
              className="text-white/60 hover:text-white hover:bg-white/10 rounded-full w-8 h-8"
            >
              <Shuffle className="w-4 h-4" aria-hidden="true" />
            </Button>

            <Button
              onClick={() => {
                setCurrentTrackIndex(0);
                setIsPlaying(false);
              }}
              variant="ghost"
              size="sm"
              aria-label="처음으로"
              className="text-white/60 hover:text-white hover:bg-white/10 rounded-full w-8 h-8"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>

          {/* Track List Preview */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2" role="list" aria-label="재생목록">
            {MUSIC_TRACKS.slice(0, 3).map((track, index) => (
              <button
                key={track.id}
                type="button"
                role="listitem"
                aria-label={`${track.title} 재생`}
                aria-pressed={index === currentTrackIndex}
                onClick={() => {
                  setCurrentTrackIndex(index);
                  setIsPlaying(false);
                }}
                className={`p-3 rounded-lg text-left transition-all duration-300 ${
                  index === currentTrackIndex
                    ? 'bg-white/20 border border-white/30'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg" aria-hidden="true">{getCategoryEmoji(track.category)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/90 text-sm font-medium truncate" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
                      {track.title}
                    </p>
                    <p className="text-white/60 text-xs truncate">
                      {track.artist}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
