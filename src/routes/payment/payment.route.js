const express = require('express')
const router = express.Router()
const PaymentPaypal = require('../../app/controllers/payment/payment.controller')
const PaypalSuccess = require('../../app/controllers/payment/paypalSuccess.controller')
const PaypalCancel = require('../../app/controllers/payment/paypalCancel.controller')

router.post('/', PaymentPaypal.PaymentPaypal)
router.get('/success', PaypalSuccess.PaypalSuccess)
router.get('/cancel', PaypalCancel.PaypalCancel)

module.exports = router