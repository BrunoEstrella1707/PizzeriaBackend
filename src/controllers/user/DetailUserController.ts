import { Request, Response } from 'express'
import { IDetailUserService } from "../../services/user/DetailUserService"


class DetailUserController{
    constructor(private detailUserService: IDetailUserService){}
    async handle(req: Request, res: Response) {

        const user_id = req.user_id as number

        const user = await this.detailUserService.execute(user_id)

        res.status(200).json(user)

    }
}


class DetailAnotherUserController{
    constructor(private detailUserService: IDetailUserService){}
    async handle(req: Request, res: Response) {

        const user_id = req.params.userId

        const user = await this.detailUserService.execute(Number(user_id))

        res.status(200).json(user)

    }
}

export { DetailUserController, DetailAnotherUserController}