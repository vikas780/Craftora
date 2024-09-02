const express = require('express')
const router = express.Router()

const { Artisan, AllProducts } = require('../controller/ArtisanController')

router.get('/artisan', Artisan)
router.post('/product', AllProducts)

module.exports = router
