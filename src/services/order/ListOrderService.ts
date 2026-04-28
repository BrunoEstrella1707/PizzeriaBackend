import prismaClient from "../../prisma"


interface ListOrderProps{
    draft?: string
}


class ListOrderService {
    async execute({ draft }: ListOrderProps){

        try{

            const orders = await prismaClient.order.findMany({
                where: {
                    draft: draft === "true" ? true : false
                },
                select: {
                    id: true,
                    table: true, 
                    name: true,
                    draft: true,
                    status: true,
                    created_at: true,
                    items: {
                        select: {
                            id: true,
                            amount: true,
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    price: true,
                                    description: true
                                }
                            }
                        }
                    }
                }
            })

            return orders

        } catch (error) {
            throw new Error("Error while listing orders" + error)
        }
    }
}

export { ListOrderService}