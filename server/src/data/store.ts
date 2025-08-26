import { v4 as uuidv4 } from 'uuid';
import { Deck, Flashcard, Card } from '../types/models';

// In-memory storage
export const decks: Deck[] = [];
// Keep flashcards for backward compatibility if needed
export const flashcards: Flashcard[] = [];

export const seedData = () => {
  const now = new Date().toISOString();
  
  // Create demo decks with cards
  const deck1: Deck = {
    id: uuidv4(),
    title: 'React Basics',
    description: 'Fundamental concepts of React development',
    cards: [
      {
        id: uuidv4(),
        front: 'What is JSX?',
        back: 'A syntax extension for JavaScript used with React'
      },
      {
        id: uuidv4(),
        front: 'What is a component?',
        back: 'A reusable piece of UI that returns JSX'
      },
      {
        id: uuidv4(),
        front: 'What is state in React?',
        back: 'Data that changes over time and triggers re-renders'
      }
    ],
    createdAt: now,
    updatedAt: now,
  };
  
  const deck2: Deck = {
    id: uuidv4(),
    title: 'JavaScript Trivia',
    description: 'Essential JavaScript concepts and trivia',
    cards: [
      {
        id: uuidv4(),
        front: 'What is hoisting?',
        back: 'Moving declarations to the top of scope during compile phase'
      },
      {
        id: uuidv4(),
        front: 'What is a closure?',
        back: 'A function plus its lexical scope'
      },
      {
        id: uuidv4(),
        front: 'What is event loop?',
        back: 'The mechanism that handles call stack and the task queues'
      }
    ],
    createdAt: now,
    updatedAt: now,
  };
  
  const deck3: Deck = {
    id: uuidv4(),
    title: 'Database Concepts',
    description: 'Core database concepts and terminology',
    cards: [
      {
        id: uuidv4(),
        front: 'What is normalization?',
        back: 'Organizing data to reduce redundancy'
      },
      {
        id: uuidv4(),
        front: 'SQL vs NoSQL?',
        back: 'Relational with schemas vs non-relational and flexible schemas'
      },
      {
        id: uuidv4(),
        front: 'What is an index?',
        back: 'A data structure that speeds up reads'
      }
    ],
    createdAt: now,
    updatedAt: now,
  };
  
  decks.push(deck1, deck2, deck3);
  
  const totalCards = decks.reduce((total, deck) => total + deck.cards.length, 0);
  console.log(`Seeded ${decks.length} decks and ${totalCards} cards`);
};

// Helper functions for data operations
export const findDeckById = (id: string): Deck | undefined => {
  return decks.find(deck => deck.id === id);
};

export const findCardById = (deckId: string, cardId: string): { deck: Deck; card: Card; cardIndex: number } | null => {
  const deck = findDeckById(deckId);
  if (!deck) return null;
  
  const cardIndex = deck.cards.findIndex(card => card.id === cardId);
  if (cardIndex === -1) return null;
  
  return { deck, card: deck.cards[cardIndex], cardIndex };
};

export const addCardToDeck = (deckId: string, cardData: { front: string; back: string }): Deck | null => {
  const deck = findDeckById(deckId);
  if (!deck) return null;
  
  const newCard: Card = {
    id: uuidv4(),
    front: cardData.front,
    back: cardData.back,
  };
  
  deck.cards.push(newCard);
  deck.updatedAt = new Date().toISOString();
  
  return deck;
};

export const removeCardFromDeck = (deckId: string, cardId: string): Deck | null => {
  const result = findCardById(deckId, cardId);
  if (!result) return null;
  
  const { deck, cardIndex } = result;
  deck.cards.splice(cardIndex, 1);
  deck.updatedAt = new Date().toISOString();
  
  return deck;
};

export const deleteDeckAndCards = (deckId: string): boolean => {
  const deckIndex = decks.findIndex(deck => deck.id === deckId);
  if (deckIndex === -1) return false;
  
  // Remove the deck (cards are automatically removed as they're part of the deck)
  decks.splice(deckIndex, 1);
  
  return true;
};

// Keep old functions for backward compatibility
export const findFlashcardById = (id: string): Flashcard | undefined => {
  return flashcards.find(card => card.id === id);
};

export const getFlashcardsByDeckId = (deckId: string): Flashcard[] => {
  return flashcards.filter(card => card.deckId === deckId);
};

export const deleteFlashcard = (cardId: string): boolean => {
  const cardIndex = flashcards.findIndex(card => card.id === cardId);
  if (cardIndex === -1) return false;
  
  flashcards.splice(cardIndex, 1);
  return true;
};
