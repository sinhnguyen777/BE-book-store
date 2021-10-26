const express = require('express')
const router = express.Router()
const CheckoutPaypal = require('../../app/controllers/orders/checkout.controller')
const PaypalSuccess = require('../../app/controllers/orders/paypalSuccess.controller')


router.post('/', CheckoutPaypal.CheckoutPaypal)
router.get('/success', PaypalSuccess.PaypalSuccess)

module.exports = router