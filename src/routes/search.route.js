const express = require('express')
const router = express.Router()

const searchController = require('../app/controllers/search.controller')

router.get('/search', searchController.getItem)



module.exports = router