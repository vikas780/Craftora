const User = require('../modals/User')
const { StatusCodes } = require('http-status-codes')
const register = async (req, res) => {
  const registerUser = await User.create({ ...req.body })
  const token = registerUser.createJWT()

  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: registerUser.name, role: registerUser.role }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new Error('Please provide email and password')
  }
  const isUserExist = await User.findOne({ email })
  if (!isUserExist) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid Credentials' })
    return
  }

  const isPasswordCorrect = await isUserExist.comparePassword(password)
  if (!isPasswordCorrect) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid Credentials' })
    return
  }
  const token = isUserExist.createJWT()
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: isUserExist.name, role: isUserExist.role }, token })
}
module.exports = {
  register,
  login,
}
