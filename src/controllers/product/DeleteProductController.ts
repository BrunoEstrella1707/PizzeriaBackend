import { Request, Response } from 'express'
import { DeleteProductService } from '../../services/product/DeleteProductService'

class DeleteProductController {
    async handle(req: Request, res: Response) {
        const { product_id } = req.params

        const deleteProductService = new DeleteProductService()

        const product = await deleteProductService.execute({
            product_id: Number(product_id)
        })

        res.status(200).json(product)
    }
}

export { DeleteProductController }