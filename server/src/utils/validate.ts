import { z } from 'zod';

export const createDeckSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

export const updateDeckSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty').optional(),
  description: z.string().optional(),
});

export const createCardSchema = z.object({
  front: z.string().min(1, 'Front is required'),
  back: z.string().min(1, 'Back is required'),
});

// Keep old schemas for backward compatibility
export const createFlashcardSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
});

export const updateFlashcardSchema = z.object({
  question: z.string().min(1, 'Question cannot be empty').optional(),
  answer: z.string().min(1, 'Answer cannot be empty').optional(),
});

export const validateBody = <T>(schema: z.ZodSchema<T>, body: unknown): T => {
  try {
    return schema.parse(body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      throw new Error(firstError.message);
    }
    throw new Error('Invalid request body');
  }
};
