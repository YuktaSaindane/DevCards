import { Deck, Flashcard, Card } from '../types/models';
export declare const decks: Deck[];
export declare const flashcards: Flashcard[];
export declare const seedData: () => void;
export declare const findDeckById: (id: string) => Deck | undefined;
export declare const findCardById: (deckId: string, cardId: string) => {
    deck: Deck;
    card: Card;
    cardIndex: number;
} | null;
export declare const addCardToDeck: (deckId: string, cardData: {
    front: string;
    back: string;
}) => Deck | null;
export declare const removeCardFromDeck: (deckId: string, cardId: string) => Deck | null;
export declare const deleteDeckAndCards: (deckId: string) => boolean;
export declare const findFlashcardById: (id: string) => Flashcard | undefined;
export declare const getFlashcardsByDeckId: (deckId: string) => Flashcard[];
export declare const deleteFlashcard: (cardId: string) => boolean;
//# sourceMappingURL=store.d.ts.map