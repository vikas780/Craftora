const ArtisanProfile = require('../modals/Artisan')
const Product = require('../modals/Products')

// Get artisan dashboard data
const Artisan = async (req, res) => {
  try {
    const artisanProfile = await ArtisanProfile.findOne({
      role: 'artisan',
    })
    console.log(req.user.userId)
    const products = await Product.find({ artisanId: req.user.userId })

    res.json({ profile: artisanProfile, products })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}

const AllProducts = async (req, res) => {
  try {
    const { name, description, price, image } = req.body

    const product = new Product({
      name,
      description,
      price,
      image,
      artisanId: req.user.userId,
    })

    await product.save()
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = {
  Artisan,
  AllProducts,
}
