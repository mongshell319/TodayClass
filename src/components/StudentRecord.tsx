import { useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from './utils/storage';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Logo } from './Logo';
import { 
  Brain,
  Sparkles,
  FileText,
  Users,
  TrendingUp,
  Save,
  Copy,
  RefreshCw,
  Download,
  Upload,
  Search,
  Filter,
  Edit,
  Trash2,
  Plus,
  Star,
  Award,
  Target,
  BookOpen,
  User,
  Bell,
  Settings,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  MessageSquare,
  Wand2,
  Eye,
  ThumbsUp,
  ThumbsDown,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

interface StudentRecordProps {
  onBack: () => void;
}

interface Student {
  id: string;
  name: string;
  studentId: string;
  class: string;
  grade: number;
  birthDate: string;
  avatar?: string;
}

interface RecordEntry {
  id: string;
  studentId: string;
  category: '행동특성' | '교과학습발달상황' | '창의적체험활동' | '독서활동';
  subcategory: string;
  content: string;
  aiGenerated: boolean;
  aiSuggestions: string[];
  approved: boolean;
  lastModified: Date;
  semester: '1학기' | '2학기';
  year: number;
}

interface ActivityLog {
  id: string;
  studentId: string;
  date: Date;
  type: 'academic' | 'behavior' | 'activity' | 'reading';
  title: string;
  description: string;
  score?: number;
  tags: string[];
}

interface AITemplate {
  id: string;
  category: string;
  title: string;
  template: string;
  keywords: string[];
  examples: string[];
}

export function StudentRecord({ onBack }: StudentRecordProps) {
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('행동특성');

  // Sample Students
  const students: Student[] = [
    {
      id: '1',
      name: '김민수',
      studentId: '20241001',
      class: '3학년 2반',
      grade: 3,
      birthDate: '2007-03-15'
    },
    {
      id: '2',
      name: '박지영',
      studentId: '20241002',
      class: '3학년 2반',
      grade: 3,
      birthDate: '2007-05-22'
    },
    {
      id: '3',
      name: '이철수',
      studentId: '20241003',
      class: '3학년 2반',
      grade: 3,
      birthDate: '2007-08-10'
    },
    {
      id: '4',
      name: '최영희',
      studentId: '20241004',
      class: '3학년 2반',
      grade: 3,
      birthDate: '2007-11-03'
    }
  ];

  // Activity log management function
  const addActivityLog = () => {
    if (newActivityLog.title.trim() && newActivityLog.description.trim() && selectedStudent) {
      const log: ActivityLog = {
        id: Date.now().toString(),
        studentId: selectedStudent,
        date: new Date(),
        type: newActivityLog.type,
        title: newActivityLog.title,
        description: newActivityLog.description,
        score: newActivityLog.score,
        tags: newActivityLog.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      
      setActivityLogs([log, ...activityLogs]);
      setNewActivityLog({
        type: 'academic',
        title: '',
        description: '',
        score: undefined,
        tags: ''
      });
    }
  };

  // AI Templates
  const aiTemplates: AITemplate[] = [
    {
      id: '1',
      category: '행동특성',
      title: '성실성',
      template: '{학생이름}은(는) 수업에 적극적으로 참여하며, 주어진 과제를 성실히 수행합니다. {구체적활동}을(를) 통해 책임감 있는 모습을 보여주었습니다.',
      keywords: ['성실', '책임감', '과제수행', '수업참여'],
      examples: [
        '김민수는 수업에 적극적으로 참여하며, 주어진 과제를 성실히 수행합니다. 수학 발표 활동을 통해 책임감 있는 모습을 보여주었습니다.',
        '박지영은 매일 일찍 등교하여 학습 준비를 철저히 하며, 과제 제출을 빠뜨리지 않는 성실한 학생입니다.'
      ]
    },
    {
      id: '2',
      category: '행동특성',
      title: '협력',
      template: '{학생이름}은(는) 모둠 활동에서 동료들과 원활하게 소통하며 협력합니다. {협력사례}에서 뛰어난 팀워크를 발휘했습니다.',
      keywords: ['협력', '소통', '팀워크', '모둠활동'],
      examples: [
        '이철수는 모둠 활동에서 동료들과 원활하게 소통하며 협력합니다. 과학 실험 프로젝트에서 뛰��난 팀워크를 발휘했습니다.',
        '최영희는 다른 학생들의 의견을 경청하고 자신의 생각을 명확히 표현하여 모둠 활동의 질을 높였습니다.'
      ]
    },
    {
      id: '3',
      category: '창의적체험활동',
      title: '동아리활동',
      template: '{학생이름}은(는) {동아리명}에서 {활동내용}을(를) 통해 {역량}을(를) 기르고 있습니다. 특히 {특별활동}에서 우수한 성과를 보였습니다.',
      keywords: ['동아리', '협력', '창의성', '전문성'],
      examples: [
        '김민수는 로봇공학 동아리에서 프로그래밍 학습을 통해 논리적 사고력을 기르고 있습니다. 특히 자율주행 로봇 제작에서 우수한 성과를 보였습니다.',
        '박지영은 독서토론 동아리에서 다양한 도서 분석을 통해 비판적 사고력을 기르고 있습니다.'
      ]
    }
  ];

  // Sample Records
  const defaultRecords: RecordEntry[] = [
    {
      id: '1',
      studentId: '1',
      category: '행동특성',
      subcategory: '성실성',
      content: '김민수는 수업에 적극적으로 참여하며, 주어진 과제를 성실히 수행합니다. 수학 발표 활동을 통해 책임감 있는 모습을 보여주었습니다.',
      aiGenerated: true,
      aiSuggestions: [
        '특히 어려운 문제에 직면했을 때도 포기하지 않고 끝까지 해결하려는 의지를 보였습니다.',
        '매일 꼼꼼히 작성하는 학습 일기를 통해 자기 주도적 학습 태도를 갖추고 있습니다.'
      ],
      approved: false,
      lastModified: new Date(),
      semester: '1학기',
      year: 2024
    }
  ];
  const [records, setRecords] = useState<RecordEntry[]>(() =>
    loadFromStorage<RecordEntry[]>('todayclass-records', defaultRecords)
  );

  const [newRecord, setNewRecord] = useState({
    content: '',
    isGenerating: false
  });

  const [aiPrompt, setAiPrompt] = useState('');

  const [newActivityLog, setNewActivityLog] = useState({
    type: 'academic' as 'academic' | 'behavior' | 'activity' | 'reading',
    title: '',
    description: '',
    score: undefined as number | undefined,
    tags: ''
  });

  const defaultActivityLogs: ActivityLog[] = [
    {
      id: '1',
      studentId: '1',
      date: new Date(2024, 10, 1),
      type: 'academic',
      title: '수학 발표 우수',
      description: '이차방정식 단원에서 창의적인 문제 해결 방법 발표',
      score: 95,
      tags: ['수학', '발표', '창의성']
    },
    {
      id: '2',
      studentId: '1',
      date: new Date(2024, 9, 28),
      type: 'behavior',
      title: '학급 임원 활동',
      description: '학습부장으로서 동료 학습 지원 및 학급 분위기 조성',
      tags: ['리더십', '협력', '책임감']
    },
    {
      id: '3',
      studentId: '1',
      date: new Date(2024, 9, 25),
      type: 'activity',
      title: '로봇공학 동아리 활동',
      description: '아두이노를 활용한 자율주행 로봇 제작 프로젝트 참여',
      tags: ['과학', '기술', '협업']
    },
    {
      id: '4',
      studentId: '1',
      date: new Date(2024, 9, 20),
      type: 'reading',
      title: '과학 도서 독서',
      description: '\'코스모스\' 독서 후 감상문 작성 및 발표',
      tags: ['독서', '과학', '표현력']
    }
  ];
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() =>
    loadFromStorage<ActivityLog[]>('todayclass-activity-logs', defaultActivityLogs)
  );

  // localStorage 자동 저장
  useEffect(() => { saveToStorage('todayclass-records', records); }, [records]);
  useEffect(() => { saveToStorage('todayclass-activity-logs', activityLogs); }, [activityLogs]);

  // AI Generation Functions
  const generateWithAI = async (templateId?: string) => {
    setNewRecord({ ...newRecord, isGenerating: true });
    
    // Simulate AI generation
    setTimeout(() => {
      const template = templateId ? aiTemplates.find(t => t.id === templateId) : null;
      const studentName = students.find(s => s.id === selectedStudent)?.name || '학생';
      const studentLogs = activityLogs.filter(log => log.studentId === selectedStudent);
      
      let generatedContent = '';
      
      if (template) {
        // Use template
        generatedContent = template.template
          .replace('{학생이름}', studentName)
          .replace('{구체적활동}', studentLogs[0]?.title || '학습 활동')
          .replace('{동아리명}', '로봇공학 동아리')
          .replace('{활동내용}', '프로그래밍 학습')
          .replace('{역량}', '논리적 사고력')
          .replace('{특별활동}', '자율주행 로봇 제작')
          .replace('{협력사례}', '과학 실험 프로젝트');
      } else if (aiPrompt.trim()) {
        // Use custom prompt
        generatedContent = `${studentName}은(는) ${aiPrompt}에 대해 뛰어난 능력을 보였습니다. 특히 ${studentLogs[0]?.title || '최근 활동'}에서 그 역량을 충분히 발휘했습니다.`;
      } else {
        // Auto-generate based on logs
        const recentLog = studentLogs[0];
        if (recentLog) {
          switch (selectedCategory) {
            case '행동특성':
              generatedContent = `${studentName}은(는) ${recentLog.title}를 통해 ${recentLog.tags.join(', ')} 등의 우수한 특성을 보였습니다. ${recentLog.description}에서 특히 뛰어난 모습을 보여주었습니다.`;
              break;
            case '창의적체험활동':
              generatedContent = `${studentName}은(는) ${recentLog.title} 활동에 적극적으로 참여하였습니다. ${recentLog.description}을 통해 창의성과 협력 능력을 기르고 있습니다.`;
              break;
            default:
              generatedContent = `${studentName}은(는) ${recentLog.title}에서 우수한 성과를 보였습니다.`;
          }
        }
      }
      
      setNewRecord({ 
        content: generatedContent,
        isGenerating: false 
      });
      setAiPrompt('');
    }, 2000);
  };

  const saveRecord = () => {
    if (newRecord.content.trim() && selectedStudent) {
      const record: RecordEntry = {
        id: Date.now().toString(),
        studentId: selectedStudent,
        category: selectedCategory as any,
        subcategory: '자동생성',
        content: newRecord.content,
        aiGenerated: true,
        aiSuggestions: [],
        approved: false,
        lastModified: new Date(),
        semester: '1학기',
        year: 2024
      };
      
      setRecords([record, ...records]);
      setNewRecord({ content: '', isGenerating: false });
    }
  };

  const getStudentLogs = (studentId: string) => {
    return activityLogs.filter(log => log.studentId === studentId);
  };

  const getRecordsForStudent = (studentId: string) => {
    return records.filter(record => record.studentId === studentId);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'behavior': return <Users className="w-4 h-4 text-green-500" />;
      case 'activity': return <Activity className="w-4 h-4 text-purple-500" />;
      case 'reading': return <BookOpen className="w-4 h-4 text-orange-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'academic': return '학습';
      case 'behavior': return '행동';
      case 'activity': return '활동';
      case 'reading': return '독서';
      default: return '기타';
    }
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
                <h1 style={{ fontFamily: "'Noto Serif KR', serif" }}>생활기록부 작성 도우미</h1>
                <p className="text-sm text-gray-500">AI 활용 생활기록부 작성 지원</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button size="sm" variant="outline" onClick={onBack}>
                홈으로
              </Button>
              
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                내보내기
              </Button>
              
              <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
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
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-medium mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                AI 생활기록부 도우미! 🤖✨
              </h2>
              <p className="text-white/80" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
                학생 활동 데이터를 분석하여 생활기록부 작성을 도와드려요!
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/70">작성된 기록</div>
              <div className="text-xl font-medium" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
                {records.length}개
              </div>
            </div>
          </div>
        </div>

        {/* Student Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              학생 선택
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {students.map((student) => (
                <Card 
                  key={student.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedStudent === student.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedStudent(student.id)}
                >
                  <CardContent className="p-4 text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-3">
                      <AvatarImage src={student.avatar} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                        {student.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="font-medium">{student.name}</h4>
                    <p className="text-sm text-gray-600">{student.studentId}</p>
                    <Badge variant="outline" className="mt-2">
                      {student.class}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedStudent && (
          <Tabs defaultValue="ai-writer" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ai-writer" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                AI 작성 도우미
              </TabsTrigger>
              <TabsTrigger value="activity-logs" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                활동 기록
              </TabsTrigger>
              <TabsTrigger value="records" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                작성된 기록
              </TabsTrigger>
            </TabsList>

            {/* AI Writer */}
            <TabsContent value="ai-writer" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* AI Generation Panel */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Wand2 className="w-5 h-5 text-purple-500" />
                        AI 기록 생성
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Select
                          value={selectedCategory}
                          onValueChange={setSelectedCategory}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="행동특성">행동특성 및 종합의견</SelectItem>
                            <SelectItem value="교과학습발달상황">교과학습발달상황</SelectItem>
                            <SelectItem value="창의적체험활동">창의적 체험활동</SelectItem>
                            <SelectItem value="독서활동">독서활동상황</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button 
                          onClick={() => generateWithAI()}
                          disabled={newRecord.isGenerating}
                          className="bg-gradient-to-r from-purple-500 to-pink-500"
                        >
                          {newRecord.isGenerating ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              생성 중...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 mr-2" />
                              자동 생성
                            </>
                          )}
                        </Button>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">맞춤 요청사항 (선택)</label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="예: 수학 성취도가 향상된 점을 강조해주세요"
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                          />
                          <Button 
                            onClick={() => generateWithAI()}
                            disabled={newRecord.isGenerating || !aiPrompt.trim()}
                            variant="outline"
                          >
                            <Brain className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">생성된 내용</label>
                        <Textarea
                          placeholder="AI가 생성한 내용이 여기에 표시됩니다..."
                          value={newRecord.content}
                          onChange={(e) => setNewRecord({ ...newRecord, content: e.target.value })}
                          rows={6}
                          className={newRecord.isGenerating ? 'animate-pulse' : ''}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          onClick={saveRecord}
                          disabled={!newRecord.content.trim()}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          저장
                        </Button>
                        <Button 
                          onClick={() => setNewRecord({ content: '', isGenerating: false })}
                          variant="outline"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          초기화
                        </Button>
                        <Button 
                          onClick={() => navigator.clipboard.writeText(newRecord.content)}
                          variant="outline"
                          disabled={!newRecord.content.trim()}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          복사
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Templates & Tips */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-500" />
                        AI 템플릿
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {aiTemplates
                        .filter(template => template.category === selectedCategory)
                        .map((template) => (
                          <div 
                            key={template.id} 
                            className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => generateWithAI(template.id)}
                          >
                            <h5 className="font-medium text-sm mb-1">{template.title}</h5>
                            <p className="text-xs text-gray-600 mb-2">
                              {template.template.substring(0, 80)}...
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {template.keywords.slice(0, 3).map((keyword, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-500" />
                        작성 팁
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                        <span>구체적인 활동 사례를 포함하세요</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                        <span>학생의 성장과 변화를 강조하세요</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                        <span>긍정적인 표현을 사용하세요</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                        <span>객관적인 근거를 제시하세요</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Activity Logs */}
            <TabsContent value="activity-logs" className="space-y-6">
              {/* Add New Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-green-500" />
                    새 활동 기록 추가
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      value={newActivityLog.type}
                      onValueChange={(value: any) => setNewActivityLog({ ...newActivityLog, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="활동 유형 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">학습 활동</SelectItem>
                        <SelectItem value="behavior">행동 특성</SelectItem>
                        <SelectItem value="activity">체험 활동</SelectItem>
                        <SelectItem value="reading">독서 활동</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Input
                      placeholder="활동 제목"
                      value={newActivityLog.title}
                      onChange={(e) => setNewActivityLog({ ...newActivityLog, title: e.target.value })}
                    />
                  </div>
                  
                  <Textarea
                    placeholder="활동 상세 설명"
                    value={newActivityLog.description}
                    onChange={(e) => setNewActivityLog({ ...newActivityLog, description: e.target.value })}
                    rows={3}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="number"
                      placeholder="점수 (선택사항)"
                      value={newActivityLog.score || ''}
                      onChange={(e) => setNewActivityLog({ ...newActivityLog, score: e.target.value ? parseInt(e.target.value) : undefined })}
                    />
                    
                    <Input
                      placeholder="태그 (쉼표로 구분)"
                      value={newActivityLog.tags}
                      onChange={(e) => setNewActivityLog({ ...newActivityLog, tags: e.target.value })}
                    />
                  </div>
                  
                  <Button 
                    onClick={addActivityLog}
                    disabled={!newActivityLog.title.trim() || !newActivityLog.description.trim()}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    활동 기록 추가
                  </Button>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {getStudentLogs(selectedStudent).map((log) => (
                  <Card key={log.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        {getCategoryIcon(log.type)}
                        <div className="flex-1">
                          <Badge variant="outline" className="mb-2">
                            {getTypeLabel(log.type)}
                          </Badge>
                          <h4 className="font-medium text-sm">{log.title}</h4>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-3">{log.description}</p>
                      
                      {log.score && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm">
                            <span>점수</span>
                            <span className="font-medium">{log.score}점</span>
                          </div>
                          <Progress value={log.score} className="h-2 mt-1" />
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {log.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        {log.date.toLocaleDateString('ko-KR')}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Records */}
            <TabsContent value="records" className="space-y-6">
              <div className="space-y-4">
                {getRecordsForStudent(selectedStudent).map((record) => (
                  <Card key={record.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {record.aiGenerated && <Brain className="w-5 h-5 text-purple-500" />}
                            {record.category} - {record.subcategory}
                          </CardTitle>
                          <CardDescription>
                            {record.year}년 {record.semester} • 
                            수정: {record.lastModified.toLocaleDateString('ko-KR')}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {record.approved ? (
                            <Badge className="bg-green-100 text-green-700">승인됨</Badge>
                          ) : (
                            <Badge variant="outline">검토중</Badge>
                          )}
                          <Button size="sm" variant="ghost">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed mb-4">{record.content}</p>
                      
                      {record.aiSuggestions.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium text-gray-600">AI 추가 제안:</h5>
                          {record.aiSuggestions.map((suggestion, index) => (
                            <div key={index} className="flex items-start gap-2 p-2 bg-blue-50 rounded">
                              <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5" />
                              <span className="text-sm text-blue-700">{suggestion}</span>
                              <Button size="sm" variant="ghost" className="ml-auto">
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                        <Button size="sm" className="bg-green-500 hover:bg-green-600">
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          승인
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          수정
                        </Button>
                        <Button size="sm" variant="outline">
                          <RefreshCw className="w-4 h-4 mr-1" />
                          AI 재생성
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}