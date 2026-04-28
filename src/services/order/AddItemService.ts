import prismaClient from "../../prisma"


interface AddItemProps {
    order_id: number,
    product_id: number,
    amount: number,
}


class AddItemService {
    async execute({ order_id, product_id, amount }: AddItemProps) {

        const orderExists = await prismaClient.order.findFirst({
            where: {
                id: order_id
            }
        })

        if (!orderExists){
            throw new Error("Order not found")
        }

        const productExists = await prismaClient.product.findFirst({
            where: {
                id: product_id,
                disabled: false,
            }
        })
        
        if (!productExists){
            throw new Error("Product not found")
        }

        try {
            const item = await prismaClient.item.create({
                data: {
                    order_id: order_id,
                    product_id: product_id,
                    amount: amount,
                },
                select: {
                    id: true,
                    order_id: true,
                    product_id: true,
                    amount: true,
                    product:{
                        select: {
                            name: true,
                            price: true,
                            description: true
                        }
                    },
                }
            })

            return item

        } catch (error){
            throw new Error("Error adding item to order" + error)
        }

    }
}


export { AddItemService}