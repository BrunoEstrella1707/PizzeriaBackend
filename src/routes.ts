import { Router } from 'express'
import { CreateUserService } from './services/user/CreateUserService'
import { AuthUserService } from './services/user/AuthUserService'
import { DetailUserService } from './services/user/DetailUserService'
import { ListUserService } from './services/user/ListUserService'
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
import { ListOrderController } from './controllers/order/ListOrderController'
import { AddItemController } from './controllers/order/AddItemController'
import { authUserSchema, createUserSchema } from './schemas/userSchema'
import { createCategorySchema } from './schemas/categorySchema'
import { createProductSchema, listProductSchema } from './schemas/productSchema'
import { createOrderSchema, listOrderSchema } from './schemas/orderSchema'
import { createItemSchema } from './schemas/itemSchema'
import { validateSchema } from './middlewares/validateSchema'
import { auth } from './middlewares/auth'
import { isAdmin } from './middlewares/isAdmin'


const router = Router()

const createUserService = new CreateUserService()
const createUserController = new CreateUserController(createUserService)

const authUserService = new AuthUserService()
const authUserController = new AuthUserController(authUserService)

const detailUserService = new DetailUserService()
const detailUserController = new DetailUserController(detailUserService)
const detailAnotherUserController = new DetailAnotherUserController(detailUserService)

const listUserService = new ListUserService()
const listUserController = new ListUserController(listUserService)

router.post(
    '/users', 
    validateSchema(createUserSchema), 
    (req, res) => createUserController.handle(req, res)
)

router.post(
    '/login',
    validateSchema(authUserSchema),
    (req, res) => authUserController.handle(req, res)
)

router.get(
    '/users/me',
    auth,
    (req, res) => detailUserController.handle(req, res)
)

router.get(
    '/users/:userId',
    auth,
    isAdmin,
    (req, res) => detailAnotherUserController.handle(req, res)
)

router.get(
    '/users',
    auth,
    isAdmin,
    (req, res) => listUserController.handle(req, res)
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

router.get(
    '/orders/',
    auth,
    validateSchema(listOrderSchema),
    new ListOrderController().handle
)

router.post(
    '/orders/add/',
    auth,
    validateSchema(createItemSchema),
    new AddItemController().handle
)

export { router }