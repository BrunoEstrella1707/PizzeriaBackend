import { Request, Response } from "express"
import { AddItemService } from "../../services/order/AddItemService"


class AddItemController {
    async handle(req: Request, res: Response) {
        const addItemService = new AddItemService()

        // Check if request body contains a single item or an array of items
        if (Array.isArray(req.body)) {
            // Handle array of items
            const items = req.body.map(item => ({
                order_id: item.order_id,
                product_id: item.product_id,
                amount: item.amount,
            }))

            const createdItems = await addItemService.execute(items)
            res.status(201).json(createdItems)
        } else {
            // Handle single item
            const { order_id, product_id, amount } = req.body

            const item = await addItemService.execute({
                order_id: order_id,
                product_id: product_id,
                amount: amount,
            })

            res.status(201).json(item)
        }
    }
}

export { AddItemController}