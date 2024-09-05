const express = require('express')
const router = express.Router()

const {
  Artisan,
  AllProducts,
  ImageUpload,
} = require('../controller/ArtisanController')

router.get('/artisan', Artisan)
router.post('/product', AllProducts)
router.post('/upload', ImageUpload)

module.exports = router
