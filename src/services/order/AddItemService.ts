import prismaClient from "../../prisma"


interface AddItemProps {
    order_id: number,
    product_id: number,
    amount: number,
}

type AddItemInput = AddItemProps | AddItemProps[]


class AddItemService {
    async execute(input: AddItemInput) {
        // Normalize input to always be an array
        const items = Array.isArray(input) ? input : [input]
        const isSingleItem = !Array.isArray(input)

        // Validate all orders and products exist
        const orderIds = [...new Set(items.map(item => item.order_id))]
        const productIds = [...new Set(items.map(item => item.product_id))]

        const orders = await prismaClient.order.findMany({
            where: { id: { in: orderIds } }
        })

        if (orders.length !== orderIds.length) {
            throw new Error("One or more orders not found")
        }

        const products = await prismaClient.product.findMany({
            where: {
                id: { in: productIds },
                disabled: false,
            }
        })

        if (products.length !== productIds.length) {
            throw new Error("One or more products not found or are disabled")
        }

        try {
            const createdItems = await Promise.all(
                items.map(item =>
                    prismaClient.item.create({
                        data: {
                            order_id: item.order_id,
                            product_id: item.product_id,
                            amount: item.amount,
                        },
                        select: {
                            id: true,
                            order_id: true,
                            product_id: true,
                            amount: true,
                            product: {
                                select: {
                                    name: true,
                                    price: true,
                                    description: true
                                }
                            },
                        }
                    })
                )
            )

            // Return single item or array based on input type
            return isSingleItem ? createdItems[0] : createdItems

        } catch (error) {
            throw new Error("Error adding item to order: " + error)
        }

    }
}


export { AddItemService}