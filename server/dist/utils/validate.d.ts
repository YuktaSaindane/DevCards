import { z } from 'zod';
export declare const createDeckSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    description?: string | undefined;
}, {
    title: string;
    description?: string | undefined;
}>;
export declare const updateDeckSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    description?: string | undefined;
}, {
    title?: string | undefined;
    description?: string | undefined;
}>;
export declare const createCardSchema: z.ZodObject<{
    front: z.ZodString;
    back: z.ZodString;
}, "strip", z.ZodTypeAny, {
    front: string;
    back: string;
}, {
    front: string;
    back: string;
}>;
export declare const createFlashcardSchema: z.ZodObject<{
    question: z.ZodString;
    answer: z.ZodString;
}, "strip", z.ZodTypeAny, {
    question: string;
    answer: string;
}, {
    question: string;
    answer: string;
}>;
export declare const updateFlashcardSchema: z.ZodObject<{
    question: z.ZodOptional<z.ZodString>;
    answer: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    question?: string | undefined;
    answer?: string | undefined;
}, {
    question?: string | undefined;
    answer?: string | undefined;
}>;
export declare const validateBody: <T>(schema: z.ZodSchema<T>, body: unknown) => T;
//# sourceMappingURL=validate.d.ts.map