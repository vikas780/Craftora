const express = require('express')
const app = express()
const ConnectDb = require('./db/ConnectDb')
const AuthMiddleware = require('./middleware/Auth')
const AuthorizeRoleMiddleware = require('./middleware/RoleAuth')
require('dotenv').config()
const path = require('path')
const morgan = require('morgan')

// Security package
const cors = require('cors')
// Routers
const authRouter = require('./routes/Auth')
const productListingRouter = require('./routes/ProductListing')
const artisanRouter = require('./routes/Artisan')

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

// Middleware
app.use(express.json())
app.use(cors())

// Get the current directory name
const currDirname = __dirname

// Serve static files from the client build directory
app.use(express.static(path.resolve(currDirname, 'client/build')))

// API routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1', productListingRouter)
app.use(
  '/api/v1',
  AuthMiddleware,
  AuthorizeRoleMiddleware('artisan'),
  artisanRouter
)

// Handle all other routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(currDirname, 'client/build', 'index.html'))
})

app.get('/', (req, res) => {
  res.send('Welcome to backend')
})

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await ConnectDb(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port:${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
