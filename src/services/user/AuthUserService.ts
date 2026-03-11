import prismaClient from  '../../prisma/index'
import { hash } from 'bcryptjs'


interface AuthUserProps {
    email: string
    password: string
}

class AuthUserService{
    async execute({ email, password }: AuthUserProps){
        console.log({ email, password })
        return 'Logado'
    }
}

export { AuthUserService }
