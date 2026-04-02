import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'


interface Payload{
    id: Number
}

const JWT_SECRET = process.env.JWT_SECRET as string || 'secret_key'

export function auth(req: Request, res: Response, next: NextFunction){

    const authToken = req.headers.authorization

    if (!authToken){
        throw new Error("Token not provided.")
    }

    try{

        const { id } = verify(authToken!.replace('Bearer ', ''), JWT_SECRET) as Payload

        req.user_id = id
        
        next()

    } catch(error){
        res.status(401).json({ error: "Unauthorized" })
    }
}

