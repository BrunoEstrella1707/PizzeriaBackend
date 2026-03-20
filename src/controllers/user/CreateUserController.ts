import { Request, Response } from 'express'
import { CreateUserService } from '../../services/user/CreateUserService'

class CreateUserController{
    async handle(req: Request, res: Response){
        
        const {name, email, password, confirm_password} = req.body

        const createUserService = new CreateUserService()
        
        const user = await createUserService.execute({
            name: name,
            email: email,
            password: password,
            confirm_password: confirm_password,
        })

        res.status(201).json(user)
    }
}

export { CreateUserController }