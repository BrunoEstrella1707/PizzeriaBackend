import prismaClient from '../../prisma/index'


interface CreateProductProps{
    name: string,
    price: number,
    description: string,
    category_id: number
}

class CreateProductService{
    async execute({ name, price, description, category_id }: CreateProductProps){
        
        const productAlredyExists = await prismaClient.product.findFirst({
            where: {
                name: name
            }
        })

        if(productAlredyExists){
            throw new Error("Product already exists.")
        }

        const categoryExists = await prismaClient.category.findFirst.apply({
            where: {
                id: category_id
            }
        })

        if(!categoryExists){
            throw new Error("Category not found.")
        }

        try{

            const product = await prismaClient.product.create({
                data: {
                    name: name,
                    price: price,
                    description: description,
                    category_id: category_id    
                },
                omit: {
                    updated_at: true,
                },
            })

            return product

        }catch (error){
            throw new Error("Error creating product." + error)
        }
    }
}

export { CreateProductService}