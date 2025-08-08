import {
    NextFunction,
    Request,
    Response,
    RequestHandler,
    Router,
} from 'express'
import NotFoundError from '../errors/not-found-error'

import auth from '../middlewares/auth'
import authRouter from './auth'
import customerRouter from './customers'
import orderRouter from './order'
import productRouter from './product'
import uploadRouter from './upload'

const router = Router()

router.use('/auth', authRouter)
router.use('/product', productRouter)
router.use('/order', auth, orderRouter)
router.use('/upload', auth, uploadRouter)
router.use('/customers', auth, customerRouter)

const csrfHandler: RequestHandler = (req: Request, res: Response) => {
    res.json({ csrfToken: (req as any).csrfToken() })
}

router.get('/csrf-token', csrfHandler)

// Обработка неизвестных маршрутов
router.use((_req: Request, _res: Response, next: NextFunction) => {
    next(new NotFoundError('Маршрут не найден'))
})

export default router
