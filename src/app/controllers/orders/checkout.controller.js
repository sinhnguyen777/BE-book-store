const paypal = require('paypal-rest-sdk');

exports.CheckoutPaypal = (req, res, next) => {

    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': 'Ab9Y8Mu98HMPxM5cRc2jiG7yg9-p1j6eG9ILM6mwhaXuiirejwzUw5W1kPJoQGMN9aqEKBMdki3Q_U8G',
        'client_secret': 'EDmJolIfBdufyq2cOBzGZ5ojph8YrPFx883lmCWM_ntYsvfqouWRJj6X9B5g6fAZHoIjxgYadCKQL1xX'
    })

    // const itemCarts = {
    //     name: req.body.nameCart,
    //     sku: req.body.sku,
    //     price: req.body.priceItemCart,
    //     currency: req.body.currency,
    //     quantity: req.body.quantity
    // }



    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "hoang tu be",
                    "sku": "001",
                    "price": "25.00",
                    "currency": "USD",
                    "quantity": 2
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "50.00"
            },
            "description": "Hat for the best team ever"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
}
