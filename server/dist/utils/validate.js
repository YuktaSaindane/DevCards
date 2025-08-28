"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = exports.updateFlashcardSchema = exports.createFlashcardSchema = exports.createCardSchema = exports.updateDeckSchema = exports.createDeckSchema = void 0;
const zod_1 = require("zod");
exports.createDeckSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().optional(),
});
exports.updateDeckSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title cannot be empty').optional(),
    description: zod_1.z.string().optional(),
});
exports.createCardSchema = zod_1.z.object({
    front: zod_1.z.string().min(1, 'Front is required'),
    back: zod_1.z.string().min(1, 'Back is required'),
});
// Keep old schemas for backward compatibility
exports.createFlashcardSchema = zod_1.z.object({
    question: zod_1.z.string().min(1, 'Question is required'),
    answer: zod_1.z.string().min(1, 'Answer is required'),
});
exports.updateFlashcardSchema = zod_1.z.object({
    question: zod_1.z.string().min(1, 'Question cannot be empty').optional(),
    answer: zod_1.z.string().min(1, 'Answer cannot be empty').optional(),
});
const validateBody = (schema, body) => {
    try {
        return schema.parse(body);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            const firstError = error.errors[0];
            throw new Error(firstError.message);
        }
        throw new Error('Invalid request body');
    }
};
exports.validateBody = validateBody;
//# sourceMappingURL=validate.js.map