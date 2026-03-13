import { Request, Response, NextFunction } from 'express'
import prismaClient from '../prisma/index'


export const isAdmin =  async (req: Request, res: Response, next: NextFunction) => {

    const user_id = req.user_id as number

    if(!user_id){
        console.log("Unauthrorized")
        res.status(401).json({ error: "Unauthorized" })
    }

    const user = await prismaClient.user.findUnique({
        where: {
            id: user_id
        }
    })

    if(!user){
        console.log("User not found")
        throw new Error("User not found")
    }

    try{
        if(user.role !== 'ADMIN'){
            console.log("forbidden")
            throw new Error("Forbidden")
        }
        next()

    } catch(error: any){
        res.status(403).json({error: error.message})
    }

}