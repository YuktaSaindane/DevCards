import React, { useState, useEffect, useCallback } from 'react';
import { Deck, Flashcard } from '../types';
import { api } from '../services/api';
import FlashCard from './FlashCard';
import CreateFlashcardForm from './CreateFlashcardForm';

interface DeckViewProps {
  deck: Deck;
  onBack: () => void;
  onStudy: (deck: Deck) => void;
}

const DeckView: React.FC<DeckViewProps> = ({ deck, onBack, onStudy }) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const loadFlashcards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getFlashcards(deck.id);
      setFlashcards(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load flashcards');
    } finally {
      setLoading(false);
    }
  }, [deck.id]);

  useEffect(() => {
    loadFlashcards();
  }, [loadFlashcards]);

  const handleDeleteFlashcard = async (cardId: string) => {
    try {
      await api.deleteFlashcard(cardId);
      setFlashcards(flashcards.filter(card => card.id !== cardId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete flashcard');
    }
  };

  const handleCreateSuccess = () => {
    setShowCreateForm(false);
    loadFlashcards();
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
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <div className="text-red-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading flashcards</h3>
            <p className="text-sm text-red-600 mt-1">{error}</p>
            <button 
              onClick={loadFlashcards}
              className="mt-2 text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{deck.title}</h1>
            {deck.description && (
              <p className="text-gray-600 mt-1">{deck.description}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              {flashcards.length} flashcard{flashcards.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="flex space-x-3">
          {flashcards.length > 0 && (
            <button
              onClick={() => onStudy(deck)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              📚 Study Mode
            </button>
          )}
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            + Add Card
          </button>
        </div>
      </div>

      {/* Flashcards Grid */}
      {flashcards.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No flashcards yet</h3>
          <p className="text-gray-500 mb-4">Add some flashcards to start studying!</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Add Your First Flashcard
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcards.map((flashcard) => (
            <FlashCard
              key={flashcard.id}
              flashcard={flashcard}
              onDelete={handleDeleteFlashcard}
              showControls={true}
            />
          ))}
        </div>
      )}

      {/* Create Flashcard Form */}
      {showCreateForm && (
        <CreateFlashcardForm
          deckId={deck.id}
          onSuccess={handleCreateSuccess}
          onCancel={() => setShowCreateForm(false)}
        />
      )}
    </div>
  );
};

export default DeckView;
