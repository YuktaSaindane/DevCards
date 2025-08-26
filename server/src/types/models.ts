export interface Card {
  id: string;
  front: string;
  back: string;
}

export interface Deck {
  id: string;
  title: string;
  description?: string;
  cards: Card[];
  createdAt: string;
  updatedAt: string;
}

// Keep the old Flashcard interface for backward compatibility if needed
export interface Flashcard {
  id: string;
  deckId: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeckWithCardCount extends Deck {
  cardCount: number;
}

export interface CreateDeckRequest {
  title: string;
  description?: string;
}

export interface UpdateDeckRequest {
  title?: string;
  description?: string;
}

export interface CreateCardRequest {
  front: string;
  back: string;
}

// Keep the old interfaces for backward compatibility
export interface CreateFlashcardRequest {
  question: string;
  answer: string;
}

export interface UpdateFlashcardRequest {
  question?: string;
  answer?: string;
}

export interface ErrorResponse {
  error: string;
}

export interface HealthResponse {
  status: string;
}
