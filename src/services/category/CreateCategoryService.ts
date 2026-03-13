import prismaClient from '../../prisma/index'


interface CreateCategoryProps {
    name: string
}

class CreateCategoryService {
    async execute({ name }: CreateCategoryProps) {

        const categoryAlredyExists = await prismaClient.category.findFirst({
            where: {
                name: name
            }
        })

        if (categoryAlredyExists) {
            throw new Error("Category alredy exists")
        }
        try{

            const category = await prismaClient.category.create({
                data: {
                    name: name
                },
                omit: {
                    updated_at: true,
                }
            })

            return category

        } catch (error){
            throw new Error("Error creating category")
        }
        
    }
}

export { CreateCategoryService }