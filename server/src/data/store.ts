import { v4 as uuidv4 } from 'uuid';
import { Deck, Flashcard } from '../types/models';

// In-memory storage
export const decks: Deck[] = [];
export const flashcards: Flashcard[] = [];

export const seedData = () => {
  const now = new Date().toISOString();
  
  // Create demo decks
  const deck1: Deck = {
    id: uuidv4(),
    title: 'React Basics',
    description: 'Fundamental concepts of React development',
    createdAt: now,
    updatedAt: now,
  };
  
  const deck2: Deck = {
    id: uuidv4(),
    title: 'JavaScript Trivia',
    description: 'Essential JavaScript concepts and trivia',
    createdAt: now,
    updatedAt: now,
  };
  
  const deck3: Deck = {
    id: uuidv4(),
    title: 'Database Concepts',
    description: 'Core database concepts and terminology',
    createdAt: now,
    updatedAt: now,
  };
  
  decks.push(deck1, deck2, deck3);
  
  // Create flashcards for React Basics
  const reactCards: Omit<Flashcard, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      deckId: deck1.id,
      question: 'What is JSX?',
      answer: 'A syntax extension for JavaScript used with React',
    },
    {
      deckId: deck1.id,
      question: 'What is a component?',
      answer: 'A reusable piece of UI that returns JSX',
    },
    {
      deckId: deck1.id,
      question: 'What is state in React?',
      answer: 'Data that changes over time and triggers re-renders',
    },
  ];
  
  // Create flashcards for JavaScript Trivia
  const jsCards: Omit<Flashcard, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      deckId: deck2.id,
      question: 'What is hoisting?',
      answer: 'Moving declarations to the top of scope during compile phase',
    },
    {
      deckId: deck2.id,
      question: 'What is a closure?',
      answer: 'A function plus its lexical scope',
    },
    {
      deckId: deck2.id,
      question: 'What is event loop?',
      answer: 'The mechanism that handles call stack and the task queues',
    },
  ];
  
  // Create flashcards for Database Concepts
  const dbCards: Omit<Flashcard, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      deckId: deck3.id,
      question: 'What is normalization?',
      answer: 'Organizing data to reduce redundancy',
    },
    {
      deckId: deck3.id,
      question: 'SQL vs NoSQL?',
      answer: 'Relational with schemas vs non-relational and flexible schemas',
    },
    {
      deckId: deck3.id,
      question: 'What is an index?',
      answer: 'A data structure that speeds up reads',
    },
  ];
  
  // Add all flashcards with proper metadata
  const allCards = [...reactCards, ...jsCards, ...dbCards];
  allCards.forEach(card => {
    flashcards.push({
      ...card,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    });
  });
  
  console.log(`Seeded ${decks.length} decks and ${flashcards.length} flashcards`);
};

// Helper functions for data operations
export const findDeckById = (id: string): Deck | undefined => {
  return decks.find(deck => deck.id === id);
};

export const findFlashcardById = (id: string): Flashcard | undefined => {
  return flashcards.find(card => card.id === id);
};

export const getFlashcardsByDeckId = (deckId: string): Flashcard[] => {
  return flashcards.filter(card => card.deckId === deckId);
};

export const deleteDeckAndCards = (deckId: string): boolean => {
  const deckIndex = decks.findIndex(deck => deck.id === deckId);
  if (deckIndex === -1) return false;
  
  // Remove the deck
  decks.splice(deckIndex, 1);
  
  // Remove all cards belonging to this deck
  for (let i = flashcards.length - 1; i >= 0; i--) {
    if (flashcards[i].deckId === deckId) {
      flashcards.splice(i, 1);
    }
  }
  
  return true;
};

export const deleteFlashcard = (cardId: string): boolean => {
  const cardIndex = flashcards.findIndex(card => card.id === cardId);
  if (cardIndex === -1) return false;
  
  flashcards.splice(cardIndex, 1);
  return true;
};
