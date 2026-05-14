import { Request, Response } from 'express'
import { IListUserService } from '../../services/user/ListUserService'


class ListUserController{
    constructor(private listUserService: IListUserService){}
    async handle(_: Request, res: Response){

        try{
            const users = await this.listUserService.execute()

            res.status(200).json(users)

        } catch(error: any){
            throw new Error("Error listing users:" + error.message)
        }
        
    }
}

export { ListUserController}