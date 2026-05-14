import prismaClient from '../../prisma/index'
import { DetailUserResponse } from './DetailUserService'


export interface IListUserService {
    execute(): Promise<DetailUserResponse[]>
}
class ListUserService implements IListUserService {
    async execute(): Promise<DetailUserResponse[]>{
        const users = await prismaClient.user.findMany({
            omit: {
                password: true
            }
        })

        return users
    }
}

export { ListUserService }