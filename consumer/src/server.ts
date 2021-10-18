import express from "express"
import { Kafka } from 'kafkajs'

const app = express()

app.use(express.json())

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['host.docker.internal:9092']
})

const consumer = kafka.consumer({ groupId: 'users-group' })

const users: string[] = []

app.get("/users", (req, res) => {
  res.status(200).json({ users })
})

async function startServer() {
  await consumer.connect()
  await consumer.subscribe({ topic: 'new-user', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      users.push(message?.value?.toString() as string)
      console.log({
        value: message?.value?.toString(),
      })
    },
  })
  app.listen(3333, () => {
    console.log("Listening on port 3333")
  })
}

startServer().catch((err) => { console.log(err) })