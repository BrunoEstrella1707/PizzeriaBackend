import prismaClient from "../../prisma/index";


interface DisableProductProps {
    product_id: number
}


class DisableProductService {
    async execute({ product_id }: DisableProductProps) {
        const productExists = await prismaClient.product.findFirst({
            where: {
                id: product_id
            }
        })

        if (!productExists) {
            throw new Error("Product not found.")
        }

        try {
            const product = await prismaClient.product.update({
                where: {
                    id: product_id
                },
                data: {
                    disabled: true
                },
            })

            
            return product
            
            
        } catch (error) {
            throw new Error("Failed to disable product.")
        }
    }
}

export { DisableProductService }