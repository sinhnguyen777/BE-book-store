const paypal = require('paypal-rest-sdk');

exports.PaypalCancel = (req, res, next) => {
    res.send('Cancelled');
}