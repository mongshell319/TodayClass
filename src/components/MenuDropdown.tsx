import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Menu,
  ShoppingBag,
  Activity,
  Clock,
  CheckCircle,
  X,
  Coins,
  Crown,
  Shirt,
  Palette,
  Users,
  Calendar
} from 'lucide-react';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'shop' | 'activity' | 'requests';
}

function MenuModal({ isOpen, onClose, type }: MenuModalProps) {
  if (!isOpen) return null;

  const renderShopContent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl text-white mb-2">상점</h2>
        <p className="text-gray-300">코인으로 다양한 아이템을 구매하세요. 테마와 장식을 변경하세요.</p>
      </div>

      {/* 테마 페키지 */}
      <div>
        <h3 className="text-lg text-white mb-4">테마 페키지</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/30">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium">물속 신화 테마</h4>
                <Badge className="bg-blue-600 text-white border-0">코인 80</Badge>
              </div>
              <p className="text-gray-300 text-sm">물의 세계로 변환된 뒤 풍선 색상, 실제 패키지 처험 등 실제 새시를 덕에 배경이 변경됩니다.</p>
              <div className="space-y-2">
                <div className="text-xs text-gray-400">시즌 51: 금방 오트</div>
                <div className="text-xs text-gray-400">기본 모습을 지워하는 3일 공약 중 뭔가</div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                보유함
              </Button>
              <div className="text-xs text-gray-400 text-center">이미 보유중 아이템입니다.</div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-500/30">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium">오로라 연구실 테마</h4>
                <Badge className="bg-orange-600 text-white border-0">코인 90</Badge>
              </div>
              <p className="text-gray-300 text-sm">오로라촤 조건 구준 통한 오로라 해치가 시험의 시징후에 배경이 변경됩니다.</p>
              <div className="space-y-2">
                <div className="text-xs text-gray-400">시즌 53: 철새 황송</div>
                <div className="text-xs text-gray-400">사도한 처뭐건든 출장에 오로라 철까지 어어 한다면.</div>
              </div>
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                보유함
              </Button>
              <div className="text-xs text-gray-400 text-center">이미 보유중 아이템입니다.</div>
            </div>
          </Card>
        </div>
      </div>

      {/* 코스튬 장착 */}
      <div>
        <h3 className="text-lg text-white mb-4">코스튬 장착</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium">수호자 주무 복장</h4>
                <Badge className="bg-purple-600 text-white border-0">코인 80</Badge>
              </div>
              <p className="text-gray-300 text-sm">학습 건강을 굉장히 강진력 모면입던 온답 처침 없습니다.</p>
              <div className="space-y-2">
                <div className="text-xs text-gray-400">시즌 51: 굉건 빅죵 만듦기며</div>
                <div className="text-xs text-gray-400">4름 모스를 힘울 시 장히야 15일질 수기를 빠른 동료.</div>
              </div>
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                구매하기
              </Button>
              <div className="text-xs text-gray-400 text-center">코인이 부족하니 역활어입니다.</div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-yellow-900/50 to-amber-900/50 border-yellow-500/30">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium">족력 스머늘 호과</h4>
                <Badge className="bg-yellow-600 text-white border-0">코인 70</Badge>
              </div>
              <p className="text-gray-300 text-sm">학습 잠료 시 빛발어서 쟉력이 호과가 됩씩이어일 지속성 처입니다.</p>
              <div className="space-y-2">
                <div className="text-xs text-gray-400">시즌 53: 족력 팩화 반복기며</div>
                <div className="text-xs text-gray-400">역될 밴층놈을 심질 시 탱하여 고젤 시기해까지 촉음합니다.</div>
              </div>
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                구매하기
              </Button>
              <div className="text-xs text-gray-400 text-center">재료 7개미</div>
            </div>
          </Card>
        </div>
      </div>

      {/* 소모품 */}
      <div>
        <h3 className="text-lg text-white mb-4">소모품</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/30">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium">집중 토닉 세트</h4>
                <Badge className="bg-green-600 text-white border-0">코인 45</Badge>
              </div>
              <p className="text-gray-300 text-sm">다음 포스터의 정뭘을 획동 15일 초기일어서 더.</p>
              <div className="space-y-2">
                <div className="text-xs text-gray-400">시즌 51: 홍즌 통격 반복기며</div>
                <div className="text-xs text-gray-400">시즌 접근을 힘울 시 장히어 15일질 수기를 빠른 동료.</div>
              </div>
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                구매하기
              </Button>
              <div className="text-xs text-gray-400 text-center">재료 7개미</div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-red-900/50 to-pink-900/50 border-red-500/30">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium">팀워크 부스터</h4>
                <Badge className="bg-red-600 text-white border-0">코인 60</Badge>
              </div>
              <p className="text-gray-300 text-sm">슾민뜨 더윰 유동감 클질이 뭔원시 트램월 3고 스터거닙니다.</p>
              <div className="space-y-2">
                <div className="text-xs text-gray-400">시즌 53: 골밤 값즈 반복기며</div>
                <div className="text-xs text-gray-400">다윰 정선용 휠정 시 팀원으로 작해 2고 충을명니다.</div>
              </div>
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                구매하기
              </Button>
              <div className="text-xs text-gray-400 text-center">재료 7개미</div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500/30">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium">종합 제치 킷톰</h4>
                <Badge className="bg-indigo-600 text-white border-0">코인 35</Badge>
              </div>
              <p className="text-gray-300 text-sm">저러니더 피드룽 흔정뜰 실에 흘리 여어예 훨씬이 울릴라 흐릅 니다.</p>
              <div className="space-y-2">
                <div className="text-xs text-gray-400">시즌 52: 측처 현실 만듦기며</div>
                <div className="text-xs text-gray-400">지러니러 피드룽 흔장 출장엇브래 활동하는 모은 흐릅니다.</div>
              </div>
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                구매하기
              </Button>
              <div className="text-xs text-gray-400 text-center">재료 7개미</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderActivityContent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl text-white mb-2">활동 피드</h2>
        <p className="text-gray-300">다른 학생들의 활동을 확인하세요. 응원하세요.</p>
      </div>

      <div className="space-y-4">
        <Card className="p-4 bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">신</span>
                </div>
                <div>
                  <div className="text-white font-medium">신민성 상급</div>
                  <div className="text-gray-400 text-sm">2025. 9. 28. 오전 9:50:56</div>
                </div>
              </div>
            </div>
            <p className="text-gray-300">신민성민이 목표 선택 테마(활동) 특격었어요.</p>
            <div className="text-gray-400 text-sm">시즌 52: 확멧 확좋</div>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              응원하기
            </Button>
            <div className="text-gray-400 text-xs">활찬 0</div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">신</span>
                </div>
                <div>
                  <div className="text-white font-medium">신민성 삭급</div>
                  <div className="text-gray-400 text-sm">2025. 9. 28. 오전 9:50:54</div>
                </div>
              </div>
            </div>
            <p className="text-gray-300">신민성민이 오물먹 잘구실 테마(활동) 특격었어요.</p>
            <div className="text-gray-400 text-sm">시즌 53: 찬솔 힘적</div>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              응원하기
            </Button>
            <div className="text-gray-400 text-xs">활찬 0</div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderRequestsContent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl text-white mb-2">요청 관리</h2>
        <p className="text-gray-300">내가 요청한 활동들을 확인하고 관리하세요.</p>
      </div>

      {/* 대기 중인 요청 */}
      <Card className="p-4 bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border-yellow-500/30">
        <h3 className="text-lg text-white mb-4">대기 중인 요청</h3>
        
        <div className="space-y-3">
          <Card className="p-3 bg-gray-800/50 border-gray-600/30">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-white font-medium">팀 레이드 참여</div>
                <Badge className="bg-yellow-600 text-white border-0">대기중</Badge>
              </div>
              <div className="text-gray-300 text-sm">요청일: 2025. 9. 28. 오전 10:30</div>
              <div className="text-gray-300 text-sm">예상 보상: XP 120, 코인 25</div>
              <p className="text-gray-400 text-xs">수학 프로젝트 팀 활동에 참여하고 싶습니다.</p>
            </div>
          </Card>

          <Card className="p-3 bg-gray-800/50 border-gray-600/30">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-white font-medium">발표 당번</div>
                <Badge className="bg-yellow-600 text-white border-0">대기중</Badge>
              </div>
              <div className="text-gray-300 text-sm">요청일: 2025. 9. 28. 오전 9:15</div>
              <div className="text-gray-300 text-sm">예상 보상: XP 80, 코인 15</div>
              <p className="text-gray-400 text-xs">과학 시간에 실험 결과를 발표하고 싶습니다.</p>
            </div>
          </Card>
        </div>
      </Card>

      {/* 승인된 요청 */}
      <Card className="p-4 bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30">
        <h3 className="text-lg text-white mb-4">승인된 요청 (완료 가능)</h3>
        
        <div className="space-y-3">
          <Card className="p-3 bg-gray-800/50 border-gray-600/30">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-white font-medium">도움 당번</div>
                <Badge className="bg-green-600 text-white border-0">승인됨</Badge>
              </div>
              <div className="text-gray-300 text-sm">승인일: 2025. 9. 28. 오전 9:44</div>
              <div className="text-gray-300 text-sm">보상: XP 55, 코인 10</div>
              <p className="text-gray-400 text-xs">교실 정리를 도와드리겠습니다.</p>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                완료하기
              </Button>
            </div>
          </Card>

          <Card className="p-3 bg-gray-800/50 border-gray-600/30">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-white font-medium">역할 임무</div>
                <Badge className="bg-green-600 text-white border-0">승인됨</Badge>
              </div>
              <div className="text-gray-300 text-sm">승인일: 2025. 9. 28. 오전 8:20</div>
              <div className="text-gray-300 text-sm">보상: XP 70, 코인 12</div>
              <p className="text-gray-400 text-xs">일일 출석 체크 담당을 맡겠습니다.</p>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                완료하기
              </Button>
            </div>
          </Card>
        </div>
      </Card>

      {/* 완료된 요청 */}
      <Card className="p-4 bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border-blue-500/30">
        <h3 className="text-lg text-white mb-4">최근 완료된 요청</h3>
        
        <div className="space-y-3">
          <Card className="p-3 bg-gray-800/50 border-gray-600/30">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-white font-medium">수업 완주</div>
                <Badge className="bg-blue-600 text-white border-0">완료</Badge>
              </div>
              <div className="text-gray-300 text-sm">완료일: 2025. 9. 28. 오전 9:50</div>
              <div className="text-gray-300 text-sm">획득: XP 60, 코인 12</div>
              <p className="text-gray-400 text-xs">국어 수업을 성실히 참여했습니다.</p>
            </div>
          </Card>

          <Card className="p-3 bg-gray-800/50 border-gray-600/30">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-white font-medium">독서 당번</div>
                <Badge className="bg-blue-600 text-white border-0">완료</Badge>
              </div>
              <div className="text-gray-300 text-sm">완료일: 2025. 9. 27. 오후 3:30</div>
              <div className="text-gray-300 text-sm">획득: XP 45, 코인 8</div>
              <p className="text-gray-400 text-xs">도서관에서 책 정리를 도왔습니다.</p>
            </div>
          </Card>

          <Card className="p-3 bg-gray-800/50 border-gray-600/30">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-white font-medium">청소 당번</div>
                <Badge className="bg-blue-600 text-white border-0">완료</Badge>
              </div>
              <div className="text-gray-300 text-sm">완료일: 2025. 9. 27. 오후 4:00</div>
              <div className="text-gray-300 text-sm">획득: XP 40, 코인 7</div>
              <p className="text-gray-400 text-xs">교실 청소를 깨끗하게 마쳤습니다.</p>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );

  const getContent = () => {
    switch (type) {
      case 'shop':
        return renderShopContent();
      case 'activity':
        return renderActivityContent();
      case 'requests':
        return renderRequestsContent();
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900/95 backdrop-blur-sm rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-600/50 shadow-2xl">
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm p-6 border-b border-slate-700/50 flex items-center justify-between rounded-t-2xl">
          <div></div>
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="p-6">
          {getContent()}
        </div>
      </div>
    </div>
  );
}

export function MenuDropdown() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'shop' | 'activity' | 'requests' | null;
  }>({
    isOpen: false,
    type: null,
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const openModal = (type: 'shop' | 'activity' | 'requests') => {
    setModalState({ isOpen: true, type });
    setDropdownOpen(false);
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  return (
    <>
      <div className="relative">
        <Button 
          variant="ghost" 
          className="text-white hover:bg-gray-700 z-10"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        {dropdownOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setDropdownOpen(false)}
            />
            <div className="absolute right-0 top-full mt-2 w-56 bg-slate-800/95 backdrop-blur-sm border border-slate-600/50 rounded-xl shadow-xl z-50">
              <div className="py-1">
                <button
                  onClick={() => openModal('shop')}
                  className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-slate-700/70 transition-colors rounded-lg mx-1"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  상점
                </button>
                <button
                  onClick={() => openModal('activity')}
                  className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-slate-700/70 transition-colors rounded-lg mx-1"
                >
                  <Activity className="w-4 h-4 mr-2" />
                  활동 피드
                </button>
                <button
                  onClick={() => openModal('requests')}
                  className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-slate-700/70 transition-colors rounded-lg mx-1"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  요청 관리
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <MenuModal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        type={modalState.type!} 
      />
    </>
  );
}