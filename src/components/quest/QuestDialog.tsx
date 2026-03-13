import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import type { Quest } from '../types/schoolQuest';
import { getQuestIcon } from '../utils/schoolQuestUtils';

interface QuestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  quest: Quest | null;
  onComplete: (questId: string, success: boolean) => void;
}

export function QuestDialog({ isOpen, onClose, quest, onComplete }: QuestDialogProps) {
  const [studentAnswer, setStudentAnswer] = useState('');

  const handleClose = () => {
    setStudentAnswer('');
    onClose();
  };

  const handleSubmit = () => {
    if (quest) {
      onComplete(quest.id, true);
      setStudentAnswer('');
    }
  };

  const handleGiveUp = () => {
    if (quest) {
      onComplete(quest.id, false);
      setStudentAnswer('');
    }
  };

  if (!quest) return null;

  const IconComponent = getQuestIcon(quest.type);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-black/90 border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconComponent className="w-5 h-5" />
            {quest.title}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            {quest.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {quest.type === 'question' && quest.content?.question && (
            <div>
              <h4 className="font-medium mb-3">{quest.content.question}</h4>
              <div className="space-y-2">
                {quest.content.options?.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10"
                    onClick={() => setStudentAnswer(option)}
                  >
                    {String.fromCharCode(65 + index)}. {option}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {quest.type === 'problem' && quest.content?.problem && (
            <div>
              <h4 className="font-medium mb-3">{quest.content.problem}</h4>
              <Textarea
                placeholder="풀이 과정을 단계별로 작성해주세요..."
                value={studentAnswer}
                onChange={(e) => setStudentAnswer(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
                rows={6}
              />
            </div>
          )}

          {quest.type === 'understanding' && (
            <div>
              <h4 className="font-medium mb-3">이 개념에 대해 자신의 이해도를 설명해주세요</h4>
              <Textarea
                placeholder="개념을 자신의 말로 설명해보세요..."
                value={studentAnswer}
                onChange={(e) => setStudentAnswer(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
                rows={4}
              />
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">
              남은 시간: {Math.floor((quest.timeRemaining || 0) / 60)}분 {(quest.timeRemaining || 0) % 60}초
            </span>
            <span className="text-yellow-400">+{quest.points} EXP</span>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleGiveUp}
            className="border-red-500 text-red-500 hover:bg-red-500/10"
          >
            포기하기
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!studentAnswer}
            className="bg-green-500 hover:bg-green-600"
          >
            제출하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}