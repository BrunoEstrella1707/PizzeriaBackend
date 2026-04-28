import { Router } from 'express'
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController, DetailAnotherUserController } from './controllers/user/DetailUserController'
import { ListUserController } from './controllers/user/ListUserController'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'
import { CreateProductController } from './controllers/product/CreateProductController'
import { ListProductController } from './controllers/product/ListProductController'
import { DeleteProductController } from './controllers/product/DeleteProductController'
import { DisableProductController } from './controllers/product/DisableProductController'
import { CreateOrderController } from './controllers/order/CreateOrderController'
import { authUserSchema, createUserSchema } from './schemas/userSchema'
import { createCategorySchema } from './schemas/categorySchema'
import { createProductSchema, listProductSchema } from './schemas/productSchema'
import { createOrderSchema } from './schemas/orderSchema'
import { validateSchema } from './middlewares/validateSchema'
import { auth } from './middlewares/auth'
import { isAdmin } from './middlewares/isAdmin'



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
    isAdmin,
    new DetailAnotherUserController().handle
)

router.get(
    '/users',
    auth,
    isAdmin,
    new ListUserController().handle
)

router.post(
    '/categories',
    auth,
    isAdmin,
    validateSchema(createCategorySchema),
    new CreateCategoryController().handle
)

router.get(
    '/categories',
    auth,
    new ListCategoryController().handle
)

router.post(
    '/products',
    auth,
    isAdmin,
    validateSchema(createProductSchema),
    new CreateProductController().handle
)

router.get(
    '/products',
    auth,
    validateSchema(listProductSchema),
    new ListProductController().handle
)

router.delete(
    '/products/:product_id',
    auth,
    isAdmin,
    new DeleteProductController().handle
)

router.patch(
    '/products/:product_id',
    auth,
    isAdmin,
    new DisableProductController().handle
)

router.post(
    '/orders/',
    auth,
    validateSchema(createOrderSchema),
    new CreateOrderController().handle
)

export { router }