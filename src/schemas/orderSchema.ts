import { z } from 'zod'


export const createOrderSchema = z.object({
    body: z.object({
        table: z.int().min(1, {message: "Table number must be greater than 0."}),
        name: z.string().min(3, {message: "Table name must have more than 3 letters."}).optional(),

    })
})
        

export const listOrderSchema = z.object({
    query: z.object({
        draft: z
        .enum(['true', 'false'], {message: "Draft must be true or false."})
        .optional()
        .default('false')
        .transform((value) => value === 'true'),    
    })
})