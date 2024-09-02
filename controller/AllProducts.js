const Product = require('../modals/Products')
const { StatusCodes } = require('http-status-codes')

const AllProducts = async (req, res) => {
  try {
    const products = await Product.find({})

    res.status(StatusCodes.OK).json({ products, totalJobs: products.length })
  } catch (error) {
    res.status(500).json({ error: 'No products present' })
  }
}

module.exports = AllProducts
