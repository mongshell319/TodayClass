import { useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from './utils/storage';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Logo } from './Logo';
import { 
  Calendar as CalendarIcon,
  Users,
  BookOpen,
  Plus,
  Search,
  Settings,
  Bell,
  User,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Star,
  Phone,
  Mail,
  MapPin,
  Edit,
  Trash2,
  Save,
  Filter,
  Download,
  Upload,
  MessageCircle,
  UserCheck,
  UserX,
  Award
} from 'lucide-react';

interface TeacherDashboardProps {
  onNavigateToSchoolQuest: () => void;
  onBack: () => void;
}

interface TodoItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: Date;
  completed: boolean;
  category: '업무' | '회의' | '개인' | '기타';
}

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  lastModified: Date;
  tags: string[];
}

interface Student {
  id: string;
  name: string;
  studentId: string;
  class: string;
  grade: number;
  phone: string;
  email: string;
  parentName: string;
  parentPhone: string;
  address: string;
  status: 'active' | 'inactive' | 'transferred';
  notes: string;
  avatar?: string;
}

export function TeacherDashboard({ onNavigateToSchoolQuest, onBack }: TeacherDashboardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const defaultTodos: TodoItem[] = [
    {
      id: '1',
      title: '성적 입력 마감',
      description: '3학년 전체 성적 시스템 입력',
      priority: 'high',
      dueDate: new Date(2024, 10, 15),
      completed: false,
      category: '업무'
    },
    {
      id: '2',
      title: '학부모 상담 준비',
      description: '김민수 학부모 상담 자료 준비',
      priority: 'medium',
      dueDate: new Date(2024, 10, 18),
      completed: false,
      category: '회의'
    },
    {
      id: '3',
      title: '교육과정 회의',
      description: '내년도 교육과정 논의',
      priority: 'medium',
      dueDate: new Date(2024, 10, 20),
      completed: true,
      category: '회의'
    },
    {
      id: '4',
      title: '개인 연수 신청',
      description: 'AI 교육 연수 프로그램 신청',
      priority: 'low',
      dueDate: new Date(2024, 10, 25),
      completed: false,
      category: '개인'
    }
  ];
  const [todos, setTodos] = useState<TodoItem[]>(() =>
    loadFromStorage<TodoItem[]>('todayclass-todos', defaultTodos)
  );

  // localStorage 자동 저장
  useEffect(() => { saveToStorage('todayclass-todos', todos); }, [todos]);
  useEffect(() => { saveToStorage('todayclass-notes', notes); }, [notes]);
  useEffect(() => { saveToStorage('todayclass-dashboard-students', students); }, [students]);

  // 달력에 일정 표시를 위한 효과
  useEffect(() => {
    const timer = setTimeout(() => {
      const calendarGrid = document.querySelector('.calendar-with-events [role="grid"]');
      if (calendarGrid) {
        // 모든 날짜 셀에서 기존 색깔 줄 제거
        const allCells = calendarGrid.querySelectorAll('[role="gridcell"]');
        allCells.forEach(cell => {
          const button = cell.querySelector('button');
          if (button) {
            button.style.position = 'relative';
            // 기존 색깔 줄 제거
            const existingIndicator = button.querySelector('.date-indicator');
            if (existingIndicator) {
              existingIndicator.remove();
            }
          }
        });

        // 일정이 있는 날짜에 색깔 줄 추가
        todos.forEach(todo => {
          const todoDate = new Date(todo.dueDate);
          const dateStr = todoDate.getDate().toString();
          
          // 해당 날짜의 버튼 찾기
          allCells.forEach(cell => {
            const button = cell.querySelector('button');
            if (button && button.textContent?.trim() === dateStr) {
              // 이미 표시기가 있는지 확인
              if (!button.querySelector('.date-indicator')) {
                const indicator = document.createElement('div');
                indicator.className = 'date-indicator';
                indicator.style.cssText = `
                  position: absolute;
                  bottom: 2px;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 20px;
                  height: 3px;
                  border-radius: 2px;
                  background: ${
                    todo.priority === 'high' ? '#ef4444' :
                    todo.priority === 'medium' ? '#eab308' : '#22c55e'
                  };
                `;
                button.appendChild(indicator);
              }
            }
          });
        });
      }
    }, 100); // 달력이 렌더링될 시간을 기다림

    return () => clearTimeout(timer);
  }, [todos, selectedDate]);

  const defaultNotes: Note[] = [
    {
      id: '1',
      title: '오늘의 학급 일지',
      content: '김민수 학생이 수학에 대한 흥미를 보이기 시작했다. 추가 문제집을 추천해주면 좋겠다.\n\n박지영 학생은 최근 성적이 향상되고 있어 격려가 필요하다.',
      createdAt: new Date(2024, 10, 1),
      lastModified: new Date(2024, 10, 1),
      tags: ['학급관리', '학생상담']
    },
    {
      id: '2',
      title: '학부모 상담 메모',
      content: '이철수 어머니와 상담\n- 집에서의 학습 태도 개선 필요\n- 스마트폰 사용 시간 제한 약속\n- 다음 상담: 2주 후',
      createdAt: new Date(2024, 9, 28),
      lastModified: new Date(2024, 9, 28),
      tags: ['학부모상담', '생활지도']
    },
    {
      id: '3',
      title: '아이디어 노트',
      content: '게임화 학습 방법 아이디어:\n1. 수학 문제 풀이를 RPG 퀘스트로 만들기\n2. 학급 전체가 함께하는 협력 미션\n3. 개인별 성취도에 따른 배지 시스템',
      createdAt: new Date(2024, 9, 25),
      lastModified: new Date(2024, 10, 1),
      tags: ['교육혁신', '게임화학습']
    }
  ];
  const [notes, setNotes] = useState<Note[]>(() =>
    loadFromStorage<Note[]>('todayclass-notes', defaultNotes)
  );

  const defaultStudents: Student[] = [
    {
      id: '1',
      name: '김민수',
      studentId: '20241001',
      class: '3학년 2반',
      grade: 3,
      phone: '010-1234-5678',
      email: 'minsu.kim@email.com',
      parentName: '김아버지',
      parentPhone: '010-1111-2222',
      address: '서울시 강남구 테헤란로 123',
      status: 'active',
      notes: '수학에 재능이 있음. 추가 심화 문제 필요',
      avatar: undefined
    },
    {
      id: '2',
      name: '박지영',
      studentId: '20241002',
      class: '3학년 2반',
      grade: 3,
      phone: '010-2345-6789',
      email: 'jiyoung.park@email.com',
      parentName: '박어머니',
      parentPhone: '010-2222-3333',
      address: '서울시 서초구 서초대로 456',
      status: 'active',
      notes: '성실하고 책임감이 강함',
      avatar: undefined
    },
    {
      id: '3',
      name: '이철수',
      studentId: '20241003',
      class: '3학년 2반',
      grade: 3,
      phone: '010-3456-7890',
      email: 'cheolsu.lee@email.com',
      parentName: '이어머니',
      parentPhone: '010-3333-4444',
      address: '서울시 송파구 올림픽로 789',
      status: 'active',
      notes: '활발한 성격, 리더십 있음',
      avatar: undefined
    },
    {
      id: '4',
      name: '최영희',
      studentId: '20241004',
      class: '3학년 2반',
      grade: 3,
      phone: '010-4567-8901',
      email: 'younghee.choi@email.com',
      parentName: '최아버지',
      parentPhone: '010-4444-5555',
      address: '서울시 마포구 홍익로 321',
      status: 'active',
      notes: '예술적 재능이 뛰어남',
      avatar: undefined
    }
  ];
  const [students, setStudents] = useState<Student[]>(() =>
    loadFromStorage<Student[]>('todayclass-dashboard-students', defaultStudents)
  );

  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    dueDate: new Date(),
    category: '업무' as '업무' | '회의' | '개인' | '기타'
  });

  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [editingNote, setEditingNote] = useState<string | null>(null);
  
  // 학생 수정/상담 관련 state
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCounselingDialogOpen, setIsCounselingDialogOpen] = useState(false);
  const [selectedStudentForCounseling, setSelectedStudentForCounseling] = useState<Student | null>(null);
  const [counselingRecord, setCounselingRecord] = useState({
    date: new Date().toISOString().split('T')[0],
    type: '학습상담' as '학습상담' | '생활상담' | '진로상담' | '학부모상담',
    content: '',
    followUp: ''
  });

  const addTodo = () => {
    if (newTodo.title.trim()) {
      const todo: TodoItem = {
        id: Date.now().toString(),
        title: newTodo.title,
        description: newTodo.description,
        priority: newTodo.priority,
        dueDate: newTodo.dueDate,
        completed: false,
        category: newTodo.category
      };
      setTodos([...todos, todo]);
      setNewTodo({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: new Date(),
        category: '업무'
      });
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const addNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        createdAt: new Date(),
        lastModified: new Date(),
        tags: newNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      setNotes([note, ...notes]);
      setNewNote({ title: '', content: '', tags: '' });
    }
  };

  const updateNote = (id: string, updatedNote: Partial<Note>) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, ...updatedNote, lastModified: new Date() }
        : note
    ));
    setEditingNote(null);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // 학생 수정/상담 함수들
  const openEditDialog = (student: Student) => {
    setEditingStudent({ ...student });
    setIsEditDialogOpen(true);
  };

  const saveStudentChanges = () => {
    if (editingStudent) {
      setStudents(students.map(student => 
        student.id === editingStudent.id ? editingStudent : student
      ));
      setIsEditDialogOpen(false);
      setEditingStudent(null);
    }
  };

  const openCounselingDialog = (student: Student) => {
    setSelectedStudentForCounseling(student);
    setIsCounselingDialogOpen(true);
  };

  const saveCounselingRecord = () => {
    if (selectedStudentForCounseling && counselingRecord.content.trim()) {
      // 상담 기록을 메모에 추가
      const counselingNote: Note = {
        id: Date.now().toString(),
        title: `${selectedStudentForCounseling.name} 학생 ${counselingRecord.type}`,
        content: `📅 상담일: ${counselingRecord.date}\n📋 상담유형: ${counselingRecord.type}\n\n📝 상담내용:\n${counselingRecord.content}\n\n📌 후속조치:\n${counselingRecord.followUp || '없음'}`,
        createdAt: new Date(),
        lastModified: new Date(),
        tags: ['상담기록', counselingRecord.type, selectedStudentForCounseling.name]
      };
      
      setNotes([counselingNote, ...notes]);
      setIsCounselingDialogOpen(false);
      setSelectedStudentForCounseling(null);
      setCounselingRecord({
        date: new Date().toISOString().split('T')[0],
        type: '학습상담',
        content: '',
        followUp: ''
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      case 'low': return <CheckCircle2 className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'transferred': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.includes(searchTerm) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const todaysDate = new Date();
  const todaysTodos = todos.filter(todo => {
    const todoDate = new Date(todo.dueDate);
    return todoDate.toDateString() === todaysDate.toDateString();
  });

  const upcomingTodos = todos.filter(todo => {
    const todoDate = new Date(todo.dueDate);
    const daysDiff = Math.ceil((todoDate.getTime() - todaysDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff > 0 && daysDiff <= 7;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Logo size="sm" />
              <div>
                <h1 style={{ fontFamily: "'Noto Serif KR', serif" }}>선생님 워크스페이스</h1>
                <p className="text-sm text-gray-500">업무 관리 & 학생 관리</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button size="sm" variant="outline" onClick={onBack}>
                홈으로
              </Button>
              
              <Button 
                size="sm" 
                onClick={onNavigateToSchoolQuest}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                School Quest
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
                  <div className="text-gray-500">담임교사</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-slate-500 via-purple-500 to-pink-500 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-medium mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                좋은 하루입니다, 김선생님! 👋
              </h2>
              <p className="text-white/80" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
                오늘 할 일 {todaysTodos.length}개가 있어요. 체계적으로 관리해보세요!
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
        <Tabs defaultValue="todos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="todos" className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              업무 관리
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              메모장
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              학생 관리
            </TabsTrigger>
          </TabsList>

          {/* Todo Management */}
          <TabsContent value="todos" className="space-y-6">
            {/* Main Layout: Left Calendar + Right Todo Sections */}
            <div className="grid grid-cols-2 gap-6 h-[calc(100vh-300px)]">
              
              {/* Left Side - Calendar */}
              <div className="space-y-6">
                {/* Large Calendar */}
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-blue-500" />
                      업무 달력
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center h-full">
                    <div className="transform scale-150 mb-6 calendar-with-events">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border-0"
                      />
                    </div>
                    

                  </CardContent>
                </Card>
              </div>

              {/* Right Side - Todo Sections */}
              <div className="space-y-6 flex flex-col">
                
                {/* Today's Todos - Top Right */}
                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      오늘 할 일 ({todaysTodos.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 h-full overflow-y-auto">
                    {todaysTodos.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">오늘 할 일이 없습니다. 🎉</p>
                    ) : (
                      todaysTodos.map((todo) => (
                        <div key={todo.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <Checkbox
                            checked={todo.completed}
                            onCheckedChange={() => toggleTodo(todo.id)}
                            className="mt-1"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h4 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                {todo.title}
                              </h4>
                              <Badge size="sm" className={getPriorityColor(todo.priority)}>
                                {getPriorityIcon(todo.priority)}
                                <span className="ml-1">
                                  {todo.priority === 'high' ? '높음' : 
                                   todo.priority === 'medium' ? '보통' : '낮음'}
                                </span>
                              </Badge>
                              <Badge size="sm" variant="outline">
                                {todo.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{todo.description}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteTodo(todo.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-2 gap-6">
              
              {/* Add New Todo - Bottom Left */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-green-500" />
                    새 할 일 추가
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="할 일 제목"
                      value={newTodo.title}
                      onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    />
                    <Select
                      value={newTodo.category}
                      onValueChange={(value: any) => setNewTodo({ ...newTodo, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="업무">업무</SelectItem>
                        <SelectItem value="회의">회의</SelectItem>
                        <SelectItem value="개인">개인</SelectItem>
                        <SelectItem value="기타">기타</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea
                    placeholder="상세 설명"
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    rows={3}
                  />
                  <div className="flex items-center gap-4">
                    <Select
                      value={newTodo.priority}
                      onValueChange={(value: any) => setNewTodo({ ...newTodo, priority: value })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">높음</SelectItem>
                        <SelectItem value="medium">보통</SelectItem>
                        <SelectItem value="low">낮음</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="date"
                      value={newTodo.dueDate}
                      onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                      className="w-40"
                    />
                    <Button onClick={addTodo} className="ml-auto">
                      <Plus className="w-4 h-4 mr-2" />
                      추가
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* All Todos - Bottom Right */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-purple-500" />
                    전체 업무 목록 ({todos.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 max-h-64 overflow-y-auto">
                  {todos
                    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                    .map((todo) => (
                      <div key={todo.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <Checkbox
                          checked={todo.completed}
                          onCheckedChange={() => toggleTodo(todo.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h4 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {todo.title}
                            </h4>
                            <Badge size="sm" className={getPriorityColor(todo.priority)}>
                              {getPriorityIcon(todo.priority)}
                              <span className="ml-1">
                                {todo.priority === 'high' ? '높음' : 
                                 todo.priority === 'medium' ? '보통' : '낮음'}
                              </span>
                            </Badge>
                            <Badge size="sm" variant="outline">
                              {todo.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{todo.description}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            마감: {new Date(todo.dueDate).toLocaleDateString('ko-KR')}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteTodo(todo.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))
                  }
                  {todos.length === 0 && (
                    <p className="text-gray-500 text-center py-4">등록된 업무가 없습니다.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notes Management */}
          <TabsContent value="notes" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Add New Note */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-green-500" />
                    새 메모 작성
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="메모 제목"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  />
                  <Textarea
                    placeholder="메모 내용을 입력하세요..."
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    rows={18}
                    className="min-h-[40vh]"
                  />
                  <Input
                    placeholder="태그 (쉼표로 구분)"
                    value={newNote.tags}
                    onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                  />
                  <Button onClick={addNote} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    메모 저장
                  </Button>
                </CardContent>
              </Card>

              {/* Notes List */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-medium">메모 목록</h3>
                  <div className="flex-1 relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="메모 검색..."
                      className="pl-10"
                    />
                  </div>
                </div>

                {notes.map((note) => (
                  <Card key={note.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          {editingNote === note.id ? (
                            <Input
                              defaultValue={note.title}
                              onBlur={(e) => updateNote(note.id, { title: e.target.value })}
                              className="font-medium"
                            />
                          ) : (
                            <CardTitle className="text-lg">{note.title}</CardTitle>
                          )}
                          <CardDescription>
                            작성: {note.createdAt.toLocaleDateString('ko-KR')} | 
                            수정: {note.lastModified.toLocaleDateString('ko-KR')}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingNote(editingNote === note.id ? null : note.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteNote(note.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {editingNote === note.id ? (
                        <Textarea
                          defaultValue={note.content}
                          onBlur={(e) => updateNote(note.id, { content: e.target.value })}
                          rows={4}
                        />
                      ) : (
                        <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {note.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Student Management */}
          <TabsContent value="students" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">학생 관리</h3>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="학생 검색..."
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  내보내기
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  학생 추가
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.map((student) => (
                <Card key={student.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {student.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{student.name}</CardTitle>
                        <CardDescription>{student.studentId}</CardDescription>
                        <Badge className={getStatusColor(student.status)} size="sm">
                          {student.status === 'active' ? '재학' : 
                           student.status === 'inactive' ? '휴학' : '전학'}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{student.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-xs">{student.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-xs">{student.address}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-sm mb-1">학부모 정보</h5>
                      <div className="text-sm text-gray-600">
                        <p>{student.parentName} • {student.parentPhone}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-sm mb-1">메모</h5>
                      <p className="text-sm text-gray-600">{student.notes}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => openEditDialog(student)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        수정
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => openCounselingDialog(student)}
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        상담
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* 학생 정보 수정 다이얼로그 */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>학생 정보 수정</DialogTitle>
                  <DialogDescription>
                    {editingStudent?.name} 학생의 정보를 수정합니다.
                  </DialogDescription>
                </DialogHeader>
                
                {editingStudent && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">이름</label>
                      <Input
                        value={editingStudent.name}
                        onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">전화번호</label>
                      <Input
                        value={editingStudent.phone}
                        onChange={(e) => setEditingStudent({ ...editingStudent, phone: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">이메일</label>
                      <Input
                        value={editingStudent.email}
                        onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">주소</label>
                      <Input
                        value={editingStudent.address}
                        onChange={(e) => setEditingStudent({ ...editingStudent, address: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">학부모명</label>
                      <Input
                        value={editingStudent.parentName}
                        onChange={(e) => setEditingStudent({ ...editingStudent, parentName: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">학부모 연락처</label>
                      <Input
                        value={editingStudent.parentPhone}
                        onChange={(e) => setEditingStudent({ ...editingStudent, parentPhone: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">상태</label>
                      <Select
                        value={editingStudent.status}
                        onValueChange={(value) => setEditingStudent({ ...editingStudent, status: value as 'active' | 'inactive' | 'transferred' })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">재학</SelectItem>
                          <SelectItem value="inactive">휴학</SelectItem>
                          <SelectItem value="transferred">전학</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">메모</label>
                      <Textarea
                        value={editingStudent.notes}
                        onChange={(e) => setEditingStudent({ ...editingStudent, notes: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </div>
                )}
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    취소
                  </Button>
                  <Button onClick={saveStudentChanges}>
                    <Save className="w-4 h-4 mr-2" />
                    저장
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            {/* 상담 기록 다이얼로그 */}
            <Dialog open={isCounselingDialogOpen} onOpenChange={setIsCounselingDialogOpen}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>상담 기록 작성</DialogTitle>
                  <DialogDescription>
                    {selectedStudentForCounseling?.name} 학생의 상담 내용을 기록합니다.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">상담일</label>
                    <Input
                      type="date"
                      value={counselingRecord.date}
                      onChange={(e) => setCounselingRecord({ ...counselingRecord, date: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">상담 유형</label>
                    <Select
                      value={counselingRecord.type}
                      onValueChange={(value) => setCounselingRecord({ ...counselingRecord, type: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="학습상담">학습상담</SelectItem>
                        <SelectItem value="생활상담">생활상담</SelectItem>
                        <SelectItem value="진로상담">진로상담</SelectItem>
                        <SelectItem value="학부모상담">학부모상담</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">상담 내용</label>
                    <Textarea
                      placeholder="상담 내용을 상세히 기록해주세요..."
                      value={counselingRecord.content}
                      onChange={(e) => setCounselingRecord({ ...counselingRecord, content: e.target.value })}
                      rows={6}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">후속 조치 (선택사항)</label>
                    <Textarea
                      placeholder="필요한 후속 조치가 있다면 기록해주세요..."
                      value={counselingRecord.followUp}
                      onChange={(e) => setCounselingRecord({ ...counselingRecord, followUp: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCounselingDialogOpen(false)}>
                    취소
                  </Button>
                  <Button onClick={saveCounselingRecord}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    상담 기록 저장
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}