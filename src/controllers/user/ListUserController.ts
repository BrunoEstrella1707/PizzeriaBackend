import { Request, Response } from 'express'
import { ListUserService } from '../../services/user/ListUserService'


class ListUserController{
    async handle(_: Request, res: Response){

        try{
            const listUserService = new ListUserService()
            const users = await listUserService.execute()

            res.status(200).json(users)

        } catch(error: any){
            throw new Error("Error listing users:" + error.message)
        }
        
    }
}

export { ListUserController}