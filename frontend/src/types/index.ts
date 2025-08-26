export interface Deck {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

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

export interface StudySession {
  deckId: string;
  currentCardIndex: number;
  correctAnswers: number;
  incorrectAnswers: number;
  completed: boolean;
  cards: Flashcard[];
}
