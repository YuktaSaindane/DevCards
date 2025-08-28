"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const store_1 = require("../data/store");
const validate_1 = require("../utils/validate");
const router = (0, express_1.Router)();
// Test route to verify flashcards router is working
router.get('/test-flashcards', (req, res) => {
    res.json({ message: 'Flashcards router is working!' });
});
// GET /api/decks/:deckId/flashcards - List cards for a deck (backward compatibility)
router.get('/decks/:deckId/flashcards', (req, res) => {
    const { deckId } = req.params;
    console.log(`🔍 Flashcards route called for deckId: ${deckId}`);
    // Check if deck exists
    const deck = (0, store_1.findDeckById)(deckId);
    if (!deck) {
        return res.status(404).json({ error: 'not_found' });
    }
    // Convert new card format to old flashcard format for backward compatibility
    const flashcards = deck.cards.map(card => ({
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
router.post('/decks/:deckId/flashcards', (req, res) => {
    try {
        const { deckId } = req.params;
        const data = (0, validate_1.validateBody)(validate_1.createFlashcardSchema, req.body);
        // Check if deck exists
        const deck = (0, store_1.findDeckById)(deckId);
        if (!deck) {
            return res.status(404).json({ error: 'not_found' });
        }
        // Add card to deck using new structure
        const newCard = {
            id: (0, uuid_1.v4)(),
            front: data.question,
            back: data.answer,
        };
        deck.cards.push(newCard);
        deck.updatedAt = new Date().toISOString();
        // Return in old format for backward compatibility
        const flashcard = {
            id: newCard.id,
            deckId,
            question: data.question,
            answer: data.answer,
            createdAt: deck.createdAt,
            updatedAt: deck.updatedAt,
        };
        res.status(201).json(flashcard);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// PUT /api/flashcards/:cardId - Update card (backward compatibility)
router.put('/:cardId', (req, res) => {
    try {
        const { cardId } = req.params;
        const data = (0, validate_1.validateBody)(validate_1.updateFlashcardSchema, req.body);
        // Find the card in any deck
        for (const deck of store_1.decks) {
            const card = deck.cards.find((card) => card.id === cardId);
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
                const flashcard = {
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
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// DELETE /api/flashcards/:cardId - Delete card (backward compatibility)
router.delete('/:cardId', (req, res) => {
    const { cardId } = req.params;
    // Find the card in any deck
    for (const deck of store_1.decks) {
        const cardIndex = deck.cards.findIndex((card) => card.id === cardId);
        if (cardIndex !== -1) {
            deck.cards.splice(cardIndex, 1);
            deck.updatedAt = new Date().toISOString();
            return res.json({ success: true });
        }
    }
    return res.status(404).json({ error: 'not_found' });
});
exports.default = router;
//# sourceMappingURL=flashcards.js.map