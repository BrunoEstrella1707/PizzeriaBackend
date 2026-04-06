import prismaClient from '../../prisma/index'


class ListUserService {
    async execute(){
        const users = await prismaClient.user.findMany({
            omit: {
                password: true
            }
        })

        return users
    }
}

export { ListUserService }