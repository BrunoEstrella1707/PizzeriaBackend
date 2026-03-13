import { z } from 'zod'


export const createCategorySchema = z.object({
    body: z.object({
        name: z
        .string({message: "Name must be string type"})
        .min(3, {message: "Name must have more than 2 letters"}),
    }),
})