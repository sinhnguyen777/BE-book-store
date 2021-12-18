const express = require('express')
const router = express.Router()
const CheckoutPaypal = require('../../app/controllers/orders/checkout.controller')
const PaypalSuccess = require('../../app/controllers/orders/paypalSuccess.controller')
const PaypalCancel = require('../../app/controllers/orders/paypalCancel.controller')

router.post('/', CheckoutPaypal.CheckoutPaypal)
router.get('/success', PaypalSuccess.PaypalSuccess)
router.get('/cancel', PaypalCancel.PaypalCancel)

module.exports = router