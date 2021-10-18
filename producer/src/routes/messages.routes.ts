import { Router, Request, Response } from 'express'

import { producer } from '../server'

interface IRequestBody {
  message: string
  user: string
}

const messagesRoutes = Router()

const messages: string[] = []

messagesRoutes.get("", (req: Request, res: Response) => {
  res.status(200).json(messages)
})

messagesRoutes.post("", async (req: Request, res: Response) => {
  const requestBody: IRequestBody = req.body

  await producer.send({
    topic: 'new-user',
    messages: [
      { value: requestBody.user },
    ],
  })

  messages.push(requestBody.message)

  res.status(200).json(requestBody)
})

export { messagesRoutes }