import { Request, Response } from 'express'
import { ICreateUserService } from '../../services/user/CreateUserService'

class CreateUserController{
    constructor(private createUserService: ICreateUserService){} 
    async handle(req: Request, res: Response){
        
        const {name, email, password, confirm_password} = req.body
        
        const user = await this.createUserService.execute({
            name: name,
            email: email,
            password: password,
            confirm_password: confirm_password,
        })

        res.status(201).json(user)
    }
}

export { CreateUserController }