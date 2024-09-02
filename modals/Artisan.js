const mongoose = require('mongoose')

const ArtisanProfileSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
})

module.exports = mongoose.model('ArtisanProfile', ArtisanProfileSchema)
