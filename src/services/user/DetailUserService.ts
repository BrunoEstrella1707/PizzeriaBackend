import prismaClient from "../../prisma/index"


class DetailUserService {
    async execute(userId: number) {
        try{
            const user = await prismaClient.user.findUnique({
                where: {
                    id: userId
                },
                omit: {
                    password: true
                },
            })

            if (!user) {
                throw new Error("User not found")
            }

            return user

        } catch (error) {
            console.log(error)
            throw new Error("Error fetching user details.")
        }
    }
}

export { DetailUserService }