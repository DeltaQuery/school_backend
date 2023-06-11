const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const customerRouter = require('./routes/customerRoutes')
const studentRouter = require('./routes/studentRoutes')
const productRouter = require('./routes/productRoutes')
const invoiceRouter = require('./routes/invoiceRoutes')
const userRouter = require('./routes/userRoutes')

const app = express()

const corsConfig = {
  credentials: true,
  origin: true,
}
app.use(cors(corsConfig))

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet())

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 2000,
  message: 'Too many requests from this IP, please try again in an hour!'
})
app.use('/api', limiter)

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }))

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())

// Data sanitization against XSS
app.use(xss())

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
)

// Serving static files
app.use(express.static(`${__dirname}/public`))

// 3) ROUTES
app.get("/api/v1", (req, res) => {
  res.send("Welcome to this API")
})

app.use('/api/v1/customers', customerRouter)
app.use('/api/v1/students', studentRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/invoices', invoiceRouter)
app.use('/api/v1/users', userRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)) 
})

app.use(globalErrorHandler)

module.exports = app
