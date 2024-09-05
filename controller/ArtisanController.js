const ArtisanProfile = require('../modals/Artisan')
const Product = require('../modals/Products')
const cloudinary = require('cloudinary').v2
const { StatusCodes } = require('http-status-codes')
const fs = require('fs')
// Get artisan dashboard data
const Artisan = async (req, res) => {
  try {
    const artisanProfile = await ArtisanProfile.findOne({
      userId: req.user.userId,
    })

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
// const ImageUpload = async (req, res) => {
//   const result = await cloudinary.uploader.upload(
//     req.files.image.tempFilePath,
//     {
//       use_filename: true,
//       folder: 'craftora',
//     }
//   )

//   return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } })
// }
const ImageUpload = async (req, res) => {
  try {
    // Check if there is an image file in the request
    if (!req.files || !req.files.image) {
      return res.status(400).send('No file uploaded')
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        use_filename: true,
        folder: 'craftora',
      }
    )

    // Remove the temporary file
    fs.unlinkSync(req.files.image.tempFilePath)

    // Return the Cloudinary URL
    return res
      .status(StatusCodes.OK)
      .json({ image: { src: result.secure_url } })
  } catch (error) {
    console.error('Error uploading image:', error)
    return res.status(500).json({ error: 'Failed to upload image' })
  }
}

module.exports = {
  Artisan,
  AllProducts,
  ImageUpload,
}
