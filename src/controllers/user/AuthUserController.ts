import {Request, Response} from 'express'
import { IAuthUserService } from '../../services/user/AuthUserService'


class AuthUserController{
    constructor(private authUserService: IAuthUserService){}
    async handle(req: Request, res: Response ){

        const {email, password} = req.body

        const authUser = await this.authUserService.execute({
            email: email,
            password: password,
        })

        res.json(authUser)
    }
}

export { AuthUserController }