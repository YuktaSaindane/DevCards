import {
  Deck,
  DeckWithCardCount,
  Flashcard,
  CreateDeckRequest,
  UpdateDeckRequest,
  CreateFlashcardRequest,
  UpdateFlashcardRequest,
  HealthResponse,
  ErrorResponse,
} from '../types';

const API_BASE_URL = 'http://localhost:4000/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      const errorData = data as ErrorResponse;
      throw new ApiError(response.status, errorData.error || 'An error occurred');
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, 'Network error - make sure the backend is running on port 4000');
  }
}

export const api = {
  // Health check
  health: (): Promise<HealthResponse> => 
    fetchAPI('/health'),

  // Decks
  getDecks: (): Promise<Deck[]> => 
    fetchAPI('/decks'),

  getDeck: (deckId: string): Promise<DeckWithCardCount> => 
    fetchAPI(`/decks/${deckId}`),

  createDeck: (data: CreateDeckRequest): Promise<Deck> => 
    fetchAPI('/decks', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateDeck: (deckId: string, data: UpdateDeckRequest): Promise<Deck> => 
    fetchAPI(`/decks/${deckId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteDeck: (deckId: string): Promise<{ success: boolean }> => 
    fetchAPI(`/decks/${deckId}`, {
      method: 'DELETE',
    }),

  // Flashcards
  getFlashcards: (deckId: string): Promise<Flashcard[]> => 
    fetchAPI(`/decks/${deckId}/flashcards`),

  createFlashcard: (deckId: string, data: CreateFlashcardRequest): Promise<Flashcard> => 
    fetchAPI(`/decks/${deckId}/flashcards`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateFlashcard: (cardId: string, data: UpdateFlashcardRequest): Promise<Flashcard> => 
    fetchAPI(`/flashcards/${cardId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteFlashcard: (cardId: string): Promise<{ success: boolean }> => 
    fetchAPI(`/flashcards/${cardId}`, {
      method: 'DELETE',
    }),
};

export { ApiError };
