import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  decks,
  flashcards,
  findDeckById,
  findFlashcardById,
  getFlashcardsByDeckId,
  deleteFlashcard,
} from '../data/store';
import { validateBody, createFlashcardSchema, updateFlashcardSchema } from '../utils/validate';
import {
  Flashcard,
  CreateFlashcardRequest,
  UpdateFlashcardRequest,
  ErrorResponse,
} from '../types/models';

const router = Router();

// GET /api/decks/:deckId/flashcards - List cards for a deck (backward compatibility)
router.get('/decks/:deckId/flashcards', (req: Request, res: Response<Flashcard[] | ErrorResponse>) => {
  const { deckId } = req.params;
  
  // Check if deck exists
  const deck = findDeckById(deckId);
  if (!deck) {
    return res.status(404).json({ error: 'not_found' });
  }
  
  // Convert new card format to old flashcard format for backward compatibility
  const flashcards: Flashcard[] = deck.cards.map(card => ({
    id: card.id,
    deckId: deckId,
    question: card.front,
    answer: card.back,
    createdAt: deck.createdAt,
    updatedAt: deck.updatedAt,
  }));
  
  res.json(flashcards);
});

// POST /api/decks/:deckId/flashcards - Add card to deck (backward compatibility)
router.post('/decks/:deckId/flashcards', (req: Request, res: Response<Flashcard | ErrorResponse>) => {
  try {
    const { deckId } = req.params;
    const data = validateBody(createFlashcardSchema, req.body) as CreateFlashcardRequest;
    
    // Check if deck exists
    const deck = findDeckById(deckId);
    if (!deck) {
      return res.status(404).json({ error: 'not_found' });
    }
    
    // Add card to deck using new structure
    const newCard = {
      id: uuidv4(),
      front: data.question,
      back: data.answer,
    };
    
    deck.cards.push(newCard);
    deck.updatedAt = new Date().toISOString();
    
    // Return in old format for backward compatibility
    const flashcard: Flashcard = {
      id: newCard.id,
      deckId,
      question: data.question,
      answer: data.answer,
      createdAt: deck.createdAt,
      updatedAt: deck.updatedAt,
    };
    
    res.status(201).json(flashcard);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// PUT /api/flashcards/:cardId - Update card (backward compatibility)
router.put('/:cardId', (req: Request, res: Response<Flashcard | ErrorResponse>) => {
  try {
    const { cardId } = req.params;
    const data = validateBody(updateFlashcardSchema, req.body) as UpdateFlashcardRequest;
    
    // Find the card in any deck
    for (const deck of decks) {
      const card = deck.cards.find((card: any) => card.id === cardId);
      if (card) {
        // Update card properties
        if (data.question !== undefined) {
          card.front = data.question;
        }
        if (data.answer !== undefined) {
          card.back = data.answer;
        }
        deck.updatedAt = new Date().toISOString();
        
        // Return in old format
        const flashcard: Flashcard = {
          id: card.id,
          deckId: deck.id,
          question: card.front,
          answer: card.back,
          createdAt: deck.createdAt,
          updatedAt: deck.updatedAt,
        };
        
        return res.json(flashcard);
      }
    }
    
    return res.status(404).json({ error: 'not_found' });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// DELETE /api/flashcards/:cardId - Delete card (backward compatibility)
router.delete('/:cardId', (req: Request, res: Response<{ success: boolean } | ErrorResponse>) => {
  const { cardId } = req.params;
  
  // Find the card in any deck
  for (const deck of decks) {
    const cardIndex = deck.cards.findIndex((card: any) => card.id === cardId);
    if (cardIndex !== -1) {
      deck.cards.splice(cardIndex, 1);
      deck.updatedAt = new Date().toISOString();
      return res.json({ success: true });
    }
  }
  
  return res.status(404).json({ error: 'not_found' });
});

export default router;
