import React, { useState } from 'react';
import { Flashcard } from '../types';

interface FlashCardProps {
  flashcard: Flashcard;
  showAnswer?: boolean;
  onFlip?: () => void;
  onEdit?: (flashcard: Flashcard) => void;
  onDelete?: (cardId: string) => void;
  showControls?: boolean;
}

const FlashCard: React.FC<FlashCardProps> = ({
  flashcard,
  showAnswer = false,
  onFlip,
  onEdit,
  onDelete,
  showControls = true,
}) => {
  const [isFlipped, setIsFlipped] = useState(showAnswer);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setIsFlipped(!isFlipped);
      setIsAnimating(false);
      onFlip?.();
    }, 150);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(flashcard);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this flashcard?')) {
      onDelete?.(flashcard.id);
    }
  };

  return (
    <div className="relative perspective-1000">
      <div
        onClick={handleFlip}
        className={`
          relative w-full h-64 cursor-pointer transform-gpu transition-transform duration-300 ease-in-out
          ${isAnimating ? (isFlipped ? 'rotateY-90' : 'rotateY-90') : 'rotateY-0'}
          preserve-3d
        `}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of card */}
        <div
          className={`
            absolute inset-0 w-full h-full bg-white rounded-lg border-2 border-blue-200 shadow-lg
            flex flex-col justify-center items-center p-6 text-center backface-hidden
            ${isFlipped ? 'opacity-0' : 'opacity-100'}
          `}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
          }}
        >
          <div className="text-sm text-blue-600 font-medium mb-2">Question</div>
          <div className="text-lg font-semibold text-gray-900 leading-relaxed">
            {flashcard.question}
          </div>
          <div className="absolute bottom-4 text-xs text-gray-400">
            Click to reveal answer
          </div>
        </div>

        {/* Back of card */}
        <div
          className={`
            absolute inset-0 w-full h-full bg-green-50 rounded-lg border-2 border-green-200 shadow-lg
            flex flex-col justify-center items-center p-6 text-center backface-hidden
            ${isFlipped ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="text-sm text-green-600 font-medium mb-2">Answer</div>
          <div className="text-lg font-semibold text-gray-900 leading-relaxed">
            {flashcard.answer}
          </div>
          <div className="absolute bottom-4 text-xs text-gray-400">
            Click to show question
          </div>
        </div>

        {/* Controls */}
        {showControls && (onEdit || onDelete) && (
          <div className="absolute top-2 right-2 flex space-x-1 z-10">
            {onEdit && (
              <button
                onClick={handleEdit}
                className="bg-white/80 hover:bg-white text-gray-600 hover:text-blue-600 p-1 rounded-full shadow-sm transition-colors"
                title="Edit flashcard"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                onClick={handleDelete}
                className="bg-white/80 hover:bg-white text-gray-600 hover:text-red-600 p-1 rounded-full shadow-sm transition-colors"
                title="Delete flashcard"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashCard;
