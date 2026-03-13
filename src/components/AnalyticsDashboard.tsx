import { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TrendingUp, TrendingDown, Clock, Target, Brain, Zap, Calendar, BarChart3 } from 'lucide-react';

interface StudyData {
  date: string;
  studyTime: number;
  questsCompleted: number;
  accuracy: number;
  focus: number;
}

interface SubjectPerformance {
  subject: string;
  score: number;
  improvement: number;
  fullMark: number;
}

export function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // 학습 시간 데이터
  const studyTimeData: StudyData[] = [
    { date: '월', studyTime: 2.5, questsCompleted: 8, accuracy: 85, focus: 78 },
    { date: '화', studyTime: 3.2, questsCompleted: 12, accuracy: 88, focus: 82 },
    { date: '수', studyTime: 2.8, questsCompleted: 10, accuracy: 82, focus: 75 },
    { date: '목', studyTime: 4.1, questsCompleted: 15, accuracy: 91, focus: 89 },
    { date: '금', studyTime: 3.5, questsCompleted: 13, accuracy: 89, focus: 85 },
    { date: '토', studyTime: 5.2, questsCompleted: 18, accuracy: 93, focus: 91 },
    { date: '일', studyTime: 4.8, questsCompleted: 16, accuracy: 90, focus: 88 }
  ];

  // 과목별 성과 데이터
  const subjectData: SubjectPerformance[] = [
    { subject: '대수', score: 95, improvement: 8, fullMark: 100 },
    { subject: '기하', score: 87, improvement: 12, fullMark: 100 },
    { subject: '함수', score: 92, improvement: -3, fullMark: 100 },
    { subject: '통계', score: 78, improvement: 15, fullMark: 100 },
    { subject: '미적분', score: 85, improvement: 5, fullMark: 100 }
  ];

  // 학습 패턴 데이터
  const learningPatternData = [
    { time: '09:00', focus: 65, productivity: 70 },
    { time: '10:00', focus: 78, productivity: 82 },
    { time: '11:00', focus: 85, productivity: 88 },
    { time: '14:00', focus: 92, productivity: 95 },
    { time: '15:00', focus: 96, productivity: 98 },
    { time: '16:00', focus: 88, productivity: 91 },
    { time: '19:00', focus: 75, productivity: 78 },
    { time: '20:00', focus: 82, productivity: 85 }
  ];

  // 퀘스트 완료 분포
  const questDistributionData = [
    { name: '수학', value: 45, color: '#8b5cf6' },
    { name: '과학', value: 25, color: '#06b6d4' },
    { name: '영어', value: 20, color: '#10b981' },
    { name: '기타', value: 10, color: '#f59e0b' }
  ];

  const totalStudyTime = studyTimeData.reduce((acc, day) => acc + day.studyTime, 0);
  const avgAccuracy = Math.round(studyTimeData.reduce((acc, day) => acc + day.accuracy, 0) / studyTimeData.length);
  const totalQuests = studyTimeData.reduce((acc, day) => acc + day.questsCompleted, 0);
  const avgFocus = Math.round(studyTimeData.reduce((acc, day) => acc + day.focus, 0) / studyTimeData.length);

  const getImprovementColor = (improvement: number) => {
    if (improvement > 0) return 'text-green-400';
    if (improvement < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  const getImprovementIcon = (improvement: number) => {
    if (improvement > 0) return <TrendingUp className="w-4 h-4" />;
    if (improvement < 0) return <TrendingDown className="w-4 h-4" />;
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">학습 분석 대시보드</h2>
          <p className="text-gray-400">실시간으로 학습 패턴과 성과를 분석합니다</p>
        </div>
        
        <div className="flex gap-2">
          {['day', 'week', 'month'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                selectedPeriod === period
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-800/60 text-gray-400 hover:text-white'
              }`}
            >
              {period === 'day' ? '일별' : period === 'week' ? '주별' : '월별'}
            </button>
          ))}
        </div>
      </div>

      {/* 주요 지표 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">총 학습시간</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">{totalStudyTime.toFixed(1)}</span>
                  <span className="text-sm text-gray-400">시간</span>
                </div>
                <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  지난주 대비 +12%
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">평균 정답률</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">{avgAccuracy}</span>
                  <span className="text-sm text-gray-400">%</span>
                </div>
                <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  지난주 대비 +5%
                </p>
              </div>
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">완료 퀘스트</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">{totalQuests}</span>
                  <span className="text-sm text-gray-400">개</span>
                </div>
                <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  지난주 대비 +18%
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">평균 집중도</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">{avgFocus}</span>
                  <span className="text-sm text-gray-400">%</span>
                </div>
                <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  지난주 대비 +8%
                </p>
              </div>
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/60 border-slate-600/50">
          <TabsTrigger value="performance" className="data-[state=active]:bg-purple-500">
            성과 분석
          </TabsTrigger>
          <TabsTrigger value="patterns" className="data-[state=active]:bg-purple-500">
            학습 패턴
          </TabsTrigger>
          <TabsTrigger value="subjects" className="data-[state=active]:bg-purple-500">
            과목별 분석
          </TabsTrigger>
          <TabsTrigger value="goals" className="data-[state=active]:bg-purple-500">
            목표 달성률
          </TabsTrigger>
        </TabsList>

        {/* 성과 분석 탭 */}
        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  주간 학습 시간
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={studyTimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="studyTime" 
                      stroke="#8b5cf6" 
                      fill="url(#colorStudyTime)" 
                    />
                    <defs>
                      <linearGradient id="colorStudyTime" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-400" />
                  정답률 & 퀘스트 완료
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={studyTimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="questsCompleted" stroke="#f59e0b" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 학습 패턴 탭 */}
        <TabsContent value="patterns">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-yellow-400" />
                  시간대별 집중도
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={learningPatternData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="focus" 
                      stroke="#fbbf24" 
                      fill="url(#colorFocus)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="productivity" 
                      stroke="#06b6d4" 
                      fill="url(#colorProductivity)" 
                    />
                    <defs>
                      <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorProductivity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">퀘스트 완료 분포</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={questDistributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {questDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 과목별 분석 탭 */}
        <TabsContent value="subjects">
          <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">과목별 성과 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={subjectData}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af' }} />
                    <PolarRadiusAxis tick={{ fill: '#9ca3af' }} />
                    <Radar name="점수" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>

                <div className="space-y-4">
                  {subjectData.map((subject, index) => (
                    <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white">{subject.subject}</h4>
                        <div className={`flex items-center gap-1 ${getImprovementColor(subject.improvement)}`}>
                          {getImprovementIcon(subject.improvement)}
                          <span className="text-sm">
                            {subject.improvement > 0 ? '+' : ''}{subject.improvement}%
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">현재 점수</span>
                          <span className="text-white">{subject.score}점</span>
                        </div>
                        <Progress value={subject.score} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 목표 달성률 탭 */}
        <TabsContent value="goals">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">주간 목표</h3>
                  <div className="text-3xl font-bold text-white mb-2">85%</div>
                  <Progress value={85} className="mb-2" />
                  <p className="text-sm text-gray-400">목표 학습시간 달성률</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">퀘스트 목표</h3>
                  <div className="text-3xl font-bold text-white mb-2">92%</div>
                  <Progress value={92} className="mb-2" />
                  <p className="text-sm text-gray-400">주간 퀘스트 완료율</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">성적 목표</h3>
                  <div className="text-3xl font-bold text-white mb-2">78%</div>
                  <Progress value={78} className="mb-2" />
                  <p className="text-sm text-gray-400">목표 평균 점수 달성률</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}