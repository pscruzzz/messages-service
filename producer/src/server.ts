import express from "express"
import { router } from "./routes/router"
import { Kafka } from 'kafkajs'

const app = express()

app.use(express.json())

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['host.docker.internal:9092']
})
const producer = kafka.producer()

app.use(router)

async function startServer() {
  await producer.connect()
  app.listen(3000, () => {
    console.log("Listening on port 3000")
  })
}

startServer().catch((err) => { console.log(err) })

export { producer }