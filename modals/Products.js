const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    maxlength: 100,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
  },
  image: {
    type: String,
    required: true,
  },
  artisanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Product', ProductSchema)
