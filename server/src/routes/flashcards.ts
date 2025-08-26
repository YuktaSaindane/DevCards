import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
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

// GET /api/decks/:deckId/flashcards - List cards for a deck
router.get('/decks/:deckId/flashcards', (req: Request, res: Response<Flashcard[] | ErrorResponse>) => {
  const { deckId } = req.params;
  
  // Check if deck exists
  const deck = findDeckById(deckId);
  if (!deck) {
    return res.status(404).json({ error: 'not_found' });
  }
  
  const cards = getFlashcardsByDeckId(deckId);
  res.json(cards);
});

// POST /api/decks/:deckId/flashcards - Add card to deck
router.post('/decks/:deckId/flashcards', (req: Request, res: Response<Flashcard | ErrorResponse>) => {
  try {
    const { deckId } = req.params;
    const data = validateBody(createFlashcardSchema, req.body) as CreateFlashcardRequest;
    
    // Check if deck exists
    const deck = findDeckById(deckId);
    if (!deck) {
      return res.status(404).json({ error: 'not_found' });
    }
    
    const now = new Date().toISOString();
    const newCard: Flashcard = {
      id: uuidv4(),
      deckId,
      question: data.question,
      answer: data.answer,
      createdAt: now,
      updatedAt: now,
    };
    
    flashcards.push(newCard);
    res.status(201).json(newCard);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// PUT /api/flashcards/:cardId - Update card
router.put('/:cardId', (req: Request, res: Response<Flashcard | ErrorResponse>) => {
  try {
    const { cardId } = req.params;
    const data = validateBody(updateFlashcardSchema, req.body) as UpdateFlashcardRequest;
    
    const card = findFlashcardById(cardId);
    if (!card) {
      return res.status(404).json({ error: 'not_found' });
    }
    
    // Update card properties
    if (data.question !== undefined) {
      card.question = data.question;
    }
    if (data.answer !== undefined) {
      card.answer = data.answer;
    }
    card.updatedAt = new Date().toISOString();
    
    res.json(card);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// DELETE /api/flashcards/:cardId - Delete card
router.delete('/:cardId', (req: Request, res: Response<{ success: boolean } | ErrorResponse>) => {
  const { cardId } = req.params;
  
  const deleted = deleteFlashcard(cardId);
  if (!deleted) {
    return res.status(404).json({ error: 'not_found' });
  }
  
  res.json({ success: true });
});

export default router;
