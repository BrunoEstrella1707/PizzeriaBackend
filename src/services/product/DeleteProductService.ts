import prismaClient from '../../prisma/index'

interface DeleteProductProps {
    product_id: number
}

class DeleteProductService {
    async execute({ product_id }: DeleteProductProps) {
        
        const productExists = await prismaClient.product.findFirst({
            where: {
                id: product_id
            }
        })

        if (!productExists) {
            throw new Error("Product not found.")
        }

        try {
            const product = await prismaClient.product.delete({
                where: {
                    id: product_id
                },
                select: {
                    id: true,
                    name: true,
                },
            })

            return product
            
        } catch (error) {
            throw new Error("Failed to delete product.")
        }
    }
}

export { DeleteProductService }