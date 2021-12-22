const paypal = require('paypal-rest-sdk');
const GetItemCart = require('./paypalSuccess.controller')
const mongoose = require('mongoose')
exports.PaymentPaypal = (req, res, next) => {

    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': 'Ab9Y8Mu98HMPxM5cRc2jiG7yg9-p1j6eG9ILM6mwhaXuiirejwzUw5W1kPJoQGMN9aqEKBMdki3Q_U8G',
        'client_secret': 'EDmJolIfBdufyq2cOBzGZ5ojph8YrPFx883lmCWM_ntYsvfqouWRJj6X9B5g6fAZHoIjxgYadCKQL1xX'
    })

    const itemCart = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        currency: "USD",
        quantity: 1,
    }

    GetItemCart.GetItemCart(itemCart)

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/side/congratulation",
            "cancel_url": "http://localhost:3000"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": itemCart.name,
                    "price": itemCart.price,
                    "currency": itemCart.currency,
                    "quantity": itemCart.quantity
                }]
            },
            "amount": {
                "currency": "USD",
                "total": itemCart.price
            },
            "description": "Washing Bar soap"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.log(error);
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    // res.redirect(payment.links[i].href);
                    res.json({ forwardLink: payment.links[i].href });
                }
            }
        }
    });
}
