import {Request, Response} from 'express'
import { AuthUserService } from '../../services/user/AuthUserService'


class AuthUserController{
    async handle(req: Request, res: Response ){

        const {email, password} = req.body

        const authUserService = new AuthUserService()

        const authUser = await authUserService.execute({
            email: email,
            password: password,
        })

        res.json(authUser)
    }
}

export { AuthUserController }