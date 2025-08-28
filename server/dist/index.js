"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const store_1 = require("./data/store");
const decks_1 = __importDefault(require("./routes/decks"));
const cards_1 = __importDefault(require("./routes/cards"));
const flashcards_1 = __importDefault(require("./routes/flashcards"));
const app = (0, express_1.default)();
const PORT = 4000;
// Middleware
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express_1.default.json());
// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});
// Routes
app.use('/api/decks', decks_1.default);
app.use('/api/decks', cards_1.default);
app.use('/api', flashcards_1.default);
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// Error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});
// Initialize server
const startServer = () => {
    // Seed the database with demo data
    (0, store_1.seedData)();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📚 API endpoints:`);
        console.log(`   GET  /api/health`);
        console.log(`   GET  /api/decks`);
        console.log(`   POST /api/decks`);
        console.log(`   GET  /api/decks/:deckId`);
        console.log(`   PUT  /api/decks/:deckId`);
        console.log(`   DELETE /api/decks/:deckId`);
        console.log(`   GET  /api/decks/:deckId/cards`);
        console.log(`   POST /api/decks/:deckId/cards`);
        console.log(`   DELETE /api/decks/:deckId/cards/:cardId`);
        console.log(`   GET  /api/decks/:deckId/flashcards`);
        console.log(`   POST /api/decks/:deckId/flashcards`);
        console.log(`   PUT  /api/flashcards/:cardId`);
        console.log(`   DELETE /api/flashcards/:cardId`);
    });
};
startServer();
//# sourceMappingURL=index.js.map