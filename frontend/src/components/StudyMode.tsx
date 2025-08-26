import React, { useState, useEffect, useCallback } from 'react';
import { Deck, StudySession } from '../types';
import { api } from '../services/api';
import FlashCard from './FlashCard';

interface StudyModeProps {
  deck: Deck;
  onExit: () => void;
}

const StudyMode: React.FC<StudyModeProps> = ({ deck, onExit }) => {
  const [session, setSession] = useState<StudySession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const initializeSession = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cards = await api.getFlashcards(deck.id);
      
      if (cards.length === 0) {
        setError('This deck has no flashcards to study.');
        return;
      }

      // Shuffle cards for variety
      const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
      
      setSession({
        deckId: deck.id,
        currentCardIndex: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        completed: false,
        cards: shuffledCards,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load flashcards');
    } finally {
      setLoading(false);
    }
  }, [deck.id]);

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  const handleCardFlip = () => {
    setShowAnswer(!showAnswer);
  };

  const handleAnswer = (correct: boolean) => {
    if (!session) return;

    const newSession = {
      ...session,
      correctAnswers: correct ? session.correctAnswers + 1 : session.correctAnswers,
      incorrectAnswers: correct ? session.incorrectAnswers : session.incorrectAnswers + 1,
    };

    // Move to next card
    if (session.currentCardIndex < session.cards.length - 1) {
      newSession.currentCardIndex = session.currentCardIndex + 1;
      setSession(newSession);
      setShowAnswer(false);
    } else {
      // Study session completed
      newSession.completed = true;
      setSession(newSession);
    }
  };

  const restartSession = () => {
    if (session) {
      setSession({
        ...session,
        currentCardIndex: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        completed: false,
      });
      setShowAnswer(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-red-800 mb-2">Cannot start study session</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={onExit}
            className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!session) return null;

  // Study session completed
  if (session.completed) {
    const totalCards = session.cards.length;
    const accuracy = Math.round((session.correctAnswers / totalCards) * 100);
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-green-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Study Session Complete!</h2>
          <p className="text-gray-600 mb-6">Great job studying "{deck.title}"</p>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{totalCards}</div>
              <div className="text-sm text-blue-600">Total Cards</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">{session.correctAnswers}</div>
              <div className="text-sm text-green-600">Correct</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600">{session.incorrectAnswers}</div>
              <div className="text-sm text-red-600">Incorrect</div>
            </div>
          </div>

          <div className="mb-8">
            <div className="text-3xl font-bold text-gray-900 mb-2">{accuracy}%</div>
            <div className="text-gray-600">Accuracy</div>
          </div>

          <div className="flex space-x-4 justify-center">
            <button
              onClick={restartSession}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Study Again
            </button>
            <button
              onClick={onExit}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Back to Deck
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active study session
  const currentCard = session.cards[session.currentCardIndex];
  const progress = ((session.currentCardIndex + 1) / session.cards.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Study Mode</h1>
          <p className="text-gray-600">{deck.title}</p>
        </div>
        <button
          onClick={onExit}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Card {session.currentCardIndex + 1} of {session.cards.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="mb-8">
        <FlashCard
          flashcard={currentCard}
          showAnswer={showAnswer}
          onFlip={handleCardFlip}
          showControls={false}
        />
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {!showAnswer ? (
          <button
            onClick={handleCardFlip}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Show Answer
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer(false)}
              className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors"
            >
              ❌ Incorrect
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors"
            >
              ✅ Correct
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-6 flex justify-center space-x-8 text-sm text-gray-600">
        <div className="text-center">
          <div className="font-medium text-green-600">{session.correctAnswers}</div>
          <div>Correct</div>
        </div>
        <div className="text-center">
          <div className="font-medium text-red-600">{session.incorrectAnswers}</div>
          <div>Incorrect</div>
        </div>
      </div>
    </div>
  );
};

export default StudyMode;
