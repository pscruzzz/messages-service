import { Router } from 'express'
import { messagesRoutes } from './messages.routes'

const router = Router()

router.use("/messages", messagesRoutes)

export { router }