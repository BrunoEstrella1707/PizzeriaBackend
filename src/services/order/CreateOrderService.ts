import prismaClient from "../../prisma"


interface CreateOrderProps {
    table: number,
    name?: string,
}


class CreateOrderService {
    async execute({ table, name }: CreateOrderProps){
        try{

            const order = await prismaClient.order.create({
                data: {
                    table: table,
                    name: name ?? "",
                }
            })

            return order
        } catch (error){
            throw new Error("Error creating order." + error)
        }
        
    }
}

export { CreateOrderService }