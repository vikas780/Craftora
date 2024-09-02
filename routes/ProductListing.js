const express = require('express')
const router = express.Router()

const AllProducts = require('../controller/AllProducts')
router.get('/allproducts', AllProducts)

module.exports = router
