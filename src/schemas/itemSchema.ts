import { z } from 'zod'


const itemObject = z.object({
    order_id: z.number({message: "Order ID must be a number."}),
    product_id: z.number({message: "Product ID must be a number."}),
    amount: z.number({message: "Amount must be a number."}).min(1, {message: "Amount must be at least 1."}),
})

export const createItemSchema = z.object({
    body: z.union([
        itemObject,
        z.array(itemObject)
    ])
})