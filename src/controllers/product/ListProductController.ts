import { Request, Response } from 'express'
import { ListProductService } from '../../services/product/ListProductService'


class ListProductController {
    async handle(req: Request, res: Response){

        const disabled = req.query.disabled as string | undefined
        const category_id = req.query.category_id as number | undefined
        console.log("Received query parameters:", { disabled, category_id })

        const listProductService = new ListProductService()
        const products = await listProductService.execute({
            disabled: disabled,
            category_id: category_id,
        })


        res.status(200).json(products)
    }
}

export { ListProductController}