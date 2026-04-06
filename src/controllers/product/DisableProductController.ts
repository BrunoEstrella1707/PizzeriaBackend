import { Request, Response } from 'express'
import { DisableProductService } from '../../services/product/DisableProductService'


class DisableProductController {
    async handle(req: Request, res: Response){
        const { product_id } = req.params

        const disableProductService = new DisableProductService()

        const product = await disableProductService.execute({
            product_id: Number(product_id)
        })
        

        res.status(200).json(product)
    }
}

export { DisableProductController }