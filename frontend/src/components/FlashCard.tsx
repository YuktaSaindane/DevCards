import React, { useState } from 'react';
import { Flashcard, Card } from '../types';

type FlashCardData = Flashcard | Card;

interface FlashCardProps {
  flashcard: FlashCardData;
  showAnswer?: boolean;
  onFlip?: () => void;
  onEdit?: (flashcard: FlashCardData) => void;
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

  // Helper functions to handle both Card and Flashcard types
  const getQuestion = () => {
    return 'front' in flashcard ? flashcard.front : flashcard.question;
  };

  const getAnswer = () => {
    return 'back' in flashcard ? flashcard.back : flashcard.answer;
  };

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
    <div className="relative perspective-1000 group">
      <div
        onClick={handleFlip}
        className="relative w-full h-72 cursor-pointer transform-gpu transition-all duration-500 ease-out hover:scale-105"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-blue-200/50 shadow-xl flex flex-col justify-center items-center p-8 text-center backdrop-blur-sm"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
          }}
        >
          {/* Question icon */}
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <div className="text-sm text-blue-600 font-semibold mb-3 uppercase tracking-wide">Question</div>
          <div className="text-lg font-semibold text-gray-900 leading-relaxed max-w-sm">
            {getQuestion()}
          </div>
          
          {/* Flip hint */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center text-xs text-gray-400 bg-white/80 px-3 py-2 rounded-full">
              <svg className="w-4 h-4 mr-1 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              Click to reveal
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200/50 shadow-xl flex flex-col justify-center items-center p-8 text-center backdrop-blur-sm"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Answer icon */}
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <div className="text-sm text-green-600 font-semibold mb-3 uppercase tracking-wide">Answer</div>
          <div className="text-lg font-semibold text-gray-900 leading-relaxed max-w-sm">
            {getAnswer()}
          </div>
          
          {/* Flip hint */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center text-xs text-gray-400 bg-white/80 px-3 py-2 rounded-full">
              <svg className="w-4 h-4 mr-1 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              Show question
            </div>
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
