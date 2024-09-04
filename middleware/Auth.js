const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const AuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'No Auth Header present' })
  }

  const token = authHeader.split(' ')[1]
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    console.log('Decode', decode)
    req.user = { userId: decode.userId, role: decode.role }
    next()
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Authentication invalid' })
  }
}

module.exports = AuthMiddleware
