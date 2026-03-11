import { compare } from 'bcryptjs'
import prismaClient from  '../../prisma/index'
import { sign } from 'jsonwebtoken'


const JWT_SECRET = process.env.JWT_SECRET as string || 'secret_key'

interface AuthUserProps {
    email: string
    password: string
}

class AuthUserService{
    async execute({ email, password }: AuthUserProps){

        const user = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user){
            throw new Error("User email not found!")
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch){
            throw new Error("The passwords didnt match!")
        }

        const token = sign(
            {id: user.id},
            JWT_SECRET,
            { expiresIn: '10m'},
        )

       return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token,
       }
    }
}

export { AuthUserService }
