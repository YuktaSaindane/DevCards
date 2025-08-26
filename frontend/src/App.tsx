import React, { useState } from 'react';
import { Deck } from './types';
import DeckList from './components/DeckList';
import DeckView from './components/DeckView';
import StudyMode from './components/StudyMode';
import CreateDeckForm from './components/CreateDeckForm';

type AppView = 'decks' | 'deck' | 'study';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('decks');
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [showCreateDeckForm, setShowCreateDeckForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDeckSelect = (deck: Deck) => {
    setSelectedDeck(deck);
    setCurrentView('deck');
  };

  const handleBackToDecks = () => {
    setSelectedDeck(null);
    setCurrentView('decks');
    setRefreshKey(prev => prev + 1); // Force refresh of deck list
  };

  const handleStartStudy = (deck: Deck) => {
    setSelectedDeck(deck);
    setCurrentView('study');
  };

  const handleCreateDeckSuccess = () => {
    setShowCreateDeckForm(false);
    setRefreshKey(prev => prev + 1); // Force refresh of deck list
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">📚</div>
              <h1 className="ml-2 text-xl font-bold text-gray-900">DevCards</h1>
            </div>
            {currentView !== 'decks' && (
              <nav className="text-sm text-gray-600">
                <button
                  onClick={handleBackToDecks}
                  className="hover:text-blue-600 transition-colors"
                >
                  ← Back to Decks
                </button>
                {selectedDeck && currentView === 'deck' && (
                  <span className="ml-2">/ {selectedDeck.title}</span>
                )}
                {selectedDeck && currentView === 'study' && (
                  <span className="ml-2">/ {selectedDeck.title} / Study</span>
                )}
              </nav>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'decks' && (
          <DeckList
            key={refreshKey}
            onDeckSelect={handleDeckSelect}
            onCreateDeck={() => setShowCreateDeckForm(true)}
          />
        )}

        {currentView === 'deck' && selectedDeck && (
          <DeckView
            deck={selectedDeck}
            onBack={handleBackToDecks}
            onStudy={handleStartStudy}
          />
        )}

        {currentView === 'study' && selectedDeck && (
          <StudyMode
            deck={selectedDeck}
            onExit={() => setCurrentView('deck')}
          />
        )}
      </main>

      {/* Create Deck Modal */}
      {showCreateDeckForm && (
        <CreateDeckForm
          onSuccess={handleCreateDeckSuccess}
          onCancel={() => setShowCreateDeckForm(false)}
        />
      )}
    </div>
  );
}

export default App;
