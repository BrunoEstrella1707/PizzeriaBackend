import prismaClient from "../../prisma/index";


interface ListProductProps {
    disabled?: string,
}

class ListProductService {
    async execute({ disabled }: ListProductProps){
        try{
            const products = await prismaClient.product.findMany({
                where: {
                    disabled: disabled === 'true' ? true : false
                }
            })

            return products

        } catch (error: any) {
            throw new Error("Error listing products: " + error.message)
        }
    }
}

export { ListProductService}

