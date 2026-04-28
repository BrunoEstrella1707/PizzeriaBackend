import prismaClient from "../../prisma"


interface CreateOrderProps {
    table: number,
    name?: string,
    observation?: string,
}


class CreateOrderService {
    async execute({ table, name, observation }: CreateOrderProps){
        try{

            const order = await prismaClient.order.create({
                data: {
                    table: table,
                    name: name ?? "",
                    observation: observation ?? "",
                }
            })

            return order
        } catch (error){
            throw new Error("Error creating order." + error)
        }
        
    }
}

export { CreateOrderService }