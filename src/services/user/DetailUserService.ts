import prismaClient from "../../prisma/index"

export interface DetailUserResponse {
    id: number;
    email: string;
    name: string;
    role: string;
    created_at: Date;
    updated_at: Date;
}


export interface IDetailUserService {
    execute(userId: number): Promise<DetailUserResponse>
}
class DetailUserService implements IDetailUserService {
    async execute(userId: number): Promise<DetailUserResponse> {
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