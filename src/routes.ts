import { Router } from 'express'
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController, DetailAnotherUserController } from './controllers/user/DetailUserController'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { validateSchema } from './middlewares/validateSchema'
import { authUserSchema, createUserSchema } from './schemas/userSchema'
import { auth } from './middlewares/auth'


const router = Router()

router.post(
    '/users', 
    validateSchema(createUserSchema), 
    new CreateUserController().handle
)

router.post(
    '/login',
    validateSchema(authUserSchema),
    new AuthUserController().handle
)

router.get(
    '/users/me',
    auth,
    new DetailUserController().handle
)

router.get(
    '/users/:userId',
    auth,
    new DetailAnotherUserController().handle
)

router.post(
    '/categories',
    auth,
    new CreateCategoryController().handle
)

export { router }