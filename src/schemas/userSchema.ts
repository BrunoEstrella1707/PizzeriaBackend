import { z } from 'zod'


export const createUserSchema = z.object({
    body: z.object({
        name: z.string().min(3, {message: "Name must have more than 2 letters"}),
        email: z.email({message: "Enter a valid email."}),
        password: z.string().min(6, {message: "Password must be 6 character length"})
    }),
})

export const authUserSchema = z.object({
    body: z.object({
        email: z.email({message: "Enter a valid email."}),
        password: z.string({message: "Password must be provided"})
    }),
})