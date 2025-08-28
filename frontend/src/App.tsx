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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center group">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-200">
                🧠
              </div>
              <h1 className="ml-3 text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                DevCards
              </h1>
              <div className="ml-3 px-2 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-medium rounded-full">
                Portfolio
              </div>
            </div>
            {currentView !== 'decks' && (
              <nav className="text-sm text-gray-600 flex items-center space-x-2">
                <button
                  onClick={handleBackToDecks}
                  className="flex items-center px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                >
                  <svg className="w-4 h-4 mr-1 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Decks
                </button>
                {selectedDeck && currentView === 'deck' && (
                  <span className="text-gray-400">/</span>
                )}
                {selectedDeck && currentView === 'deck' && (
                  <span className="font-medium text-gray-800">{selectedDeck.title}</span>
                )}
                {selectedDeck && currentView === 'study' && (
                  <>
                    <span className="text-gray-400">/</span>
                    <span className="font-medium text-gray-800">{selectedDeck.title}</span>
                    <span className="text-gray-400">/</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Study Mode</span>
                  </>
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
