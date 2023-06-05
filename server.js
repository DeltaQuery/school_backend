const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({ path: path.join(__dirname, '.config.env') })
const http = require('http')
const app = require('./app')
const server = http.createServer(app)

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  process.exit(1)
})

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

mongoose.set('strictQuery', false)

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'))

const port = process.env.PORT || 3002

server.listen(port, () => {
  console.log(`App running on port ${port}...`)
})

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  }) 
})
