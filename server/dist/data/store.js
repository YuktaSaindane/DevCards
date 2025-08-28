"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFlashcard = exports.getFlashcardsByDeckId = exports.findFlashcardById = exports.deleteDeckAndCards = exports.removeCardFromDeck = exports.addCardToDeck = exports.findCardById = exports.findDeckById = exports.seedData = exports.flashcards = exports.decks = void 0;
const uuid_1 = require("uuid");
const advanced_tech_cards_1 = require("./advanced-tech-cards");
// In-memory storage
exports.decks = [];
// Keep flashcards for backward compatibility if needed
exports.flashcards = [];
const seedData = () => {
    const now = new Date().toISOString();
    // Create demo decks with cards
    const deck1 = {
        id: (0, uuid_1.v4)(),
        title: 'React Basics',
        description: 'Fundamental concepts of React development',
        cards: [
            {
                id: (0, uuid_1.v4)(),
                front: 'What is JSX?',
                back: 'A syntax extension for JavaScript used with React'
            },
            {
                id: (0, uuid_1.v4)(),
                front: 'What is a component?',
                back: 'A reusable piece of UI that returns JSX'
            },
            {
                id: (0, uuid_1.v4)(),
                front: 'What is state in React?',
                back: 'Data that changes over time and triggers re-renders'
            }
        ],
        createdAt: now,
        updatedAt: now,
    };
    const deck2 = {
        id: (0, uuid_1.v4)(),
        title: 'JavaScript Trivia',
        description: 'Essential JavaScript concepts and trivia',
        cards: [
            {
                id: (0, uuid_1.v4)(),
                front: 'What is hoisting?',
                back: 'Moving declarations to the top of scope during compile phase'
            },
            {
                id: (0, uuid_1.v4)(),
                front: 'What is a closure?',
                back: 'A function plus its lexical scope'
            },
            {
                id: (0, uuid_1.v4)(),
                front: 'What is event loop?',
                back: 'The mechanism that handles call stack and the task queues'
            }
        ],
        createdAt: now,
        updatedAt: now,
    };
    const deck3 = {
        id: (0, uuid_1.v4)(),
        title: 'Database Concepts',
        description: 'Core database concepts and terminology',
        cards: [
            {
                id: (0, uuid_1.v4)(),
                front: 'What is normalization?',
                back: 'Organizing data to reduce redundancy'
            },
            {
                id: (0, uuid_1.v4)(),
                front: 'SQL vs NoSQL?',
                back: 'Relational with schemas vs non-relational and flexible schemas'
            },
            {
                id: (0, uuid_1.v4)(),
                front: 'What is an index?',
                back: 'A data structure that speeds up reads'
            }
        ],
        createdAt: now,
        updatedAt: now,
    };
    // React Fundamentals Interview Deck
    const advancedTechDeck = {
        id: (0, uuid_1.v4)(),
        title: 'React Interview Fundamentals',
        description: 'Essential React concepts and questions commonly asked in interviews',
        cards: (0, advanced_tech_cards_1.createAdvancedTechCards)(),
        createdAt: now,
        updatedAt: now,
    };
    exports.decks.push(deck1, deck2, deck3, advancedTechDeck);
    const totalCards = exports.decks.reduce((total, deck) => total + deck.cards.length, 0);
    console.log(`Seeded ${exports.decks.length} decks and ${totalCards} cards`);
};
exports.seedData = seedData;
// Helper functions for data operations
const findDeckById = (id) => {
    return exports.decks.find(deck => deck.id === id);
};
exports.findDeckById = findDeckById;
const findCardById = (deckId, cardId) => {
    const deck = (0, exports.findDeckById)(deckId);
    if (!deck)
        return null;
    const cardIndex = deck.cards.findIndex(card => card.id === cardId);
    if (cardIndex === -1)
        return null;
    return { deck, card: deck.cards[cardIndex], cardIndex };
};
exports.findCardById = findCardById;
const addCardToDeck = (deckId, cardData) => {
    const deck = (0, exports.findDeckById)(deckId);
    if (!deck)
        return null;
    const newCard = {
        id: (0, uuid_1.v4)(),
        front: cardData.front,
        back: cardData.back,
    };
    deck.cards.push(newCard);
    deck.updatedAt = new Date().toISOString();
    return deck;
};
exports.addCardToDeck = addCardToDeck;
const removeCardFromDeck = (deckId, cardId) => {
    const result = (0, exports.findCardById)(deckId, cardId);
    if (!result)
        return null;
    const { deck, cardIndex } = result;
    deck.cards.splice(cardIndex, 1);
    deck.updatedAt = new Date().toISOString();
    return deck;
};
exports.removeCardFromDeck = removeCardFromDeck;
const deleteDeckAndCards = (deckId) => {
    const deckIndex = exports.decks.findIndex(deck => deck.id === deckId);
    if (deckIndex === -1)
        return false;
    // Remove the deck (cards are automatically removed as they're part of the deck)
    exports.decks.splice(deckIndex, 1);
    return true;
};
exports.deleteDeckAndCards = deleteDeckAndCards;
// Keep old functions for backward compatibility
const findFlashcardById = (id) => {
    return exports.flashcards.find(card => card.id === id);
};
exports.findFlashcardById = findFlashcardById;
const getFlashcardsByDeckId = (deckId) => {
    return exports.flashcards.filter(card => card.deckId === deckId);
};
exports.getFlashcardsByDeckId = getFlashcardsByDeckId;
const deleteFlashcard = (cardId) => {
    const cardIndex = exports.flashcards.findIndex(card => card.id === cardId);
    if (cardIndex === -1)
        return false;
    exports.flashcards.splice(cardIndex, 1);
    return true;
};
exports.deleteFlashcard = deleteFlashcard;
//# sourceMappingURL=store.js.map