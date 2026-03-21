import { z } from 'zod'


export const createProductSchema = z.object({
    body: z.object({
        name: z.string().min(3, {message: "Name must have more than 2 letters."}),
        price: z.int({message: "Price is read in cents. Please use an integer."}).min(1, {message: "Price must be greater than 0."}),
        description: z.string().optional(),
        category_id: z.int({message: "Enter a valid category."})
    })
})