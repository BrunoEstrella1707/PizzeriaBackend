import { Request, Response } from 'express'
import { CreateProductService } from '../../services/product/CreateProductService'


class CreateProductController{
    async handle(req: Request, res: Response){

        const { name, price, description, category_id } = req.body

        const createProductService = new CreateProductService()

        const product = await createProductService.execute({
            name: name,
            price: price,
            description: description,
            category_id: category_id,
        })

        res.status(201).json(product)
    }
}

export { CreateProductController}