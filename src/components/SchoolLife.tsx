import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Logo } from './Logo';
import { 
  Timer,
  Vote,
  Users,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Settings,
  Bell,
  User,
  Search,
  FileText,
  Calendar,
  CheckCircle2,
  X,
  BarChart3,
  PieChart,
  TrendingUp,
  MessageSquare,
  Lightbulb,
  Save,
  Edit,
  Trash2,
  Copy,
  Share2,
  Download,
  Upload,
  RefreshCw,
  Star,
  Award,
  Target,
  BookOpen,
  Activity
} from 'lucide-react';

interface SchoolLifeProps {
  onBack: () => void;
}

interface Poll {
  id: string;
  title: string;
  description: string;
  options: string[];
  votes: { [key: string]: number };
  isActive: boolean;
  createdAt: Date;
  endTime?: Date;
  allowMultiple: boolean;
  anonymous: boolean;
}

interface TimerSession {
  id: string;
  name: string;
  duration: number; // in seconds
  remainingTime: number;
  isRunning: boolean;
  type: 'class' | 'break' | 'activity' | 'exam';
  createdAt: Date;
}

interface MeetingRecord {
  id: string;
  title: string;
  date: Date;
  participants: string[];
  agenda: string[];
  decisions: string[];
  actionItems: { task: string; assignee: string; deadline: Date; completed: boolean }[];
  notes: string;
  nextMeeting?: Date;
}

interface Student {
  id: string;
  name: string;
  gender: '남' | '여';
  ability: 'high' | 'medium' | 'low';
  personality: 'active' | 'quiet' | 'leader' | 'helper';
  friends: string[];
  avoid: string[];
}

interface Group {
  id: string;
  name: string;
  members: Student[];
  leader?: Student;
  createdAt: Date;
}

export function SchoolLife({ onBack }: SchoolLifeProps) {
  const [activeTab, setActiveTab] = useState('voting');

  // Voting System State
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: '1',
      title: '다음 주 체험학습 장소',
      description: '3학년 체험학습 장소를 선택해주세요',
      options: ['과학관', '박물관', '역사관', '미술관'],
      votes: { '과학관': 12, '박물관': 8, '역사관': 15, '미술관': 5 },
      isActive: true,
      createdAt: new Date(2024, 10, 1),
      allowMultiple: false,
      anonymous: true
    },
    {
      id: '2',
      title: '학급 규칙 개선사항',
      description: '우리 반 규칙에서 개선하고 싶은 부분은?',
      options: ['휴대폰 사용 규칙', '청소 당번 방식', '과제 제출 방법', '수업 참여 방식'],
      votes: { '휴대폰 사용 규칙': 18, '청소 당번 방식': 6, '과제 제출 방법': 10, '수업 참여 방식': 8 },
      isActive: false,
      createdAt: new Date(2024, 9, 28),
      allowMultiple: true,
      anonymous: true
    }
  ]);

  const [newPoll, setNewPoll] = useState({
    title: '',
    description: '',
    options: ['', ''],
    allowMultiple: false,
    anonymous: true,
    duration: 24 // hours
  });

  // Timer System State
  const [timers, setTimers] = useState<TimerSession[]>([
    {
      id: '1',
      name: '수업 시간',
      duration: 2700, // 45분
      remainingTime: 2700,
      isRunning: false,
      type: 'class',
      createdAt: new Date()
    },
    {
      id: '2',
      name: '쉬는 시간',
      duration: 600, // 10분
      remainingTime: 600,
      isRunning: false,
      type: 'break',
      createdAt: new Date()
    },
    {
      id: '3',
      name: '그룹 활동',
      duration: 1200, // 20분
      remainingTime: 1200,
      isRunning: false,
      type: 'activity',
      createdAt: new Date()
    }
  ]);

  const [newTimer, setNewTimer] = useState({
    name: '',
    hours: 0,
    minutes: 45,
    seconds: 0,
    type: 'class' as 'class' | 'break' | 'activity' | 'exam'
  });

  // Meeting Records State  
  const [meetings, setMeetings] = useState<MeetingRecord[]>([
    {
      id: '1',
      title: '3학년 2반 11월 학급회의',
      date: new Date(2024, 10, 1),
      participants: ['김민수', '박지영', '이철수', '최영희', '정태현'],
      agenda: ['체험학습 계획', '교실 환경 개선', '학급 행사 준비'],
      decisions: ['체험학습 장소 투표 진행', '교실 식물 관리 당번제 도입'],
      actionItems: [
        { task: '체험학습 투표 생성', assignee: '김민수', deadline: new Date(2024, 10, 5), completed: true },
        { task: '식물 관리 일정표 작성', assignee: '박지영', deadline: new Date(2024, 10, 8), completed: false }
      ],
      notes: '학생들의 적극적인 참여가 인상적이었음. 다음 회의에서는 성적 향상 방안도 논의 예정.',
      nextMeeting: new Date(2024, 10, 15)
    }
  ]);

  const [newMeeting, setNewMeeting] = useState({
    title: '',
    participants: '',
    agenda: '',
    notes: ''
  });

  // Group Formation State
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: '김민수', gender: '남', ability: 'high', personality: 'leader', friends: ['박지영'], avoid: [] },
    { id: '2', name: '박지영', gender: '여', ability: 'high', personality: 'active', friends: ['김민수'], avoid: [] },
    { id: '3', name: '이철수', gender: '남', ability: 'medium', personality: 'quiet', friends: [], avoid: ['최영희'] },
    { id: '4', name: '최영희', gender: '여', ability: 'medium', personality: 'helper', friends: ['정수민'], avoid: ['이철수'] },
    { id: '5', name: '정수민', gender: '여', ability: 'low', personality: 'quiet', friends: ['최영희'], avoid: [] },
    { id: '6', name: '강태현', gender: '남', ability: 'high', personality: 'active', friends: [], avoid: [] },
    { id: '7', name: '윤서아', gender: '여', ability: 'medium', personality: 'leader', friends: ['한지우'], avoid: [] },
    { id: '8', name: '한지우', gender: '남', ability: 'low', personality: 'helper', friends: ['윤서아'], avoid: [] },
    { id: '9', name: '송하늘', gender: '여', ability: 'high', personality: 'quiet', friends: [], avoid: [] },
    { id: '10', name: '조민준', gender: '남', ability: 'medium', personality: 'active', friends: [], avoid: [] },
    { id: '11', name: '신예린', gender: '여', ability: 'low', personality: 'helper', friends: [], avoid: [] },
    { id: '12', name: '오준혁', gender: '남', ability: 'medium', personality: 'leader', friends: [], avoid: [] }
  ]);

  const [groups, setGroups] = useState<Group[]>([]);
  const [groupSettings, setGroupSettings] = useState({
    groupSize: 4,
    genderBalance: true,
    abilityBalance: true,
    considerFriends: true,
    considerAvoid: true,
    leaderInEachGroup: true
  });

  const [isGeneratingGroups, setIsGeneratingGroups] = useState(false);
  
  // 학생 추가 관련 state
  const [newStudent, setNewStudent] = useState({
    name: '',
    gender: '남' as '남' | '여',
    ability: 'medium' as 'high' | 'medium' | 'low',
    personality: 'active' as 'active' | 'quiet' | 'leader' | 'helper',
    friends: '',
    avoid: ''
  });
  
  const [isAddingStudent, setIsAddingStudent] = useState(false);

  // Timer Effects
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers => 
        prevTimers.map(timer => {
          if (timer.isRunning && timer.remainingTime > 0) {
            return { ...timer, remainingTime: timer.remainingTime - 1 };
          } else if (timer.isRunning && timer.remainingTime === 0) {
            // Timer finished - could add notification here
            return { ...timer, isRunning: false };
          }
          return timer;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Poll Functions
  const createPoll = () => {
    if (newPoll.title.trim() && newPoll.options.filter(opt => opt.trim()).length >= 2) {
      const poll: Poll = {
        id: Date.now().toString(),
        title: newPoll.title,
        description: newPoll.description,
        options: newPoll.options.filter(opt => opt.trim()),
        votes: {},
        isActive: true,
        createdAt: new Date(),
        endTime: new Date(Date.now() + newPoll.duration * 60 * 60 * 1000),
        allowMultiple: newPoll.allowMultiple,
        anonymous: newPoll.anonymous
      };
      
      setPolls([poll, ...polls]);
      setNewPoll({
        title: '',
        description: '',
        options: ['', ''],
        allowMultiple: false,
        anonymous: true,
        duration: 24
      });
    }
  };

  const togglePoll = (pollId: string) => {
    setPolls(polls.map(poll => 
      poll.id === pollId ? { ...poll, isActive: !poll.isActive } : poll
    ));
  };

  const deletePoll = (pollId: string) => {
    setPolls(polls.filter(poll => poll.id !== pollId));
  };

  // Timer Functions
  const createTimer = () => {
    if (newTimer.name.trim()) {
      const totalSeconds = newTimer.hours * 3600 + newTimer.minutes * 60 + newTimer.seconds;
      const timer: TimerSession = {
        id: Date.now().toString(),
        name: newTimer.name,
        duration: totalSeconds,
        remainingTime: totalSeconds,
        isRunning: false,
        type: newTimer.type,
        createdAt: new Date()
      };
      
      setTimers([timer, ...timers]);
      setNewTimer({
        name: '',
        hours: 0,
        minutes: 45,
        seconds: 0,
        type: 'class'
      });
    }
  };

  const toggleTimer = (timerId: string) => {
    setTimers(timers.map(timer => 
      timer.id === timerId ? { ...timer, isRunning: !timer.isRunning } : timer
    ));
  };

  const resetTimer = (timerId: string) => {
    setTimers(timers.map(timer => 
      timer.id === timerId ? { ...timer, remainingTime: timer.duration, isRunning: false } : timer
    ));
  };

  const deleteTimer = (timerId: string) => {
    setTimers(timers.filter(timer => timer.id !== timerId));
  };

  // Meeting Functions
  const createMeeting = () => {
    if (newMeeting.title.trim()) {
      const meeting: MeetingRecord = {
        id: Date.now().toString(),
        title: newMeeting.title,
        date: new Date(),
        participants: newMeeting.participants.split(',').map(p => p.trim()).filter(p => p),
        agenda: newMeeting.agenda.split('\n').filter(a => a.trim()),
        decisions: [],
        actionItems: [],
        notes: newMeeting.notes
      };
      
      setMeetings([meeting, ...meetings]);
      setNewMeeting({
        title: '',
        participants: '',
        agenda: '',
        notes: ''
      });
    }
  };

  // 학생 추가 함수
  const addStudent = () => {
    if (newStudent.name.trim()) {
      const student: Student = {
        id: Date.now().toString(),
        name: newStudent.name,
        gender: newStudent.gender,
        ability: newStudent.ability,
        personality: newStudent.personality,
        friends: newStudent.friends.split(',').map(name => {
          const friend = students.find(s => s.name.trim() === name.trim());
          return friend ? friend.id : '';
        }).filter(id => id),
        avoid: newStudent.avoid.split(',').map(name => {
          const avoidStudent = students.find(s => s.name.trim() === name.trim());
          return avoidStudent ? avoidStudent.id : '';
        }).filter(id => id)
      };
      
      setStudents([...students, student]);
      setNewStudent({
        name: '',
        gender: '남',
        ability: 'medium',
        personality: 'active',
        friends: '',
        avoid: ''
      });
    }
  };

  const removeStudent = (studentId: string) => {
    setStudents(students.filter(s => s.id !== studentId));
  };

  // Group Formation Functions
  const generateGroups = () => {
    setIsGeneratingGroups(true);
    
    // Simulate algorithm processing
    setTimeout(() => {
      const shuffledStudents = [...students];
      const newGroups: Group[] = [];
      const usedStudents = new Set<string>();
      
      // Smart group formation algorithm
      const numGroups = Math.ceil(students.length / groupSettings.groupSize);
      
      for (let i = 0; i < numGroups; i++) {
        const groupMembers: Student[] = [];
        
        // First, try to add a leader if required
        if (groupSettings.leaderInEachGroup) {
          const availableLeaders = shuffledStudents.filter(s => 
            s.personality === 'leader' && !usedStudents.has(s.id)
          );
          if (availableLeaders.length > 0) {
            const leader = availableLeaders[0];
            groupMembers.push(leader);
            usedStudents.add(leader.id);
          }
        }
        
        // Fill remaining spots
        while (groupMembers.length < groupSettings.groupSize && usedStudents.size < students.length) {
          const availableStudents = shuffledStudents.filter(s => !usedStudents.has(s.id));
          if (availableStudents.length === 0) break;
          
          let selectedStudent = availableStudents[0];
          
          // Try to balance gender if enabled
          if (groupSettings.genderBalance && groupMembers.length > 0) {
            const maleCount = groupMembers.filter(m => m.gender === '남').length;
            const femaleCount = groupMembers.filter(m => m.gender === '여').length;
            
            if (maleCount > femaleCount) {
              const females = availableStudents.filter(s => s.gender === '여');
              if (females.length > 0) selectedStudent = females[0];
            } else if (femaleCount > maleCount) {
              const males = availableStudents.filter(s => s.gender === '남');
              if (males.length > 0) selectedStudent = males[0];
            }
          }
          
          // Consider friend preferences
          if (groupSettings.considerFriends && groupMembers.length > 0) {
            const friendsInGroup = availableStudents.filter(s => 
              s.friends.some(friendId => groupMembers.some(m => m.id === friendId))
            );
            if (friendsInGroup.length > 0) {
              selectedStudent = friendsInGroup[0];
            }
          }
          
          // Avoid placing students who shouldn't be together
          if (groupSettings.considerAvoid) {
            const hasConflict = selectedStudent.avoid.some(avoidId => 
              groupMembers.some(m => m.id === avoidId)
            );
            if (hasConflict) {
              const alternativeStudents = availableStudents.filter(s => 
                !s.avoid.some(avoidId => groupMembers.some(m => m.id === avoidId))
              );
              if (alternativeStudents.length > 0) {
                selectedStudent = alternativeStudents[0];
              }
            }
          }
          
          groupMembers.push(selectedStudent);
          usedStudents.add(selectedStudent.id);
        }
        
        if (groupMembers.length > 0) {
          const leader = groupMembers.find(m => m.personality === 'leader') || groupMembers[0];
          newGroups.push({
            id: (i + 1).toString(),
            name: `${i + 1}조`,
            members: groupMembers,
            leader,
            createdAt: new Date()
          });
        }
      }
      
      setGroups(newGroups);
      setIsGeneratingGroups(false);
    }, 2000);
  };

  const shuffleGroups = () => {
    generateGroups();
  };

  const exportGroups = () => {
    const groupData = groups.map(group => ({
      조명: group.name,
      조장: group.leader?.name,
      조원: group.members.map(m => m.name).join(', ')
    }));
    
    const csv = [
      '조명,조장,조원',
      ...groupData.map(g => `${g.조명},${g.조장 ?? ''},${g.조원}`)
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '조_편성_결과.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Helper Functions
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = (type: string) => {
    switch (type) {
      case 'class': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'break': return 'bg-green-100 text-green-700 border-green-200';
      case 'activity': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'exam': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTotalVotes = (poll: Poll) => {
    return Object.values(poll.votes).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Logo size="sm" />
              <div>
                <h1 style={{ fontFamily: "'Noto Serif KR', serif" }}>학급 관리 도구</h1>
                <p className="text-sm text-gray-500">투표 • 타이머 • 회의 기록</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button size="sm" variant="outline" onClick={onBack}>
                홈으로
              </Button>
              
              <Button size="sm" variant="outline" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>
              
              <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-sm">
                  <div style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>김선생님</div>
                  <div className="text-gray-500">3학년 2반</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-medium mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                스마트 학급 관리! 🎯
              </h2>
              <p className="text-white/80" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
                투표, 타이머, 회의 기록으로 효율적인 학급 운영을 해보세요!
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/70">오늘</div>
              <div className="text-xl font-medium" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
                {new Date().toLocaleDateString('ko-KR')}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="voting" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="voting" className="flex items-center gap-2">
              <Vote className="w-4 h-4" />
              온라인 투표
            </TabsTrigger>
            <TabsTrigger value="timer" className="flex items-center gap-2">
              <Timer className="w-4 h-4" />
              타이머
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              조 편성
            </TabsTrigger>
            <TabsTrigger value="meetings" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              회의 기록
            </TabsTrigger>
          </TabsList>

          {/* Voting System */}
          <TabsContent value="voting" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Create Poll */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-green-500" />
                    새 투표 만들기
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="투표 제목"
                    value={newPoll.title}
                    onChange={(e) => setNewPoll({ ...newPoll, title: e.target.value })}
                  />
                  <Textarea
                    placeholder="투표 설명"
                    value={newPoll.description}
                    onChange={(e) => setNewPoll({ ...newPoll, description: e.target.value })}
                  />
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">선택지</label>
                    {newPoll.options.map((option, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder={`선택지 ${index + 1}`}
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...newPoll.options];
                            newOptions[index] = e.target.value;
                            setNewPoll({ ...newPoll, options: newOptions });
                          }}
                        />
                        {index >= 2 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const newOptions = newPoll.options.filter((_, i) => i !== index);
                              setNewPoll({ ...newPoll, options: newOptions });
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setNewPoll({ ...newPoll, options: [...newPoll.options, ''] })}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      선택지 추가
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="multiple"
                      checked={newPoll.allowMultiple}
                      onCheckedChange={(checked) => setNewPoll({ ...newPoll, allowMultiple: !!checked })}
                    />
                    <label htmlFor="multiple" className="text-sm">복수 선택 허용</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="anonymous"
                      checked={newPoll.anonymous}
                      onCheckedChange={(checked) => setNewPoll({ ...newPoll, anonymous: !!checked })}
                    />
                    <label htmlFor="anonymous" className="text-sm">익명 투표</label>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm">투표 기간:</label>
                    <Select
                      value={newPoll.duration.toString()}
                      onValueChange={(value) => setNewPoll({ ...newPoll, duration: parseInt(value) })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1시간</SelectItem>
                        <SelectItem value="6">6시간</SelectItem>
                        <SelectItem value="24">1일</SelectItem>
                        <SelectItem value="72">3일</SelectItem>
                        <SelectItem value="168">1주</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={createPoll} className="w-full">
                    <Vote className="w-4 h-4 mr-2" />
                    투표 생성
                  </Button>
                </CardContent>
              </Card>

              {/* Active Polls */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">진행 중인 투표</h3>
                  <Badge className="bg-green-100 text-green-700">
                    {polls.filter(p => p.isActive).length}개 활성
                  </Badge>
                </div>

                {polls.map((poll) => (
                  <Card key={poll.id} className={`${poll.isActive ? 'border-green-200 bg-green-50/30' : 'border-gray-200'}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{poll.title}</CardTitle>
                          <CardDescription className="mt-1">{poll.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={poll.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                            {poll.isActive ? '진행중' : '종료'}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => togglePoll(poll.id)}
                          >
                            {poll.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deletePoll(poll.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {poll.options.map((option, index) => {
                          const votes = poll.votes[option] || 0;
                          const totalVotes = getTotalVotes(poll);
                          const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
                          
                          return (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">{option}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-600">{votes}표</span>
                                  <span className="text-xs text-gray-500">({percentage.toFixed(1)}%)</span>
                                </div>
                              </div>
                              <Progress value={percentage} className="h-2" />
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div className="text-sm text-gray-600">
                          총 {getTotalVotes(poll)}표 • {poll.createdAt.toLocaleDateString('ko-KR')}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <BarChart3 className="w-4 h-4 mr-1" />
                            상세 결과
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="w-4 h-4 mr-1" />
                            공유
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Timer System */}
          <TabsContent value="timer" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Create Timer */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-blue-500" />
                    새 타이머
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="타이머 이름"
                    value={newTimer.name}
                    onChange={(e) => setNewTimer({ ...newTimer, name: e.target.value })}
                  />
                  
                  <Select
                    value={newTimer.type}
                    onValueChange={(value: any) => setNewTimer({ ...newTimer, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class">수업</SelectItem>
                      <SelectItem value="break">휴식</SelectItem>
                      <SelectItem value="activity">활동</SelectItem>
                      <SelectItem value="exam">시험</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs text-gray-500">시간</label>
                      <Input
                        type="number"
                        min="0"
                        max="23"
                        value={newTimer.hours}
                        onChange={(e) => setNewTimer({ ...newTimer, hours: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">분</label>
                      <Input
                        type="number"
                        min="0"
                        max="59"
                        value={newTimer.minutes}
                        onChange={(e) => setNewTimer({ ...newTimer, minutes: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">초</label>
                      <Input
                        type="number"
                        min="0"
                        max="59"
                        value={newTimer.seconds}
                        onChange={(e) => setNewTimer({ ...newTimer, seconds: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>

                  <Button onClick={createTimer} className="w-full">
                    <Timer className="w-4 h-4 mr-2" />
                    타이머 생성
                  </Button>
                </CardContent>
              </Card>

              {/* Active Timers */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {timers.map((timer) => (
                    <Card key={timer.id} className={`${timer.isRunning ? 'border-blue-200 bg-blue-50/30' : ''}`}>
                      <CardContent className="p-6 text-center">
                        <div className="flex items-center justify-between mb-3">
                          <Badge className={getTimerColor(timer.type)}>
                            {timer.type === 'class' ? '수업' :
                             timer.type === 'break' ? '휴식' :
                             timer.type === 'activity' ? '활동' : '시험'}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteTimer(timer.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <h4 className="font-medium mb-4">{timer.name}</h4>
                        
                        <div className="text-4xl font-mono font-bold mb-4 text-gray-900">
                          {formatTime(timer.remainingTime)}
                        </div>
                        
                        <Progress 
                          value={((timer.duration - timer.remainingTime) / timer.duration) * 100} 
                          className="mb-4" 
                        />
                        
                        <div className="flex justify-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => toggleTimer(timer.id)}
                            className={timer.isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}
                          >
                            {timer.isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => resetTimer(timer.id)}
                          >
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Group Formation */}
          <TabsContent value="groups" className="space-y-6">
            {/* Top Section - Student Management & Settings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Student Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-500" />
                    학생 관리
                  </CardTitle>
                  <CardDescription>
                    조편성을 위한 학생 정보를 관리합니다
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">학생 이름</label>
                      <Input
                        placeholder="학생 이름"
                        value={newStudent.name}
                        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">성별</label>
                      <Select
                        value={newStudent.gender}
                        onValueChange={(value) => setNewStudent({ ...newStudent, gender: value as '남' | '여' })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="남">남</SelectItem>
                          <SelectItem value="여">여</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">학습 능력</label>
                      <Select
                        value={newStudent.ability}
                        onValueChange={(value) => setNewStudent({ ...newStudent, ability: value as 'high' | 'medium' | 'low' })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">상</SelectItem>
                          <SelectItem value="medium">중</SelectItem>
                          <SelectItem value="low">하</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">성격 유형</label>
                      <Select
                        value={newStudent.personality}
                        onValueChange={(value) => setNewStudent({ ...newStudent, personality: value as 'active' | 'quiet' | 'leader' | 'helper' })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="leader">리더형</SelectItem>
                          <SelectItem value="active">활발형</SelectItem>
                          <SelectItem value="helper">도움형</SelectItem>
                          <SelectItem value="quiet">조용형</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">친한 친구 (쉼표로 구분)</label>
                      <Input
                        placeholder="김민수, 박지영"
                        value={newStudent.friends}
                        onChange={(e) => setNewStudent({ ...newStudent, friends: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">갈등 관계 (쉼표로 구분)</label>
                      <Input
                        placeholder="이철수, 최영희"
                        value={newStudent.avoid}
                        onChange={(e) => setNewStudent({ ...newStudent, avoid: e.target.value })}
                      />
                    </div>
                    
                    <Button onClick={addStudent} className="w-full" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      학생 추가
                    </Button>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium mb-2">등록된 학생 ({students.length}명)</h4>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {students.map((student) => (
                        <div key={student.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                          <div>
                            <span className="font-medium">{student.name}</span>
                            <div className="text-xs text-gray-500">
                              {student.gender} • {student.ability === 'high' ? '상' : student.ability === 'medium' ? '중' : '하'}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeStudent(student.id)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Group Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-purple-500" />
                    조 편성 설정
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">한 조당 인원수</label>
                    <Select
                      value={groupSettings.groupSize.toString()}
                      onValueChange={(value) => setGroupSettings({ ...groupSettings, groupSize: parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3명</SelectItem>
                        <SelectItem value="4">4명</SelectItem>
                        <SelectItem value="5">5명</SelectItem>
                        <SelectItem value="6">6명</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="genderBalance"
                        checked={groupSettings.genderBalance}
                        onCheckedChange={(checked) => setGroupSettings({ ...groupSettings, genderBalance: !!checked })}
                      />
                      <label htmlFor="genderBalance" className="text-sm">성별 균형 맞추기</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="abilityBalance"
                        checked={groupSettings.abilityBalance}
                        onCheckedChange={(checked) => setGroupSettings({ ...groupSettings, abilityBalance: !!checked })}
                      />
                      <label htmlFor="abilityBalance" className="text-sm">실력 균형 맞추기</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="considerFriends"
                        checked={groupSettings.considerFriends}
                        onCheckedChange={(checked) => setGroupSettings({ ...groupSettings, considerFriends: !!checked })}
                      />
                      <label htmlFor="considerFriends" className="text-sm">친한 친구 고려</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="considerAvoid"
                        checked={groupSettings.considerAvoid}
                        onCheckedChange={(checked) => setGroupSettings({ ...groupSettings, considerAvoid: !!checked })}
                      />
                      <label htmlFor="considerAvoid" className="text-sm">갈등 관계 배제</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="leaderInEachGroup"
                        checked={groupSettings.leaderInEachGroup}
                        onCheckedChange={(checked) => setGroupSettings({ ...groupSettings, leaderInEachGroup: !!checked })}
                      />
                      <label htmlFor="leaderInEachGroup" className="text-sm">각 조에 리더 배치</label>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={generateGroups}
                    disabled={isGeneratingGroups}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
                  >
                    {isGeneratingGroups ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        조 편성 중...
                      </>
                    ) : (
                      <>
                        <Users className="w-4 h-4 mr-2" />
                        조 편성하기
                      </>
                    )}
                  </Button>
                  
                  {groups.length > 0 && (
                    <div className="flex gap-2">
                      <Button 
                        onClick={shuffleGroups}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <RefreshCw className="w-4 h-4 mr-1" />
                        다시 편성
                      </Button>
                      <Button 
                        onClick={exportGroups}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        내보내기
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Bottom Section - Generated Groups Results */}
            <div className="w-full">
                {groups.length === 0 ? (
                  <Card className="h-96 flex items-center justify-center">
                    <CardContent className="text-center">
                      <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-2">조 편성을 시작해보세요</h3>
                      <p className="text-gray-500">설정을 조정하고 '조 편성하기' 버튼을 눌러주세요</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">편성된 조 ({groups.length}개)</h3>
                      <Badge className="bg-green-100 text-green-700">
                        총 {groups.reduce((sum, g) => sum + g.members.length, 0)}명
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {groups.map((group) => (
                        <Card key={group.id} className="hover:shadow-lg transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{group.name}</CardTitle>
                              <Badge variant="outline">{group.members.length}명</Badge>
                            </div>
                            {group.leader && (
                              <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm text-gray-600">조장: {group.leader.name}</span>
                              </div>
                            )}
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {group.members.map((member) => (
                                <div 
                                  key={member.id} 
                                  className={`flex items-center justify-between p-2 rounded ${
                                    member.id === group.leader?.id ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${
                                      member.gender === '남' ? 'bg-blue-400' : 'bg-pink-400'
                                    }`}></div>
                                    <span className="font-medium text-sm">{member.name}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Badge 
                                      variant="outline" 
                                      className={`text-xs ${
                                        member.ability === 'high' ? 'bg-green-50 text-green-700' :
                                        member.ability === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                                        'bg-red-50 text-red-700'
                                      }`}
                                    >
                                      {member.ability === 'high' ? '상' : 
                                       member.ability === 'medium' ? '중' : '하'}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {member.personality === 'leader' ? '리더' :
                                       member.personality === 'active' ? '활발' :
                                       member.personality === 'quiet' ? '차분' : '협력'}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <div className="mt-3 pt-3 border-t text-xs text-gray-500">
                              <div className="flex justify-between">
                                <span>남: {group.members.filter(m => m.gender === '남').length}명</span>
                                <span>여: {group.members.filter(m => m.gender === '여').length}명</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </TabsContent>

          {/* Meeting Records */}
          <TabsContent value="meetings" className="space-y-6">
            {/* Blackboard Style Meeting Notes */}
            <Card className="bg-slate-800 border-slate-600">
              <CardHeader className="border-b border-slate-600">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <MessageSquare className="w-5 h-5 text-green-400" />
                    학급회의 칠판
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="border-slate-500 text-slate-300">
                      <Save className="w-4 h-4 mr-2" />
                      저장
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-500 text-slate-300">
                      <Trash2 className="w-4 h-4 mr-2" />
                      지우기
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Meeting Title */}
                  <div className="text-center mb-8">
                    <Input
                      placeholder="═══ 회의 제목을 입력하세요 ═══"
                      value={newMeeting.title}
                      onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                      className="bg-transparent border-0 text-center text-2xl text-white placeholder-slate-400 font-mono"
                    />
                  </div>

                  {/* Blackboard Content */}
                  <div className="bg-slate-900 p-6 rounded-lg border-2 border-slate-600 min-h-96">
                    <Textarea
                      placeholder="▣ 참석자: &#10;│ ○ &#10;│ ○ &#10;│ ○ &#10;&#10;▣ 안건:&#10;│ 1. &#10;│ 2. &#10;│ 3. &#10;&#10;▣ 논의내용:&#10;│ • &#10;│ • &#10;│ &#10;│ ┌─────────────────────┐&#10;│ │ 중요한 결정사항!     │&#10;│ └─────────────────────┘&#10;│ ➤ &#10;│ &#10;│ ◈ 다음 회의: __월 __일&#10;│ &#10;│ ※ 메모: &#10;│ &#10;│ &#10;═══════════════════════════════"
                      value={newMeeting.notes}
                      onChange={(e) => setNewMeeting({ ...newMeeting, notes: e.target.value })}
                      className="bg-transparent border-0 text-green-400 placeholder-slate-500 font-mono text-sm leading-relaxed min-h-80 resize-none"
                      style={{ 
                        fontFamily: "'Courier New', monospace",
                        whiteSpace: 'pre-wrap'
                      }}
                    />
                  </div>

                  {/* Chalk Tools */}
                  <div className="flex items-center justify-between border-t border-slate-600 pt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-sm">칠판 도구:</span>
                      <div className="flex items-center gap-1">
                        {['▣', '│', '○', '•', '➤', '◈', '※', '═', '┌', '┐', '└', '┘'].map((symbol, index) => (
                          <Button
                            key={index}
                            size="sm"
                            variant="outline"
                            className="w-8 h-8 p-0 border-slate-500 text-green-400 font-mono"
                            onClick={() => {
                              const textarea = document.querySelector('.bg-slate-900 textarea') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const end = textarea.selectionEnd;
                                const currentValue = newMeeting.notes;
                                const newValue = currentValue.substring(0, start) + symbol + currentValue.substring(end);
                                setNewMeeting({ ...newMeeting, notes: newValue });
                                
                                // Reset cursor position
                                setTimeout(() => {
                                  textarea.selectionStart = textarea.selectionEnd = start + 1;
                                  textarea.focus();
                                }, 0);
                              }
                            }}
                          >
                            {symbol}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={createMeeting} 
                      className="bg-green-600 hover:bg-green-700"
                      disabled={!newMeeting.title.trim() && !newMeeting.notes.trim()}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      칠판 내용 저장
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Saved Meeting Records */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">회의 기록</h3>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  전체 다운로드
                </Button>
              </div>

              {meetings.map((meeting) => (
                <Card key={meeting.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{meeting.title}</CardTitle>
                        <CardDescription>
                          {meeting.date.toLocaleDateString('ko-KR')} • 참석자 {meeting.participants.length}명
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h5 className="font-medium mb-2">참석자</h5>
                      <div className="flex flex-wrap gap-1">
                        {meeting.participants.map((participant, index) => (
                          <Badge key={index} variant="outline">{participant}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">안건</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        {meeting.agenda.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">결정사항</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        {meeting.decisions.map((decision, index) => (
                          <li key={index}>{decision}</li>
                        ))}
                      </ul>
                    </div>

                    {meeting.actionItems.length > 0 && (
                      <div>
                        <h5 className="font-medium mb-2">실행 과제</h5>
                        <div className="space-y-2">
                          {meeting.actionItems.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className={`w-4 h-4 ${item.completed ? 'text-green-500' : 'text-gray-400'}`} />
                              <span className={item.completed ? 'line-through text-gray-500' : 'text-gray-700'}>
                                {item.task} - {item.assignee}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h5 className="font-medium mb-2">메모</h5>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{meeting.notes}</p>
                    </div>

                    {meeting.nextMeeting && (
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <Calendar className="w-4 h-4" />
                        다음 회의: {meeting.nextMeeting.toLocaleDateString('ko-KR')}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}