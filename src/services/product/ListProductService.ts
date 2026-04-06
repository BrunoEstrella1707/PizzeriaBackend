import prismaClient from "../../prisma/index";


interface ListProductProps {
    disabled?: string,
    category_id?: number,
}

class ListProductService {
    async execute({ disabled, category_id }: ListProductProps){
        try{
            const products = await prismaClient.product.findMany({
                where: {
                    disabled: disabled === 'true' ? true : false,
                    category_id: Number(category_id),
                }
            })

            return products

        } catch (error: any) {
            throw new Error("Error listing products: " + error.message)
        }
    }
}

export { ListProductService}

