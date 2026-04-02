import { Request, Response } from 'express'
import { DetailUserService } from "../../services/user/DetailUserService"


class DetailUserController{
    async handle(req: Request, res: Response) {

        const user_id = req.user_id as number

        const detailUserService = new DetailUserService()

        const user = await detailUserService.execute(user_id)

        res.status(200).json(user)

    }
}


class DetailAnotherUserController{
    async handle(req: Request, res: Response) {

        const user_id = req.params.userId

        const detailUserService = new DetailUserService()

        const user = await detailUserService.execute(Number(user_id))

        res.status(200).json(user)

    }
}

export { DetailUserController, DetailAnotherUserController}