import prismaClient from  '../../prisma/index'
import { hash } from 'bcryptjs'


interface CreateUserProps {
    name: string
    email: string
    password: string
    confirm_password: string
}

class CreateUserService{
    async execute({ name, email, password, confirm_password }: CreateUserProps){
        
        const userAlredyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlredyExists){
            throw new Error("User alredy exists")
        }

        if (password !== confirm_password){
            throw new Error("Passwords do not match")
        }

        try{
            
            const hashPassword = await hash(password, 8)

            const user = await prismaClient.user.create({
                data: {
                    name: name,
                    email: email,
                    password: hashPassword,
                },
                omit: {
                    password: true,
                    updated_at: true,
                }
            })

            return user

        } catch (error){
            throw new Error("Error creating user." + error)
        }

    }
}

export { CreateUserService }